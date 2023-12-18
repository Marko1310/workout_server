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
      users: { id: userId },
      workoutSplits: { id: workoutSplitId },
      workout_name: title,
    });
    return this.workoutsRepository.save(newWorkout);
  }

  async deleteWorkout(workoutId: number) {
    return await this.workoutsRepository.delete({
      id: workoutId,
    });
  }

  async findOne(workoutId: number) {
    const { users, ...result } = await this.workoutsRepository.findOne({
      where: { id: workoutId },
    });
    return result;
  }

  async getAllByUserId(userId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: { users: { id: userId } },
    });
    return workouts.map(({ users, ...result }) => result);
  }

  async getAllFormWorkoutSplit(userId: number, workoutId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: { users: { id: userId }, workoutSplits: { id: workoutId } },
    });
    return workouts.map(({ users, ...result }) => result);
  }

  async getPreviousWorkout(userId: number) {
    const previousWorkout = await this.sessionRepository.findOne({
      relations: ['exercises', 'exercises.workouts'],
      where: { users: { id: userId } },
      order: { createDateTime: 'DESC' },
    });
    const { users, ...result } = previousWorkout.exercises.workouts;
    return result;
  }
}
