import { Module } from '@nestjs/common';
import { WorkoutsLogService } from './workouts-log.service';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsLogController } from './workouts-log.controller';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutsLogSessionOrchestratorService } from 'workouts-log-session-orchestrator/workouts-log-session-orchestrator.service';

@Module({
  providers: [WorkoutsLogService, WorkoutsLogSessionOrchestratorService],
  imports: [TypeOrmModule.forFeature([Workouts, WorkoutsLog])],
  controllers: [WorkoutsLogController],
})
export class WorkoutsLogModule {}
