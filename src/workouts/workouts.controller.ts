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
  async createWorkouts(@Body() addWorkout: any) {
    const { workoutSplitId, title } = addWorkout;
    const workout = await this.workoutService.createWorkout(
      workoutSplitId,
      title,
    );
    return workout;
  }

  @Post('exercise')
  async createExercise(@Body() addExercise: any) {
    const { workoutId, title, goalSets, goalReps } = addExercise;
    const workout = await this.workoutService.createExercise(
      workoutId,
      title,
      goalSets,
      goalReps,
    );
    return workout;
  }

  @Post('session')
  async createSession(@Body() addSession: any) {
    const { sessionData } = addSession;
    const session = await this.workoutService.createSession(sessionData);
    return session;
  }
}
