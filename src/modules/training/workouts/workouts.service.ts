import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private workoutsRepository: Repository<Workouts>,
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
    const deletedWorkoutSplit = this.workoutsRepository.delete({
      id: workoutId,
    });
    return deletedWorkoutSplit;
  }

  async findOne(workoutId: number) {
    const workout = await this.workoutsRepository.findOne({
      where: { id: workoutId },
    });
    return workout;
  }

  async getAllByUserId(userId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: { users: { id: userId } },
    });

    return workouts;
  }
}
