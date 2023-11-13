import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { ExercisesService } from './exercises/exercises.service';
import { WorkoutsExercisesService } from './workouts-exercises/workouts-exercises.service';
import { ExercisesController } from './exercises/exercises.controller';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsExercisesModule } from './workouts-exercises/workouts-exercises.module';

@Module({
  providers: [WorkoutsService, ExercisesService, WorkoutsExercisesService],
  controllers: [WorkoutsController, ExercisesController],
  imports: [ExercisesModule, WorkoutsExercisesModule],
})
export class WorkoutsModule {}
