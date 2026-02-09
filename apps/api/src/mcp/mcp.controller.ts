import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
  constructor(private readonly mcp: McpService) {}

  @Get()
  async stream(@Query('sessionId') sessionId: string | undefined, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders();
    if (!sessionId) {
      const sid = uuid();
      res.write(`event: endpoint\ndata: /api/mcp?sessionId=${sid}\n\n`);
      return res.end();
    }
    const payload = await this.mcp.buildStreamPayload(sessionId);
    for (const item of payload) {
      res.write(`event: message\ndata: ${JSON.stringify(item)}\n\n`);
    }
    res.end();
  }
}
