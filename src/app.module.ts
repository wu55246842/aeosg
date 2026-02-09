import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HomeModule } from './home/home.module';

@Module({
  imports: [HomeModule],
  controllers: [AppController],
})
export class AppModule {}
