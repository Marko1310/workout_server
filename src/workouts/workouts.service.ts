import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplits: Repository<WorkoutSplits>,
  ) {}
  async createWorkoutSplit(userId: number, title: string, days: number) {
    const newWorkoutSplit = this.workoutSplits.create({
      users: { id: userId },
      workout_split_name: title,
      days,
    });
    return this.workoutSplits.save(newWorkoutSplit);
  }
}
