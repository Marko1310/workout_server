import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutSplits } from '@entities/workout_splits.entity';

@Injectable()
export class WorkoutSplitsService {
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

  async deleteWorkoutSplit(workoutSplitId: number) {
    const deletedWorkoutSplit = this.workoutSplits.delete({
      id: workoutSplitId,
    });
    return deletedWorkoutSplit;
  }

  async findOne(workoutSplitId: number) {
    const workoutSplit = await this.workoutSplits.findOne({
      where: { id: workoutSplitId },
    });
    return workoutSplit;
  }

  async getAllByUserId(userId: number) {
    const workoutSplits = await this.workoutSplits.find({
      relations: ['users'],
      where: { users: { id: userId } },
    });

    return workoutSplits;
  }
}
