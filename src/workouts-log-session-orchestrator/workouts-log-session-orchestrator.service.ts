import { Injectable } from '@nestjs/common';
import { SessionArrayDto } from '@training-modules/sessions/dto/session.dto';
import { SessionsService } from '@training-modules/sessions/sessions.service';
import { WorkoutsLogService } from 'workouts-log/workouts-log.service';

@Injectable()
export class WorkoutsLogSessionOrchestratorService {
  constructor(
    private readonly workoutsLogService: WorkoutsLogService, // private readonly sessionsService: SessionsService,
  ) {}

  async createWorkoutLogAndSession(
    userId: number,
    // sessionData: SessionArrayDto,
    workoutId: number,
  ) {
    const workoutLog = await this.workoutsLogService.createWorkoutLog(
      userId,
      workoutId,
    );
    return workoutLog;
  }
}
