import { Exercises } from '@entities/exercises.entity';
import { Sessions } from '@entities/sessions.entity';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class sessionExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(Sessions)
    private sessions: Repository<Exercises>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const session = await this.sessions.findOne({
      where: {
        id: value,
      },
    });

    if (!session)
      throw new NotFoundException(`Exercisese with ID ${value} not found`);

    return value;
  }
}
