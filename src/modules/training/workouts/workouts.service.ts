import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutsLog } from '@entities/workoutsLog.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private workoutsRepository: Repository<Workouts>,

    @InjectRepository(WorkoutsLog)
    private workoutLogRepository: Repository<WorkoutsLog>,
  ) {}

  async createWorkout(userId: number, programId: number, title: string) {
    const newWorkout = this.workoutsRepository.create({
      users: { user_id: userId },
      programs: { programs_id: programId },
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

  async getAllForProgram(userId: number, programId: number) {
    const workouts = await this.workoutsRepository.find({
      relations: { users: true },
      where: {
        users: { user_id: userId },
        programs: { programs_id: programId },
      },
    });
    return workouts.map(({ users, ...result }) => result);
  }

  async getPreviousWorkout(userId: number) {
    const previousWorkout = await this.workoutLogRepository.findOne({
      relations: ['workouts'],
      where: { users: { user_id: userId } },
      order: { week: 'DESC' },
    });
    const {
      users: user,
      workouts: { users, ...workouts },
      ...result
    } = previousWorkout;

    return {
      ...result,
      workouts,
    };
  }
}
