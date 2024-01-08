import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { Permission } from 'shared/auth/permission.guard';
import { WorkoutsLogService } from './workouts-log.service';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';

//TODO: guards and persmissions
@Controller('workout-logs')
export class WorkoutsLogController {
  constructor(private workoutLogsService: WorkoutsLogService) {}

  @Get('count')
  @Permission('read', 'Workouts')
  async getAllWorkoutLogs(@RequestUser() user: RequestUserDto) {
    return await this.workoutLogsService.getWorkoutLogsCount(user.id);
  }

  @Get('year/:year')
  @Permission('read', 'Workouts')
  async getWorkoutLogsByYear(
    @RequestUser() user: RequestUserDto,
    @Param('year') year: number,
  ) {
    return await this.workoutLogsService.getAllWorkoutLogsByYear(user.id, year);
  }

  @Get('week')
  @Permission('read', 'Workouts')
  async getWorkoutsLogsByWeek(
    @RequestUser() user: RequestUserDto,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.workoutLogsService.getAllWorkoutLogsByWeek(
      user.id,
      startDate,
      endDate,
    );
  }
}
