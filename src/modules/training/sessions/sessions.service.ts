import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from '@entities/sessions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private sessions: Repository<Sessions>,
  ) {}

  //TODO: Imrove validation and functions
  //TODO: Check each exercise
  //TODO: Imrove week variable when it is null
  async createSession(sessionData: any) {
    const promises = sessionData.flatMap(async (session) => {
      const { exerciseId, sets } = session;
      const lastSession = await this.sessions.findOne({
        where: { exercises: { id: exerciseId } },
        order: { week: 'DESC' },
      });

      return await Promise.all(
        sets.map(async (set, index) => {
          const newSession = this.sessions.create({
            exercises: { id: exerciseId },
            set: index + 1,
            weight: set.weight,
            reps: set.reps,
            week: lastSession.week ? lastSession.week + 1 : 1,
          });

          return this.sessions.save(newSession);
        }),
      );
    });

    return Promise.all(promises);
    return sessionData;
  }
}
