import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ZodPipe } from 'shared/zod.pipe';
import { AddSessionsDto, AddSessionsSchema } from './dto/session.dto';
import { WorkoutExistsPipe } from '@training-modules/workouts/pipes/workoutExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';

@Controller('sessions')
@UseGuards(PermissionGuard)
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post(':workoutId')
  @Permission('create', 'Sessions')
  async createSession(
    @Body(new ZodPipe(AddSessionsSchema)) addSessionDto: AddSessionsDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const { exercisesData } = addSessionDto;
    const session = await this.sessionsService.createSession(
      user.id,
      exercisesData,
    );
    return session;
  }
}
