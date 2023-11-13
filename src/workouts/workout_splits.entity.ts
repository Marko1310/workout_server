import { Users } from '../../src/users/users.entity';

import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../shared/database/base.entity';

@Entity({ name: 'workout_splits' })
export class WorkoutSplits extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_split_name: string;

  @Column()
  days: number;

  @ManyToOne(() => Users, (user: Users) => user.workoutSplits, {
    onDelete: 'CASCADE',
  })
  users: Users;
}
