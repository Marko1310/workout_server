import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercises } from 'entities/exercises.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ExercisesService],
  controllers: [ExercisesController],
  imports: [TypeOrmModule.forFeature([Exercises])],
})
export class ExercisesModule {}
