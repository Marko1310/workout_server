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

  private async findLastSession(exerciseId: number) {
    return this.sessionsRepository.findOne({
      where: { exercises: { id: exerciseId } },
      order: { week: 'DESC' },
    });
  }

  private async createNewSession(
    userId: number,
    exerciseId: number,
    index: number,
    set: SetDto,
    lastSession: SetDto,
  ) {
    return this.sessionsRepository.create({
      users: { id: userId },
      exercises: { id: exerciseId },
      set: index + 1,
      weight: set.weight,
      reps: set.reps,
      week: lastSession ? lastSession.week + 1 : 1,
    });
  }
}
