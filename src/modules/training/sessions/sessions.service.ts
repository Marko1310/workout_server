import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sessions } from '@entities/sessions.entity';
import { Repository } from 'typeorm';
import { ExerciseArrayDto, SetDto } from './dto/session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private sessions: Repository<Sessions>,
  ) {}

  async createSession(sessionData: ExerciseArrayDto) {
    const promises = sessionData.flatMap(async (session) => {
      const { exerciseId, sets } = session;
      const lastSession = await this.findLastSession(exerciseId);

      return await Promise.all(
        sets.map(async (set, index) => {
          const newSession = await this.createNewSession(
            exerciseId,
            index,
            set,
            lastSession,
          );
          return this.sessions.save(newSession);
        }),
      );
    });

    return Promise.all(promises);
  }

  private async findLastSession(exerciseId: number) {
    return this.sessions.findOne({
      where: { exercises: { id: exerciseId } },
      order: { week: 'DESC' },
    });
  }

  private async createNewSession(
    exerciseId: number,
    index: number,
    set: SetDto,
    lastSession: SetDto,
  ) {
    return this.sessions.create({
      exercises: { id: exerciseId },
      set: index + 1,
      weight: set.weight,
      reps: set.reps,
      week: lastSession ? lastSession.week + 1 : 1,
    });
  }
}
