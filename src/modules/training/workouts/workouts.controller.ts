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
import {
  AddWorkoutSchema,
  AddWorkoutDto,
  AddNewWorkoutSchema,
  AddNewWorkoutDto,
} from './dto/workout.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { ProgramExistsPipe } from '../programs/pipes/programExist.pipe';
import { WorkoutExistsPipe } from './pipes/workoutExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';

@Controller('workouts')
@UseGuards(PermissionGuard)
export class WorkoutsController {
  constructor(private workoutService: WorkoutsService) {}

  @Post(':programId')
  @Permission('create', 'Workouts')
  async createNeWWorkout(
    @Body(new ZodPipe(AddNewWorkoutSchema)) workoutData: AddNewWorkoutDto,
    @Param('programId', ParseIntPipe, ProgramExistsPipe)
    programId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const newWorkout = await this.workoutService.createWorkoutWithExercises(
      user.id,
      programId,
      workoutData,
    );
    return newWorkout;
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
    await this.workoutService.deleteWorkout(workoutId);
    return {
      statusCode: 200,
      message: `Workout ${workout.workout_name} deleted succesfully`,
    };
  }

  @Get(':userId')
  @Permission('read', 'Workouts')
  async getAllWorkouts(@Param('userId') userId: number) {
    return await this.workoutService.getAllByUserId(userId);
  }

  @Get('workoutsForProgram/:userId/:programId')
  @Permission('read', 'Workouts')
  async getAllWorkoutsInProgram(
    @Param('userId') userId: number,
    @Param('programId') programId: number,
  ) {
    return await this.workoutService.getAllForProgram(userId, programId);
  }

  @Get('previous/:userId')
  @Permission('read', 'Workouts')
  async getPreviousWorkout(@Param('userId') userId: number) {
    return await this.workoutService.getPreviousWorkout(userId);
  }

  @Get('details/:workoutId/:week')
  @Permission('read', 'Workouts')
  async getPreviousWorkoutDetails(
    @Param('workoutId') workoutId: number,
    @Param('week') week: number,
  ) {
    return await this.workoutService.getAllWithExercisesAndSessionsByWeek(
      workoutId,
      week,
    );
  }
}
