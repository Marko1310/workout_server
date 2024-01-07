import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class WorkoutsLogService {
  constructor(
    @InjectRepository(WorkoutsLog)
    private workoutsLogRepository: Repository<WorkoutsLog>,
  ) {}

  async createWorkoutLog(userId: number, workoutId: number) {
    const previousWeek = await this.findPreviousWeek(workoutId);

    const workoutLog = this.workoutsLogRepository.create({
      users: { user_id: userId },
      workouts: { workouts_id: workoutId },
      week: previousWeek ? previousWeek + 1 : 1,
    });
    return await this.workoutsLogRepository.save(workoutLog);
  }

  async getAllWorkoutLogsByYear(userId: number, year: number) {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31, 23, 59, 59);

    return await this.workoutsLogRepository.find({
      where: {
        users: { user_id: userId },
        createDateTime: Between(startOfYear, endOfYear),
      },
    });
  }

  async getAllWorkoutLogsByWeek(
    userId: number,
    startDate: string,
    endDate: string,
  ) {
    const startDateParsed = new Date(startDate);
    const endDateParsed = new Date(endDate);

    return await this.workoutsLogRepository.find({
      where: {
        users: { user_id: userId },
        createDateTime: Between(startDateParsed, endDateParsed),
      },
    });
  }

  private async findPreviousWeek(workoutId: number) {
    const previousWeek = await this.workoutsLogRepository.findOne({
      where: { workouts: { workouts_id: workoutId } },
      order: { week: 'DESC' },
    });
    return previousWeek?.week;
  }
}
