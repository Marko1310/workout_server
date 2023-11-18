import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { AddWorkoutSchema, AddWorkoutSplitDto } from './dto/workout.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutSplitExistsPipe } from '../workout-splits/pipes/workoutSplitExist.pipe';
import { WorkoutExistsPipe } from './pipes/workoutExist.pipe';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Post(':workoutSplitId')
  async createWorkouts(
    @Body(new ZodPipe(AddWorkoutSchema)) addWorkoutDto: AddWorkoutSplitDto,
    @Param('workoutSplitId', ParseIntPipe, WorkoutSplitExistsPipe)
    workoutSplitId: number,
  ) {
    const { title } = addWorkoutDto;
    const workout = await this.workoutService.createWorkout(
      workoutSplitId,
      title,
    );
    return workout;
  }

  @Delete(':workoutId')
  async deleteWorkout(
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
  ) {
    const workoutToDelete = await this.workoutService.deleteWorkout(workoutId);
    return workoutToDelete;
  }
}
