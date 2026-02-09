import { Body, Controller, Headers, Post, UnauthorizedException } from '@nestjs/common';

@Controller('billing')
export class BillingController {
  @Post('webhook')
  webhook(@Headers('stripe-signature') signature: string | undefined, @Body() body: unknown) {
    if (!signature) throw new UnauthorizedException('Missing stripe signature');
    return { received: true, type: (body as { type?: string })?.type ?? 'unknown' };
  }
}
