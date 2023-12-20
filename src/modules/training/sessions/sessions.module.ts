import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Sessions } from '@entities/sessions.entity';
import { Workouts } from '@entities/workouts.entity';
import { WorkoutsLog } from '@entities/workoutsLog.entity';
import { WorkoutsLogService } from 'workouts-log/workouts-log.service';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, WorkoutsLogService],
  imports: [TypeOrmModule.forFeature([Sessions, Workouts, WorkoutsLog])],
})
export class SessionsModule {}
