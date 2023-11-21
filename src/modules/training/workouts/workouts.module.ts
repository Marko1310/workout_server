import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseSessionOrchestratorModule } from '@training-modules/exerciseSessionOrchestrator/exerciseSessionOrchestrator.module';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutSplits } from '@entities/workout_splits.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([Workouts, WorkoutSplits]),
    ExerciseSessionOrchestratorModule,
  ],
})
export class WorkoutsModule {}
