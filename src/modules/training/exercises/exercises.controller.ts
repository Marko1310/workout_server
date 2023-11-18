import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ZodPipe } from 'shared/zod.pipe';
import { AddExerciseDto, AddExerciseSchema } from './dto/exercise.dto';
import { WorkoutExistsPipe } from '../workouts/pipes/workoutExist.pipe';
import { exerciseExistPipe } from './pipes/exerciseExist.pipe';

@Controller('exercises')
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @Post(':workoutId')
  async createExercise(
    @Body(new ZodPipe(AddExerciseSchema)) addExerciseDto: AddExerciseDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
  ) {
    const { title, goalSets, goalReps } = addExerciseDto;
    const workout = await this.exerciseService.createExercise(
      workoutId,
      title,
      goalSets,
      goalReps,
    );
    return workout;
  }

  @Delete(':exerciseId')
  async deleteExercise(
    @Param('exerciseId', ParseIntPipe, exerciseExistPipe) exerciseId: number,
  ) {
    const exerciseToDelete =
      await this.exerciseService.deleteExercise(exerciseId);
    return exerciseToDelete;
  }
}
