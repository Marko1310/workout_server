import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { Sessions } from '@entities/sessions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workouts } from '@entities/workouts.entity';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [TypeOrmModule.forFeature([Sessions, Workouts])],
})
export class SessionsModule {}
