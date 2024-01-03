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
      users: { user_id: userId },
      workouts: { workouts_id: workoutId },
      exercise_name: title,
      goal_sets: goalSets,
      goal_reps: goalReps,
    });
    return this.exercisesRepository.save(newExercise);
  }

  async deleteExercise(exerciseId: number) {
    return await this.exercisesRepository.delete({
      exercises_id: exerciseId,
    });
  }

  async findOne(exerciseId: number) {
    return await this.exercisesRepository.findOne({
      where: { exercises_id: exerciseId },
      relations: ['users'],
      select: { users: { user_id: true } },
    });
  }

  async getAllByWorkoutId(workoutId: number) {
    return await this.exercisesRepository.find({
      relations: ['workouts'],
      where: { workouts: { workouts_id: workoutId } },
    });
  }
}
