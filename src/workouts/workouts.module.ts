import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';
import { Workouts } from './entities/workouts.entity';
import { Exercises } from './entities/exercises.entity';
import { Sessions } from './entities/sessions.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([WorkoutSplits, Workouts, Exercises, Sessions]),
  ],
})
export class WorkoutsModule {}
