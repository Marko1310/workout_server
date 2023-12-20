import { Module } from '@nestjs/common';
import { WorkoutsLogSessionOrchestratorService } from './workouts-log-session-orchestrator.service';
import { SessionsModule } from '@training-modules/sessions/sessions.module';
import { WorkoutsLogModule } from 'workouts-log/workouts-log.module';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { Sessions } from '@entities/sessions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsLogService } from 'workouts-log/workouts-log.service';
import { SessionsService } from '@training-modules/sessions/sessions.service';

@Module({
  imports: [
    SessionsModule,
    WorkoutsLogModule,
    TypeOrmModule.forFeature([WorkoutsLog, Sessions]),
  ],
  providers: [
    WorkoutsLogSessionOrchestratorService,
    WorkoutsLogService,
    SessionsService,
  ],
})
export class WorkoutsLogSessionOrchestratorModule {}
