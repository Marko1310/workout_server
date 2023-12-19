import { Injectable } from '@nestjs/common';
import { ExercisesService } from '@training-modules/exercises/exercises.service';
import { SessionsService } from '@training-modules/sessions/sessions.service';

@Injectable()
export class ExerciseSessionOrchestratorService {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly sessionsService: SessionsService,
  ) {}

  async getWorkoutDetailByWeek(workoutId: number, week: number) {
    const allExercisesInWorkout =
      await this.exercisesService.getAllByWorkoutId(workoutId);

    const exerciseSessionsPromises = allExercisesInWorkout.map(
      async (exercise) => {
        const sessions = await this.sessionsService.getDetailsByWeekForExercise(
          exercise.exercises_id,
          week,
        );
        const sessionsData = sessions.map(({ users, ...results }) => results);
        const { workouts, users, ...exerciseDetails } = exercise;
        return {
          ...exerciseDetails,
          sessionsData,
        };
      },
    );

    return await Promise.all(exerciseSessionsPromises);
  }
}
