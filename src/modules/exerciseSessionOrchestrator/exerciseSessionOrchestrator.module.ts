import { Module } from '@nestjs/common';
import { ExerciseSessionOrchestratorService } from './exerciseSessionOrchestrator.service';
import { ExercisesModule } from '@training-modules/exercises/exercises.module';
import { SessionsModule } from '@training-modules/sessions/sessions.module';
import { ExercisesService } from '@training-modules/exercises/exercises.service';
import { SessionsService } from '@training-modules/sessions/sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercises } from '@entities/exercises.entity';
import { Sessions } from '@entities/sessions.entity';

@Module({
  imports: [
    ExercisesModule,
    SessionsModule,
    TypeOrmModule.forFeature([Exercises, Sessions]),
  ],
  providers: [
    ExerciseSessionOrchestratorService,
    ExercisesService,
    SessionsService,
  ],
  exports: [ExerciseSessionOrchestratorService],
})
export class ExerciseSessionOrchestratorModule {}
