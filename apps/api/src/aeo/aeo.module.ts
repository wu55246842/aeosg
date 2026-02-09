import { Module } from '@nestjs/common';
import { AeoService } from './aeo.service';
import { AeoController } from './aeo.controller';
@Module({ providers: [AeoService], controllers: [AeoController], exports: [AeoService] })
export class AeoModule {}
