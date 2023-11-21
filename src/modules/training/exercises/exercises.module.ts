import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercises } from '@entities/exercises.entity';
import { Workouts } from '@entities/workouts.entity';

@Module({
  providers: [ExercisesService],
  controllers: [ExercisesController],
  imports: [TypeOrmModule.forFeature([Exercises, Workouts])],
})
export class ExercisesModule {}
