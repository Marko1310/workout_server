import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from 'modules/users/requestUser.decorator';
import { Users } from '@entities/users.entity';
import { WorkoutSplitsService } from './workout-splits.service';
import {
  AddWorkoutSplitSchema,
  AddWorkoutSplitDto,
} from './dto/workout-split.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutSplitExistsPipe } from './pipes/workoutSplitExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';

@Controller('workout-splits')
@UseGuards(PermissionGuard)
export class WorkoutSplitsController {
  constructor(private workoutSplitService: WorkoutSplitsService) {}

  @Post('workout-split')
  @Permission('create', 'Workout-Split')
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
    const workoutSplitToDelete =
      await this.workoutSplitService.deleteWorkoutSplit(workoutSplitId);
    return workoutSplitToDelete;
  }
}
