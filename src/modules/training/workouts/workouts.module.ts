import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workouts } from '@entities/workouts.entity';
import { Programs } from '@entities/programs.entity';
import { WorkoutsLogModule } from 'workouts-log/workouts-log.module';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { ExercisesModule } from '@training-modules/exercises/exercises.module';
import { Exercises } from '@entities/exercises.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([Workouts, Programs, WorkoutsLog, Exercises]),
    WorkoutsLogModule,
    ExercisesModule,
  ],
})
export class WorkoutsModule {}
