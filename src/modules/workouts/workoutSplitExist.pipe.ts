import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSplits } from '../../entities/workout_splits.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutSplitExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplits: Repository<WorkoutSplits>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Invalid workout split ID');
    }

    const workoutSplit = await this.workoutSplits.findOne({
      where: {
        id: value,
      },
    });

    if (!workoutSplit) {
      throw new NotFoundException(`Workout split with ID ${value} not found`);
    }
    return value;
  }
}
