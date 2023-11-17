import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkoutSplits } from './entities/workout_splits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from './entities/workouts.entity';
import { Exercises } from './entities/exercises.entity';
import { Sessions } from './entities/sessions.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutSplits)
    private workoutSplits: Repository<WorkoutSplits>,

    @InjectRepository(Workouts)
    private workouts: Repository<Workouts>,

    @InjectRepository(Exercises)
    private exercises: Repository<Exercises>,

    @InjectRepository(Sessions)
    private sessions: Repository<Sessions>,
  ) {}
  async createWorkoutSplit(userId: number, title: string, days: number) {
    const newWorkoutSplit = this.workoutSplits.create({
      users: { id: userId },
      workout_split_name: title,
      days,
    });
    return this.workoutSplits.save(newWorkoutSplit);
  }

  async createWorkout(workoutSplitId: number, title: string) {
    const newWorkout = this.workouts.create({
      workoutSplits: { id: workoutSplitId },
      workout_name: title,
    });
    return this.workouts.save(newWorkout);
  }

  async createExercise(
    workoutId: number,
    title: string,
    goalSets: number,
    goalReps: number,
  ) {
    const newExercise = this.exercises.create({
      workouts: { id: workoutId },
      exercise_name: title,
      goal_sets: goalSets,
      goal_reps: goalReps,
    });
    return this.exercises.save(newExercise);
  }

  async createSession(sessionData: any[]) {
    const promises = sessionData.flatMap(async (session) => {
      const { exerciseId, sets } = session;
      const lastSession = await this.sessions.findOne({
        where: { exercises: { id: exerciseId } },
        order: { week: 'DESC' },
      });

      return await Promise.all(
        sets.map(async (set, index) => {
          const newSession = this.sessions.create({
            exercises: { id: exerciseId },
            set: index + 1,
            weight: set.weight,
            reps: set.reps,
            week: lastSession.week + 1,
          });

          return this.sessions.save(newSession);
        }),
      );
    });

    return Promise.all(promises);
  }
}
