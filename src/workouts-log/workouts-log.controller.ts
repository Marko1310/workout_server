import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  AddSessionsDto,
  AddSessionsSchema,
} from '@training-modules/sessions/dto/session.dto';
import { WorkoutExistsPipe } from '@training-modules/workouts/pipes/workoutExist.pipe';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutsLogSessionOrchestratorService } from 'workouts-log-session-orchestrator/workouts-log-session-orchestrator.service';

//TODO: guards and persmissions
@Controller('workouts-log')
export class WorkoutsLogController {
  constructor(
    private orchestratorService: WorkoutsLogSessionOrchestratorService,
  ) {}

  @Post(':workoutId')
  async createWorkoutLogAndSession(
    // @Body(new ZodPipe(AddSessionsSchema)) addSessionDto: AddSessionsDto,
    // @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
    @Param('workoutId', ParseIntPipe) workoutId: number,

    @RequestUser() user: RequestUserDto,
  ) {
    const workoutLog =
      await this.orchestratorService.createWorkoutLogAndSession(
        user.id,
        workoutId,
      );
    return workoutLog;
  }
}
