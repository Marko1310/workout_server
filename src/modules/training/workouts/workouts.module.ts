import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutSplits } from '@entities/workout_splits.entity';
import { ExerciseSessionOrchestratorModule } from '@training-modules/exerciseSessionOrchestrator/exerciseSessionOrchestrator.module';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([Workouts, WorkoutSplits]),
    ExerciseSessionOrchestratorModule,
  ],
})
export class WorkoutsModule {}
