import { Body, Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post('session')
  async createSession(@Body() addSession: any) {
    const { sessionData } = addSession;
    const session = await this.sessionsService.createSession(sessionData);
    return session;
  }
}
