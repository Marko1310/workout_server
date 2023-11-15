import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { RequestUser } from 'users/requestUser.decorator';
import { Users } from 'users/users.entity';

//TODO: implement dto's, remove any, zod validation for each request
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Post('workout-split')
  async createWorkoutSplit(
    @Body() addWorkoutSplit: any,
    @RequestUser() user: Users,
  ) {
    const { title, days } = addWorkoutSplit;
    const { id: userId } = user;
    const workoutSplit = await this.workoutService.createWorkoutSplit(
      userId,
      title,
      days,
    );
    return workoutSplit;
  }

  @Post('workout')
  async createWorkouts(@Body() addWorkout: any, @RequestUser() user: Users) {
    const { workoutSplitId, title } = addWorkout;
    const { id: userId } = user;
    const workout = await this.workoutService.createWorkouts(
      userId,
      workoutSplitId,
      title,
    );
    return workout;
  }
}
