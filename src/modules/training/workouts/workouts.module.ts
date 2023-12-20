import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workouts } from '@entities/workouts.entity';
import { Programs } from '@entities/programs.entity';
import { WorkoutsLogModule } from 'workouts-log/workouts-log.module';
import { WorkoutsLog } from '@entities/workoutsLog.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [
    TypeOrmModule.forFeature([Workouts, Programs, WorkoutsLog]),
    WorkoutsLogModule,
  ],
})
export class WorkoutsModule {}
