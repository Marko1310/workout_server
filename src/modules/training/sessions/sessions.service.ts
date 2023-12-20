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
    // const promises = sessionData.flatMap(async (session) => {
    //   const { exerciseId, sets } = session;

    //   return await Promise.all(
    //     sets.map(async (set, index) => {
    //       const newSession = await this.createNewSession(
    //         userId,
    //         exerciseId,
    //         index,
    //         set,
    //       );
    //       return this.sessionsRepository.save(newSession);
    //     }),
    //   );
    // });

    // return Promise.all(promises);
    for (const session of sessionData) {
      const { exerciseId, sets } = session;

      for (let index = 0; index < sets.length; index++) {
        const set = sets[index];
        const newSession = await this.createNewSession(
          userId,
          exerciseId,
          index,
          set,
        );
        await this.sessionsRepository.save(newSession);
      }
    }
  }

  async getDetailsByWeekForExercise(exerciseId: number, week: number) {
    return this.sessionsRepository.find({
      // where: { exercises: { exercises_id: exerciseId }, week },
      // order: { week: 'DESC' },
    });
  }

  private async createNewSession(
    userId: number,
    exerciseId: number,
    index: number,
    set: SetDto,
  ) {
    return this.sessionsRepository.create({
      users: { user_id: userId },
      exercises: { exercises_id: exerciseId },
      set: index + 1,
      weight: set.weight,
      reps: set.reps,
    });
  }
}
