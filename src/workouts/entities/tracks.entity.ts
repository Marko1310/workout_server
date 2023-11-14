import { BaseEntity } from '../../shared/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Exercises } from './exercises.entity';

@Entity({ name: 'tracks' })
export class Tracks extends BaseEntity {
  @Column()
  set: number;

  @Column()
  weight: number;

  @Column()
  reps: number;

  @ManyToOne(() => Exercises, (exercises: Exercises) => exercises.tracks, {
    onDelete: 'CASCADE',
  })
  exercises: Exercises;
}
