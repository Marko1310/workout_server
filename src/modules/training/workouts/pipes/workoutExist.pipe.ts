import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workouts } from '@entities/workouts.entity';

@Injectable()
export class WorkoutExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(Workouts)
    private workouts: Repository<Workouts>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const workout = await this.workouts.findOne({
      where: {
        workouts_id: value,
      },
    });

    if (!workout)
      throw new NotFoundException(`Workout with ID ${value} not found`);

    return value;
  }
}
