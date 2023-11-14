import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';
import { Workouts } from './entities/workouts.entity';
import { Exercises } from './entities/exercises.entity';
import { Tracks } from './entities/tracks.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([WorkoutSplits, Workouts, Exercises, Tracks]),
  ],
})
export class WorkoutsModule {}
