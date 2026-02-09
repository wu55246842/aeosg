import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { HOME_PAGE_HTML } from './page';

@Controller()
export class HomeController {
  @Get('/')
  home(@Res() res: Response) {
    return res.type('text/html').send(HOME_PAGE_HTML);
  }
}
