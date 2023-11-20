import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { WorkoutSplitsService } from './workout-splits.service';
import {
  AddWorkoutSplitSchema,
  AddWorkoutSplitDto,
} from './dto/workout-split.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutSplitExistsPipe } from './pipes/workoutSplitExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';

@Controller('workout-splits')
@UseGuards(PermissionGuard)
export class WorkoutSplitsController {
  constructor(private workoutSplitService: WorkoutSplitsService) {}

  @Post('workout-split')
  @Permission('create', 'Workout-Split')
  async createWorkoutSplit(
    @Body(new ZodPipe(AddWorkoutSplitSchema))
    addWorkoutSplitDto: AddWorkoutSplitDto,
    @RequestUser() user: RequestUserDto,
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
    @RequestUser() user: RequestUserDto,
  ) {
    const workoutSplit = await this.workoutSplitService.findOne(workoutSplitId);
    if (!hasPermission(user.permissions, 'delete', workoutSplit)) {
      throw new ForbiddenException();
    }
    const workoutSplitToDelete =
      await this.workoutSplitService.deleteWorkoutSplit(workoutSplitId);
    return workoutSplitToDelete;
  }
}
