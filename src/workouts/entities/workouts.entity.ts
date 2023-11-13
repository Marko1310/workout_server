import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { WorkoutSplits } from './workout_splits.entity';

@Entity({ name: 'workouts' })
export class Workouts extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_name: string;

  @Column({ nullable: false })
  week: number;

  @ManyToOne(
    () => WorkoutSplits,
    (workoutSplits: WorkoutSplits) => workoutSplits.workouts,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutSplits: WorkoutSplits;
}
