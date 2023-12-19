import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programs } from '@entities/programs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramExistsPipe implements PipeTransform {
  constructor(
    @InjectRepository(Programs)
    private programs: Repository<Programs>,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    const program = await this.programs.findOne({
      where: {
        programs_id: value,
      },
    });

    if (!program)
      throw new NotFoundException(`Program with ID ${value} not found`);

    return value;
  }
}
