import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { Tracks } from './tracks.entity';

@Entity({ name: 'exercises' })
export class Exercises extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  exercise_name: string;

  @Column({ nullable: false })
  goal_sets: number;

  @Column({ nullable: false })
  goal_reps: number;

  @OneToMany(() => Tracks, (tracks: Tracks) => tracks.exercises)
  tracks: Tracks[];
}
