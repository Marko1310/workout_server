import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { AddWorkoutSchema, AddWorkoutDto } from './dto/workout.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { WorkoutSplitExistsPipe } from '../workout-splits/pipes/workoutSplitExist.pipe';
import { WorkoutExistsPipe } from './pipes/workoutExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';
import { ExerciseSessionOrchestratorService } from '@training-modules/exerciseSessionOrchestrator/exerciseSessionOrchestrator.service';

@Controller('workouts')
@UseGuards(PermissionGuard)
export class WorkoutsController {
  constructor(
    private workoutService: WorkoutsService,
    private orchestratorService: ExerciseSessionOrchestratorService,
  ) {}

  @Post(':workoutSplitId')
  @Permission('create', 'Workouts')
  async createWorkouts(
    @Body(new ZodPipe(AddWorkoutSchema)) addWorkoutDto: AddWorkoutDto,
    @Param('workoutSplitId', ParseIntPipe, WorkoutSplitExistsPipe)
    workoutSplitId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const { title } = addWorkoutDto;
    const workout = await this.workoutService.createWorkout(
      user.id,
      workoutSplitId,
      title,
    );
    return workout;
  }

  @Delete(':workoutId')
  async deleteWorkout(
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const workout = await this.workoutService.findOne(workoutId);
    if (!hasPermission(user.permissions, 'delete', workout)) {
      throw new ForbiddenException();
    }
    return await this.workoutService.deleteWorkout(workoutId);
  }

  @Get(':userId')
  @Permission('read', 'Workouts')
  async getAllWorkouts(@Param('userId') userId: number) {
    return await this.workoutService.getAllByUserId(userId);
  }

  @Get('workoutsForSplit/:userId/:workoutSplitId')
  @Permission('read', 'Workouts')
  async getAllWorkoutsInWorkoutSplit(
    @Param('userId') userId: number,
    @Param('workoutSplitId') workoutSplitId: number,
  ) {
    return await this.workoutService.getAllForWorkoutSplit(
      userId,
      workoutSplitId,
    );
  }

  @Get('previous/:userId')
  @Permission('read', 'Workouts')
  async getPreviousWorkout(@Param('userId') userId: number) {
    return await this.workoutService.getPreviousWorkout(userId);
  }

  @Get('previous/details/:workoutId')
  @Permission('read', 'Workouts')
  async getPreviousWorkoutDetails(@Param('workoutId') workoutId: number) {
    return await this.orchestratorService.getPreviousWorkoutDetails(workoutId);
  }
}
