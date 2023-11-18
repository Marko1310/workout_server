import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ZodPipe } from 'shared/zod.pipe';
import { AddSessionsDto, AddSessionsSchema } from './dto/session.dto';
import { WorkoutExistsPipe } from '@training-modules/workouts/pipes/workoutExist.pipe';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post(':workoutId')
  async createSession(
    @Body(new ZodPipe(AddSessionsSchema)) addSessionDto: AddSessionsDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
  ) {
    const { exercisesData } = addSessionDto;
    const session = await this.sessionsService.createSession(exercisesData);
    return session;
  }
}
