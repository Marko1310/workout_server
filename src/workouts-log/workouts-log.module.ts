import { Module } from '@nestjs/common';
import { WorkoutsLogService } from './workouts-log.service';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsLogController } from './workouts-log.controller';
import { Workouts } from '@entities/workouts.entity';
import { SessionsService } from '@training-modules/sessions/sessions.service';
import { Sessions } from '@entities/sessions.entity';

@Module({
  providers: [WorkoutsLogService, SessionsService],
  imports: [TypeOrmModule.forFeature([Workouts, Sessions, WorkoutsLog])],
  controllers: [WorkoutsLogController],
})
export class WorkoutsLogModule {}
