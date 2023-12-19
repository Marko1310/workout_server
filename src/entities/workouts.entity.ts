import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Programs } from './programs.entity';
import { Exercises } from './exercises.entity';
import { Users } from './users.entity';

@Entity({ name: 'workouts' })
export class Workouts extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  workouts_id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  workout_name: string;

  @ManyToOne(() => Programs, (programs: Programs) => programs.workouts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'programsId' })
  programs: Programs;

  @ManyToOne(() => Users, (user: Users) => user.programs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @OneToMany(() => Exercises, (exercises: Exercises) => exercises.workouts, {
    cascade: ['remove'],
  })
  exercises: Exercises[];
}
