import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('workouts')
export class WorkoutsController {
  @Post('workout-split')
  async createWorkoutSplit(
    @Body() addWorkoutSplit: any,
    @Req() request: Request,
  ) {
    const { title, days } = addWorkoutSplit;
    const { id: userId } = request;
    return { userId, title, days };
  }
}
