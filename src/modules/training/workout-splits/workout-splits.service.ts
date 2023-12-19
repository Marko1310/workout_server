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
      users: { user_id: userId },
      workout_split_name: title,
      days,
    });
    return this.workoutSplitsRepository.save(newWorkoutSplit);
  }

  async deleteWorkoutSplit(workoutSplitId: number) {
    return await this.workoutSplitsRepository.delete({
      workout_split_id: workoutSplitId,
    });
  }

  async findOne(workoutSplitId: number) {
    const { users, ...result } = await this.workoutSplitsRepository.findOne({
      where: { workout_split_id: workoutSplitId },
    });
    return result;
  }

  async getAllByUserId(userId: number) {
    const workoutSplits = await this.workoutSplitsRepository.find({
      where: { users: { user_id: userId } },
      select: ['users', 'workout_split_id', 'workout_split_name', 'days'],
    });
    return workoutSplits.map(({ users, ...result }) => result);
  }

  async getCurrentWorkoutSplit(userId: number) {
    const latestSession = await this.sessionRepository.findOne({
      relations: [
        'exercises',
        'exercises.workouts',
        'exercises.workouts.workoutSplits',
      ],
      where: { users: { user_id: userId } },
      order: { createDateTime: 'DESC' },
    });
    const { users, ...result } =
      latestSession?.exercises?.workouts?.workoutSplits || {};
    return result;
  }
}
