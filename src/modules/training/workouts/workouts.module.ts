import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSessionOrchestratorModule } from '@training-modules/exerciseSessionOrchestrator/exerciseSessionOrchestrator.module';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workouts } from '@entities/workouts.entity';
import { Programs } from '@entities/programs.entity';
import { WorkoutsLogModule } from 'workouts-log/workouts-log.module';
import { WorkoutsLog } from '@entities/workoutsLog.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([Workouts, Programs, WorkoutsLog]),
    ExerciseSessionOrchestratorModule,
    WorkoutsLogModule,
  ],
})
export class WorkoutsModule {}
