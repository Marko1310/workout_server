import { BaseEntity } from '../shared/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exercises } from './exercises.entity';
import { Users } from './users.entity';

@Entity({ name: 'sessions' })
export class Sessions extends BaseEntity {
  @Column({ nullable: false })
  set: number;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false })
  reps: number;

  @Column({ nullable: false })
  week: number;

  @ManyToOne(() => Users, (user: Users) => user.workoutSplits, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @ManyToOne(() => Exercises, (exercises: Exercises) => exercises.sessions, {
    onDelete: 'CASCADE',
  })
  exercises: Exercises;
}
