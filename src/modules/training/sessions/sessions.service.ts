import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from '@entities/sessions.entity';
import { Repository } from 'typeorm';
import { SessionArrayDto, SetDto } from './dto/session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
  ) {}

  async getSessionsCount(userId: number) {
    return await this.sessionsRepository.count({
      where: { users: { user_id: userId } },
    });
  }

  async createSession(
    userId: number,
    workoutLogId: number,
    sessionData: SessionArrayDto,
  ) {
    const createdSessions = [];
    //TODO: implement INSERT
    for (const session of sessionData) {
      const { exerciseId, sets } = session;

      for (let index = 0; index < sets.length; index++) {
        const set = sets[index];
        const newSession = await this.createNewSession(
          userId,
          workoutLogId,
          exerciseId,
          index,
          set,
        );
        const createdSession = await this.sessionsRepository.save(newSession);
        createdSessions.push(createdSession);
      }
    }
    return createdSessions;
  }

  async getTotalReps(userId: number) {
    return await this.sessionsRepository
      .createQueryBuilder('sessions')
      .select('SUM(sessions.reps)', 'totalReps')
      .where('sessions.userId= :userId', { userId })
      .getRawOne();
  }

  async getTotalWeight(userId: number) {
    return await this.sessionsRepository
      .createQueryBuilder('sessions')
      .select('SUM(sessions.weight)', 'totalWeight')
      .where('sessions.userId= :userId', { userId })
      .getRawOne();
  }

  private async createNewSession(
    userId: number,
    workoutLogId: number,
    exerciseId: number,
    index: number,
    set: SetDto,
  ) {
    return this.sessionsRepository.create({
      users: { user_id: userId },
      workoutsLog: { workouts_log_id: workoutLogId },
      exercises: { exercises_id: exerciseId },
      set: index + 1,
      weight: set.weight,
      reps: set.reps,
    });
  }
}
