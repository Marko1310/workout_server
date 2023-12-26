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
import { ExercisesService } from './exercises.service';
import { ZodPipe } from 'shared/zod.pipe';
import { AddExerciseDto, AddExerciseSchema } from './dto/exercise.dto';
import { WorkoutExistsPipe } from '../workouts/pipes/workoutExist.pipe';
import { exerciseExistPipe } from './pipes/exerciseExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';
import { hasPermission } from 'shared/auth/authorization';

@Controller('exercises')
@UseGuards(PermissionGuard)
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @Post(':workoutId')
  @Permission('create', 'Exercises')
  async createExercise(
    @Body(new ZodPipe(AddExerciseSchema)) addExerciseDto: AddExerciseDto,
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const { title, goalSets, goalReps } = addExerciseDto;
    const workout = await this.exerciseService.createExercise(
      user.id,
      workoutId,
      title,
      goalSets,
      goalReps,
    );
    return workout;
  }

  @Delete(':exerciseId')
  async deleteExercise(
    @Param('exerciseId', ParseIntPipe, exerciseExistPipe) exerciseId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const exercise = await this.exerciseService.findOne(exerciseId);

    if (!hasPermission(user.permissions, 'delete', exercise)) {
      throw new ForbiddenException();
    }
    return await this.exerciseService.deleteExercise(exerciseId);
  }

  @Get(':workoutId')
  async getAllExercises(
    @Param('workoutId', ParseIntPipe, WorkoutExistsPipe) workoutId: number,
  ) {
    return await this.exerciseService.getAllByWorkoutId(workoutId);
  }
}
