import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../shared/database/base.entity';
import { Users } from './users.entity';
import { Workouts } from './workouts.entity';

@Entity({ name: 'programs' })
export class Programs extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  programs_id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  programs_name: string;

  @Column({ nullable: false })
  days: number;

  @ManyToOne(() => Users, (user: Users) => user.programs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  users: Users;

  @OneToMany(() => Workouts, (workouts: Workouts) => workouts.programs, {
    cascade: ['remove'],
  })
  workouts: Workouts[];
}
