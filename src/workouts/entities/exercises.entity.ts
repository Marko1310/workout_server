import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/database/base.entity';
import { Tracks } from './tracks.entity';
import { Users } from '../../users/users.entity';

@Entity({ name: 'exercises' })
export class Exercises extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  exercise_name: string;

  @Column({ nullable: false })
  goal_sets: number;

  @Column({ nullable: false })
  goal_reps: number;

  @ManyToOne(() => Users, (users: Users) => users.exercises, {
    onDelete: 'CASCADE',
  })
  users: Users;

  @OneToMany(() => Tracks, (tracks: Tracks) => tracks.exercises)
  tracks: Tracks[];
}
