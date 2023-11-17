import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { AddWorkoutSchema, AddWorkoutSplitDto } from './workout.dto';
import { ZodPipe } from 'shared/zod.pipe';

@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Post(':workoutSplitId')
  async createWorkouts(
    @Body(new ZodPipe(AddWorkoutSchema)) addWorkoutDto: AddWorkoutSplitDto,
    @Param('workoutSplitId', ParseIntPipe) workoutSplitId: number,
  ) {
    const { title } = addWorkoutDto;
    const workout = await this.workoutService.createWorkout(
      workoutSplitId,
      title,
    );
    return workout;
  }
}
