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
    return await this.programRepository.findOne({
      where: { programs_id: programId },
      relations: ['users'],
      select: { users: { user_id: true } },
    });
  }

  async getAllByUserId(userId: number) {
    return await this.programRepository.find({
      relations: ['workouts'],
      where: { users: { user_id: userId } },
      select: ['users', 'programs_id', 'programs_name', 'days'],
      order: { createDateTime: 'ASC' },
    });
  }

  //TODO: change
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

    return latestSession?.exercises?.workouts?.programs || {};
  }
}
