import { WorkoutSplits } from './workout_splits.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';

export const Role = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(
    () => WorkoutSplits,
    (workoutSplits: WorkoutSplits) => workoutSplits.users,
    { cascade: ['remove'] },
  )
  workoutSplits: WorkoutSplits[];
}
