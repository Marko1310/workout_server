import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from './entities/workouts.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplits: Repository<WorkoutSplits>,

    @InjectRepository(Workouts)
    private workouts: Repository<Workouts>,
  ) {}
  async createWorkoutSplit(userId: number, title: string, days: number) {
    const newWorkoutSplit = this.workoutSplits.create({
      users: { id: userId },
      workout_split_name: title,
      days,
    });
    return this.workoutSplits.save(newWorkoutSplit);
  }

  async createWorkouts(userId: number, workoutSplitId: number, title: string) {
    const newWorkout = this.workouts.create({
      users: { id: userId },
      workoutSplits: { id: workoutSplitId },
      workout_name: title,
    });
    return this.workouts.save(newWorkout);
  }
}
