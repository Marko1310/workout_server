import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ZodPipe } from 'shared/zod.pipe';
import { AddExerciseDto, AddExerciseSchema } from './dto/exercise.dto';
import { WorkoutExistsPipe } from './pipes/workoutExist.pipe';

@Controller('exercises')
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @Post(':workoutId')
  async createExercise(
    @Body(new ZodPipe(AddExerciseSchema)) addExercise: AddExerciseDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
  ) {
    const { title, goalSets, goalReps } = addExercise;
    const workout = await this.exerciseService.createExercise(
      workoutId,
      title,
      goalSets,
      goalReps,
    );
    return workout;
  }
}
