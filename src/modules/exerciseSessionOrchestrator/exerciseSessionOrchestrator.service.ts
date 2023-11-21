import { Injectable } from '@nestjs/common';
import { ExercisesService } from '@training-modules/exercises/exercises.service';
import { SessionsService } from '@training-modules/sessions/sessions.service';

@Injectable()
export class ExerciseSessionOrchestratorService {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly sessionsService: SessionsService,
  ) {}

  async getWorkoutDetails(workoutId: number) {
    const allExercises =
      await this.exercisesService.getAllByWorkoutId(workoutId);

    const exerciseSessionsPromises = allExercises.map(async (exercise) => {
      const sessions = await this.sessionsService.getLastSessionsForExercise(
        exercise.id,
      );
      return {
        ...exercise,
        sessions,
      };
    });

    const exerciseDetails = await Promise.all(exerciseSessionsPromises);

    return exerciseDetails;
  }
}