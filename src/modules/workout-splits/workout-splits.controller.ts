import { Body, Controller, Post } from '@nestjs/common';
import { RequestUser } from 'modules/users/requestUser.decorator';
import { Users } from 'modules/users/users.entity';
import { WorkoutSplitsService } from './workout-splits.service';
import { addWorkoutSplitSchema, addWorkoutSplitDto } from './workout-split.dto';
import { ZodPipe } from 'shared/zod.pipe';

@Controller('workout-splits')
export class WorkoutSplitsController {
  constructor(private workoutSplitService: WorkoutSplitsService) {}

  @Post('workout-split')
  async createWorkoutSplit(
    @Body(new ZodPipe(addWorkoutSplitSchema))
    addWorkoutSplit: addWorkoutSplitDto,
    @RequestUser() user: Users,
  ) {
    const { title, days } = addWorkoutSplit;
    const { id: userId } = user;
    const workoutSplit = await this.workoutSplitService.createWorkoutSplit(
      userId,
      title,
      days,
    );
    return workoutSplit;
  }
}
