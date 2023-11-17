import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workouts } from '../../entities/workouts.entity';

@Module({
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
  imports: [TypeOrmModule.forFeature([Workouts])],
})
export class WorkoutsModule {}
