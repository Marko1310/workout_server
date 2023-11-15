import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { RequestUser } from 'users/requestUser.decorator';
import { Users } from 'users/users.entity';

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
  async createWorkouts(@Body() addWorkout: any) {
    const { workoutSplitId, title } = addWorkout;
    const workout = await this.workoutService.createWorkouts(
      workoutSplitId,
      title,
    );
    return workout;
  }
}
