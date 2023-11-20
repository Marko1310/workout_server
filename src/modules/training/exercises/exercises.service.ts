import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercises } from '@entities/exercises.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercises)
    private exercisesRepository: Repository<Exercises>,
  ) {}

  async createExercise(
    userId: number,
    workoutId: number,
    title: string,
    goalSets: number,
    goalReps: number,
  ) {
    const newExercise = this.exercisesRepository.create({
      users: { id: userId },
      workouts: { id: workoutId },
      exercise_name: title,
      goal_sets: goalSets,
      goal_reps: goalReps,
    });
    return this.exercisesRepository.save(newExercise);
  }

  async deleteExercise(exerciseId: number) {
    const deletedExercise = this.exercisesRepository.delete({
      id: exerciseId,
    });
    return deletedExercise;
  }

  async findOne(exerciseId: number) {
    const exercise = await this.exercisesRepository.findOne({
      where: { id: exerciseId },
    });
    return exercise;
  }
}
