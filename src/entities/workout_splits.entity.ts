import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Users } from './users.entity';
import { Workouts } from './workouts.entity';

@Entity({ name: 'workout_splits' })
export class WorkoutSplits extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_split_name: string;

  @Column({ nullable: false })
  days: number;

  @ManyToOne(() => Users, (user: Users) => user.workoutSplits, {
    onDelete: 'CASCADE',
  })
  users: Users;

  @OneToMany(() => Workouts, (workouts: Workouts) => workouts.workoutSplits, {
    cascade: ['remove'],
  })
  workouts: Workouts[];
}
