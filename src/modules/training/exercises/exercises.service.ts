import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercises } from '@entities/exercises.entity';

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
    return await this.exercisesRepository.delete({
      id: exerciseId,
    });
  }

  async findOne(exerciseId: number) {
    return await this.exercisesRepository.findOne({
      where: { id: exerciseId },
    });
  }

  async getAllByWorkoutId(workoutId: number) {
    return await this.exercisesRepository.find({
      relations: ['workouts'],
      where: { workouts: { id: workoutId } },
    });
  }
}
