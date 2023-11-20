import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutSplits } from '@entities/workout_splits.entity';

@Injectable()
export class WorkoutSplitsService {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplitsRepository: Repository<WorkoutSplits>,
  ) {}

  async createWorkoutSplit(userId: number, title: string, days: number) {
    const newWorkoutSplit = this.workoutSplitsRepository.create({
      users: { id: userId },
      workout_split_name: title,
      days,
    });
    return this.workoutSplitsRepository.save(newWorkoutSplit);
  }

  async deleteWorkoutSplit(workoutSplitId: number) {
    const deletedWorkoutSplit = this.workoutSplitsRepository.delete({
      id: workoutSplitId,
    });
    return deletedWorkoutSplit;
  }

  async findOne(workoutSplitId: number) {
    const workoutSplit = await this.workoutSplitsRepository.findOne({
      where: { id: workoutSplitId },
    });
    return workoutSplit;
  }

  async getAllByUserId(userId: number) {
    const workoutSplits = await this.workoutSplitsRepository.find({
      relations: ['users'],
      where: { users: { id: userId } },
    });

    return workoutSplits;
  }
}
