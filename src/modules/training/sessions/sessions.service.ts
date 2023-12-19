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

  async createSession(userId: number, sessionData: SessionArrayDto) {
    const promises = sessionData.flatMap(async (session) => {
      const { exerciseId, sets } = session;
      const lastSession = await this.findLastSession(exerciseId);

      return await Promise.all(
        sets.map(async (set, index) => {
          const newSession = await this.createNewSession(
            userId,
            exerciseId,
            index,
            set,
            lastSession,
          );
          return this.sessionsRepository.save(newSession);
        }),
      );
    });

    return Promise.all(promises);
  }

  async getLastSessionsForExercise(exerciseId: number) {
    const { week, ...rest } = (await this.findLastSession(exerciseId)) ?? {};
    return this.sessionsRepository.find({
      where: { exercises: { exercises_id: exerciseId }, week },
      order: { week: 'DESC' },
    });
  }

  private async findLastSession(exerciseId: number) {
    const lastSession = this.sessionsRepository.findOne({
      where: { exercises: { exercises_id: exerciseId } },
      order: { week: 'DESC' },
    });
    return lastSession;
  }

  private async createNewSession(
    userId: number,
    exerciseId: number,
    index: number,
    set: SetDto,
    lastSession: SetDto,
  ) {
    return this.sessionsRepository.create({
      users: { user_id: userId },
      exercises: { exercises_id: exerciseId },
      set: index + 1,
      weight: set.weight,
      reps: set.reps,
      week: lastSession ? lastSession.week + 1 : 1,
    });
  }
}
