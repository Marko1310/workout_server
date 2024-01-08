import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
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

  async getWorkoutLogsCount(userId: number) {
    return await this.workoutsLogRepository.count({
      where: {
        users: { user_id: userId },
      },
    });
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
    console.log(startDate);
    console.log(endDate);
    return await this.workoutsLogRepository
      .createQueryBuilder('workoutLogs')
      .select(['DATE(workoutLogs.createDateTime) AS date', 'COUNT(*) AS count'])
      .where('workoutLogs.userId = :userId', { userId })
      .andWhere('workoutLogs.createDateTime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('date')
      .getRawMany();
  }

  private async findPreviousWeek(workoutId: number) {
    const previousWeek = await this.workoutsLogRepository.findOne({
      where: { workouts: { workouts_id: workoutId } },
      order: { week: 'DESC' },
    });
    return previousWeek?.week;
  }
}
