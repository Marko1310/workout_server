import { BaseEntity } from '../shared/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Exercises } from './exercises.entity';

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

  @ManyToOne(() => Exercises, (exercises: Exercises) => exercises.sessions)
  exercises: Exercises;
}
