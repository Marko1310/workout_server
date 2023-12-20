import { BaseEntity } from '../shared/database/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercises } from './exercises.entity';
import { Users } from './users.entity';
import { WorkoutsLog } from './workoutsLog.entity';

@Entity({ name: 'sessions' })
export class Sessions extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  sessions_id: number;

  @Column({ nullable: false })
  set: number;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false })
  reps: number;

  @ManyToOne(() => Users, (user: Users) => user.programs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne(() => Exercises, (exercises: Exercises) => exercises.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exercisesId' })
  exercises: Exercises;

  @ManyToOne(
    () => WorkoutsLog,
    (workoutsLog: WorkoutsLog) => workoutsLog.sessions,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'workoutsLogId' })
  workoutsLog: WorkoutsLog;
}
