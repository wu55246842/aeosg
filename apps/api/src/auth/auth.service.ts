import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RefreshDto, RegisterDto } from './dto/auth.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({ data: { ...dto, passwordHash } });
    return this.issueTokens(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    return this.issueTokens(user.id, user.email);
  }

  async refresh(dto: RefreshDto) {
    const payload = this.jwt.verify(dto.refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    return this.issueTokens(payload.sub, payload.email);
  }

  logout() {
    return { ok: true };
  }

  private issueTokens(sub: string, email: string) {
    return {
      accessToken: this.jwt.sign({ sub, email }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: Number(process.env.JWT_ACCESS_TTL) }),
      refreshToken: this.jwt.sign({ sub, email }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: Number(process.env.JWT_REFRESH_TTL) })
    };
  }
}
