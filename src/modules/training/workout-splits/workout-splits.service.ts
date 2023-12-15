import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutSplits } from '@entities/workout_splits.entity';
import { Sessions } from '@entities/sessions.entity';

@Injectable()
export class WorkoutSplitsService {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplitsRepository: Repository<WorkoutSplits>,

    @InjectRepository(Sessions)
    private sessionRepository: Repository<Sessions>,
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
    return await this.workoutSplitsRepository.delete({
      id: workoutSplitId,
    });
  }

  async findOne(workoutSplitId: number) {
    return await this.workoutSplitsRepository.findOne({
      where: { id: workoutSplitId },
    });
  }

  async getAllByUserId(userId: number) {
    return await this.workoutSplitsRepository.find({
      relations: ['users'],
      where: { users: { id: userId } },
    });
  }

  async getCurrenttWorkoutSplit(userId: number) {
    const latestSession = await this.sessionRepository.findOne({
      relations: [
        'exercises',
        'exercises.workouts',
        'exercises.workouts.workoutSplits',
      ],
      where: { users: { id: userId } },
      order: { createDateTime: 'DESC' },
    });
    return latestSession.exercises.workouts.workoutSplits;
  }
}
