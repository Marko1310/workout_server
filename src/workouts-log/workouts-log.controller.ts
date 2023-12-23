import { Controller, Get, Param } from '@nestjs/common';
import { Permission } from 'shared/auth/permission.guard';
import { WorkoutsLogService } from './workouts-log.service';

//TODO: guards and persmissions
@Controller('workout-logs')
export class WorkoutsLogController {
  constructor(private workoutLogsService: WorkoutsLogService) {}

  @Get(':userId/:year')
  @Permission('read', 'Workouts')
  async getAllWorkouts(
    @Param('userId') userId: number,
    @Param('year') year: number,
  ) {
    return await this.workoutLogsService.getAllWorkoutLogsByYear(userId, year);
  }
}
