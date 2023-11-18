import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { WorkoutSplits } from './workout_splits.entity';
import { Exercises } from './exercises.entity';

@Entity({ name: 'workouts' })
export class Workouts extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_name: string;

  @ManyToOne(
    () => WorkoutSplits,
    (workoutSplits: WorkoutSplits) => workoutSplits.workouts,
    { onDelete: 'CASCADE' },
  )
  workoutSplits: WorkoutSplits;

  @OneToMany(() => Exercises, (exercises: Exercises) => exercises.workouts, {
    cascade: ['remove'],
  })
  exercises: Exercises[];
}
