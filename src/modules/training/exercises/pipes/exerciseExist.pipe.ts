import { Exercises } from '@entities/exercises.entity';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class exerciseExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(Exercises)
    private exercises: Repository<Exercises>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const exercise = await this.exercises.findOne({
      where: {
        exercises_id: value,
      },
    });

    if (!exercise)
      throw new NotFoundException(`Exercisese with ID ${value} not found`);

    return value;
  }
}
