import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

//TODO: implement dto's, remove any, zod validation for each request
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Post('workout')
  async createWorkouts(@Body() addWorkout: any) {
    const { workoutSplitId, title } = addWorkout;
    const workout = await this.workoutService.createWorkout(
      workoutSplitId,
      title,
    );
    return workout;
  }
}
