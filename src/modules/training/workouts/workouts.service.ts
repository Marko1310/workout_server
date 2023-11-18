import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private workouts: Repository<Workouts>,
  ) {}

  async createWorkout(workoutSplitId: number, title: string) {
    const newWorkout = this.workouts.create({
      workoutSplits: { id: workoutSplitId },
      workout_name: title,
    });
    return this.workouts.save(newWorkout);
  }
}
