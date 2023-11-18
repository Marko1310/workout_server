import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercises } from '@entities/exercises.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private exercises: Repository<Exercises>,
  ) {}

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
}
