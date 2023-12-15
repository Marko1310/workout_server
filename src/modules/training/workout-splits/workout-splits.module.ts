import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSplitsService } from './workout-splits.service';
import { WorkoutSplitsController } from './workout-splits.controller';
import { WorkoutSplits } from '@entities/workout_splits.entity';
import { Sessions } from '@entities/sessions.entity';

@Module({
  providers: [WorkoutSplitsService],
  controllers: [WorkoutSplitsController],
  imports: [TypeOrmModule.forFeature([WorkoutSplits, Sessions])],
})
export class WorkoutSplitsModule {}
