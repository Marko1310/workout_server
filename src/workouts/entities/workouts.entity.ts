import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { WorkoutSplits } from './workout_splits.entity';
import { Exercises } from './exercises.entity';
import { Users } from '../../users/users.entity';

@Entity({ name: 'workouts' })
export class Workouts extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_name: string;

  @ManyToOne(() => Users, (users: Users) => users.workouts, {
    onDelete: 'CASCADE',
  })
  users: Users;

  @ManyToOne(
    () => WorkoutSplits,
    (workoutSplits: WorkoutSplits) => workoutSplits.workouts,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutSplits: WorkoutSplits;

  @ManyToMany(() => Exercises)
  @JoinTable()
  exercises: Exercises[];
}
