import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [TypeOrmModule.forFeature([WorkoutSplits])],
})
export class WorkoutsModule {}
