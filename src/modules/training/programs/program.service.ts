import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programs } from '@entities/programs.entity';
import { Sessions } from '@entities/sessions.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Programs)
    private programRepository: Repository<Programs>,

    @InjectRepository(Sessions)
    private sessionRepository: Repository<Sessions>,
  ) {}

  async createProgram(userId: number, title: string, days: number) {
    const newProgram = this.programRepository.create({
      users: { user_id: userId },
      programs_name: title,
      days,
    });
    return this.programRepository.save(newProgram);
  }

  async deleteProgram(programId: number) {
    return await this.programRepository.delete({
      programs_id: programId,
    });
  }

  async findOne(programId: number) {
    const { users, ...result } = await this.programRepository.findOne({
      where: { programs_id: programId },
    });
    return result;
  }

  async getAllByUserId(userId: number) {
    const programs = await this.programRepository.find({
      where: { users: { user_id: userId } },
      select: ['users', 'programs_id', 'programs_name', 'days'],
    });
    return programs.map(({ users, ...result }) => result);
  }

  async getCurrentProgram(userId: number) {
    const latestSession = await this.sessionRepository.findOne({
      relations: [
        'exercises',
        'exercises.workouts',
        'exercises.workouts.programs',
      ],
      where: { users: { user_id: userId } },
      order: { createDateTime: 'DESC' },
    });
    const { users, ...result } =
      latestSession?.exercises?.workouts?.programs || {};
    return result;
  }
}
