import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RequestUser } from 'modules/users/requestUser.decorator';
import { Users } from '@entities/users.entity';
import { WorkoutSplitsService } from './workout-splits.service';
import { AddWorkoutSplitSchema, AddWorkoutSplitDto } from './workout-split.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutSplitExistsPipe } from '../workoutSplitExist.pipe';

@Controller('workout-splits')
export class WorkoutSplitsController {
  constructor(private workoutSplitService: WorkoutSplitsService) {}

  @Post('workout-split')
  async createWorkoutSplit(
    @Body(new ZodPipe(AddWorkoutSplitSchema))
    addWorkoutSplitDto: AddWorkoutSplitDto,
    @RequestUser() user: Users,
  ) {
    const { title, days } = addWorkoutSplitDto;
    const { id: userId } = user;
    const workoutSplit = await this.workoutSplitService.createWorkoutSplit(
      userId,
      title,
      days,
    );
    return workoutSplit;
  }

  @Delete(':workoutSplitId')
  async deleteWorkoutSplit(
    @Param('workoutSplitId', WorkoutSplitExistsPipe) workoutSplitId: number,
  ) {
    const deletedWorkoutSplit =
      await this.workoutSplitService.deleteWorkoutSplit(workoutSplitId);
    return deletedWorkoutSplit;
  }
}
