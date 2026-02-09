import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { SchemaEngineModule } from '../schema/schema.module';
@Module({ imports: [SchemaEngineModule], controllers: [PagesController], providers: [PagesService] })
export class PagesModule {}
