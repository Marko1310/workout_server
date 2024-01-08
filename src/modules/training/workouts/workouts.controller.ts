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
import { AddNewWorkoutSchema, AddNewWorkoutDto } from './dto/workout.dto';
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

  @Get()
  @Permission('read', 'Workouts')
  async getAllWorkouts(@RequestUser() user: RequestUserDto) {
    return await this.workoutService.getAllByUserId(user.id);
  }

  @Get('withexercises/:workoutId')
  @Permission('read', 'Workouts')
  async getWorkoutWithExercises(
    @RequestUser() user: RequestUserDto,
    @Param('workoutId') workoutId: number,
  ) {
    return await this.workoutService.getWorkoutWithExercises(
      user.id,
      workoutId,
    );
  }

  @Get('workoutsForProgram/:programId')
  @Permission('read', 'Workouts')
  async getAllWorkoutsInProgram(
    @RequestUser() user: RequestUserDto,
    @Param('programId') programId: number,
  ) {
    return await this.workoutService.getAllForProgram(user.id, programId);
  }

  @Get('previous')
  @Permission('read', 'Workouts')
  async getPreviousWorkout(@RequestUser() user: RequestUserDto) {
    return await this.workoutService.getPreviousWorkout(user.id);
  }

  //TODO: Remove
  @Get('details/:workoutId/:week')
  @Permission('read', 'Workouts')
  async getPreviousWorkoutDetails2(
    @Param('workoutId') workoutId: number,
    @Param('week') week: number,
  ) {
    return await this.workoutService.getAllWithExercisesAndSessionsByWeek(
      workoutId,
      week,
    );
  }

  @Get('previous/details/:workoutId')
  @Permission('read', 'Workouts')
  async getPreviousWorkoutDetails(
    @Param('workoutId') workoutId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    return await this.workoutService.getPreviousWorkoutWithDetails(
      workoutId,
      user.id,
    );
  }
}
