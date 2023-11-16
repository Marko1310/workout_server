import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { Tracks } from './tracks.entity';
import { Workouts } from './workouts.entity';

@Entity({ name: 'exercises' })
export class Exercises extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  exercise_name: string;

  @Column({ nullable: false })
  goal_sets: number;

  @Column({ nullable: false })
  goal_reps: number;

  @ManyToOne(() => Workouts, (workouts: Workouts) => workouts.exercises)
  workouts: Workouts[];

  @OneToMany(() => Tracks, (tracks: Tracks) => tracks.exercises, {
    cascade: ['remove'],
  })
  tracks: Tracks[];
}
