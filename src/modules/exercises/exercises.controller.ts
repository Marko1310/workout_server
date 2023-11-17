import { Body, Controller, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @Post('exercise')
  async createExercise(@Body() addExercise: any) {
    const { workoutId, title, goalSets, goalReps } = addExercise;
    const workout = await this.exerciseService.createExercise(
      workoutId,
      title,
      goalSets,
      goalReps,
    );
    return workout;
  }
}
