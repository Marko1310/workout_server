import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsService } from './program.service';
import { ProgramsController } from './program.controller';
import { Programs } from '@entities/programs.entity';
import { Sessions } from '@entities/sessions.entity';

@Module({
  providers: [ProgramsService],
  controllers: [ProgramsController],
  imports: [TypeOrmModule.forFeature([Programs, Sessions])],
})
export class ProgramsModule {}
