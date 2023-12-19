import { Programs } from './programs.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Workouts } from './workouts.entity';
import { Exercises } from './exercises.entity';
import { Sessions } from './sessions.entity';

export const Role = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

@Entity({ name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

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

  @OneToMany(() => Programs, (programs: Programs) => programs.users, {
    cascade: ['remove'],
  })
  programs: Programs[];

  @OneToMany(() => Workouts, (workouts: Workouts) => workouts.users, {
    cascade: ['remove'],
  })
  workouts: Workouts[];

  @OneToMany(() => Exercises, (exercises: Exercises) => exercises.users, {
    cascade: ['remove'],
  })
  exercises: Exercises[];

  @OneToMany(() => Sessions, (sessions: Sessions) => sessions.users, {
    cascade: ['remove'],
  })
  sessions: Sessions[];
}
