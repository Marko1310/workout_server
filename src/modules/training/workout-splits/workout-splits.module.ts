import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSplitsService } from './workout-splits.service';
import { WorkoutSplitsController } from './workout-splits.controller';
import { WorkoutSplits } from '@entities/workout_splits.entity';

@Module({
  providers: [WorkoutSplitsService],
  controllers: [WorkoutSplitsController],
  imports: [TypeOrmModule.forFeature([WorkoutSplits])],
})
export class WorkoutSplitsModule {}
