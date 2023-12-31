import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Sessions } from './sessions.entity';
import { Workouts } from './workouts.entity';
import { Users } from './users.entity';

@Entity({ name: 'exercises' })
export class Exercises extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  exercises_id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  exercise_name: string;

  @Column({ nullable: false })
  goal_sets: number;

  @Column({ nullable: false })
  goal_reps: number;

  @ManyToOne(() => Users, (user: Users) => user.programs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne(() => Workouts, (workouts: Workouts) => workouts.exercises, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workoutsId' })
  workouts: Workouts;

  @OneToMany(() => Sessions, (sessions: Sessions) => sessions.exercises, {
    cascade: ['remove'],
  })
  sessions: Sessions[];
}
