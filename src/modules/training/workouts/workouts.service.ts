import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { AddNewWorkoutDto } from './dto/workout.dto';
import { Exercises } from '@entities/exercises.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workouts)
    private workoutsRepository: Repository<Workouts>,

    @InjectRepository(WorkoutsLog)
    private workoutLogRepository: Repository<WorkoutsLog>,

    @InjectRepository(Exercises)
    private exerciseRepository: Repository<Exercises>,

    private readonly entityManager: EntityManager,
  ) {}

  async createWorkout(userId: number, programId: number, title: string) {
    const newWorkout = this.workoutsRepository.create({
      users: { user_id: userId },
      programs: { programs_id: programId },
      workout_name: title,
    });
    return this.workoutsRepository.save(newWorkout);
  }

  async createNewWorkout(
    userId: number,
    programId: number,
    workoutData: AddNewWorkoutDto,
  ) {
    const result = await this.entityManager.transaction(
      async (entityManager) => {
        try {
          const workout = this.workoutsRepository.create({
            users: { user_id: userId },
            programs: { programs_id: programId },
            workout_name: workoutData.title,
          });
          const savedWorkout = await entityManager.save(workout);

          const exercisesPromises = workoutData.exercises.map(
            async (exerciseData) => {
              const exercise = this.exerciseRepository.create({
                users: { user_id: userId },
                workouts: { workouts_id: savedWorkout.workouts_id },
                exercise_name: exerciseData.title,
                goal_sets: exerciseData.goalSets,
                goal_reps: exerciseData.goalReps,
              });
              return entityManager.save(exercise);
            },
          );
          const createdExercises = await Promise.all(exercisesPromises);

          return { workout: savedWorkout, exercises: createdExercises };
        } catch (error) {
          throw error;
        }
      },
    );
    return result;
  }

  async deleteWorkout(workoutId: number) {
    return await this.workoutsRepository.delete({
      workouts_id: workoutId,
    });
  }

  async findOne(workoutId: number) {
    return await this.workoutsRepository.findOne({
      where: { workouts_id: workoutId },
    });
  }

  async getAllByUserId(userId: number) {
    return await this.workoutsRepository.find({
      where: { users: { user_id: userId } },
    });
  }

  async getAllForProgram(userId: number, programId: number) {
    return await this.workoutsRepository.find({
      where: {
        users: { user_id: userId },
        programs: { programs_id: programId },
      },
    });
  }

  async getPreviousWorkout(userId: number) {
    return await this.workoutLogRepository.findOne({
      relations: ['workouts'],
      where: { users: { user_id: userId } },
      order: { createDateTime: 'DESC' },
    });
  }

  async getAllWithExercisesAndSessionsByWeek(workoutId: number, week: number) {
    const workoutLogForWeek = await this.workoutLogRepository.findOne({
      where: { workouts: { workouts_id: workoutId }, week: week },
    });
    const workoutsLogId = workoutLogForWeek?.workouts_log_id;

    const workout = await this.workoutsRepository
      .createQueryBuilder('workout')
      .leftJoinAndSelect('workout.exercises', 'exercise')
      .leftJoinAndSelect('exercise.sessions', 'session')
      .where('workout.workouts_id = :workoutId', { workoutId })
      .andWhere('session.workoutsLog.workouts_log_id = :workoutsLogId', {
        workoutsLogId,
      })
      .getMany();

    return workout;
  }
}
