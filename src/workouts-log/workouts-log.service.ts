import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  private async findPreviousWeek(workoutId: number) {
    const previousWeek = await this.workoutsLogRepository.findOne({
      where: { workouts: { workouts_id: workoutId } },
      order: { week: 'DESC' },
    });
    return previousWeek?.week;
  }
}
