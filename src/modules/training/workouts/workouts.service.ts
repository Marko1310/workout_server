import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';
import { Sessions } from '@entities/sessions.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private workoutsRepository: Repository<Workouts>,

    @InjectRepository(Sessions)
    private sessionRepository: Repository<Sessions>,
  ) {}

  async createWorkout(userId: number, workoutSplitId: number, title: string) {
    const newWorkout = this.workoutsRepository.create({
      users: { user_id: userId },
      workoutSplits: { workout_split_id: workoutSplitId },
      workout_name: title,
    });
    return this.workoutsRepository.save(newWorkout);
  }

  async deleteWorkout(workoutId: number) {
    return await this.workoutsRepository.delete({
      workouts_id: workoutId,
    });
  }

  async findOne(workoutId: number) {
    const { users, ...result } = await this.workoutsRepository.findOne({
      where: { workouts_id: workoutId },
    });
    return result;
  }

  async getAllByUserId(userId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: { users: { user_id: userId } },
    });
    return workouts.map(({ users, ...result }) => result);
  }

  async getAllForWorkoutSplit(userId: number, workoutSplitId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: {
        users: { user_id: userId },
        workoutSplits: { workout_split_id: workoutSplitId },
      },
    });
    return workouts.map(({ users, ...result }) => result);
  }

  async getPreviousWorkout(userId: number) {
    const previousWorkout = await this.sessionRepository.findOne({
      relations: ['exercises', 'exercises.workouts'],
      where: { users: { user_id: userId } },
      order: { createDateTime: 'DESC' },
    });
    const { week } = previousWorkout ?? {};
    const { users, ...result } = previousWorkout?.exercises?.workouts || {};
    return { result, week };
  }
}
