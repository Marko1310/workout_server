import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Users } from './users.entity';
import { Workouts } from './workouts.entity';
import { Sessions } from './sessions.entity';

@Entity({ name: 'workoutsLog' })
export class WorkoutsLog extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  workouts_log_id: number;

  @Column({ nullable: false })
  week: number;

  @ManyToOne(() => Workouts, (workouts: Workouts) => workouts.workoutsLog, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workoutsId' })
  workouts: Workouts;

  @ManyToOne(() => Users, (users: Users) => users.workoutsLog, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @OneToMany(() => Sessions, (sessions: Sessions) => sessions.workoutsLog, {
    cascade: ['remove'],
  })
  sessions: Sessions[];
}
