import {
  Body,
  Controller,
  Get,
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
import { WorkoutsLogService } from 'workouts-log/workouts-log.service';

@Controller('sessions')
@UseGuards(PermissionGuard)
export class SessionsController {
  constructor(
    private sessionsService: SessionsService,
    private workoutsLogService: WorkoutsLogService,
  ) {}

  @Get('count/sets')
  @Permission('read', 'Sessions')
  async getTotalReps(@RequestUser() user: RequestUserDto) {
    return this.sessionsService.getSetCount(user.id);
  }

  @Get('count/weight')
  @Permission('read', 'Sessions')
  async getTotalWeight(@RequestUser() user: RequestUserDto) {
    return this.sessionsService.getTotalWeight(user.id);
  }

  @Get('count/reps')
  @Permission('read', 'Sessions')
  async getAllSession(@RequestUser() user: RequestUserDto) {
    return this.sessionsService.getTotalReps(user.id);
  }

  @Post(':workoutId')
  @Permission('create', 'Sessions')
  async createSession(
    @Body(new ZodPipe(AddSessionsSchema)) addSessionDto: AddSessionsDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const { exercisesData } = addSessionDto;

    const workoutLog = await this.workoutsLogService.createWorkoutLog(
      user.id,
      workoutId,
    );

    const session = await this.sessionsService.createSession(
      user.id,
      workoutLog.workouts_log_id,
      exercisesData,
    );
    return session;
  }
}
