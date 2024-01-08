import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { ProgramsService } from './program.service';
import { AddProgramSchema, AddProgramDto } from './dto/program.dto';
import { ZodPipe } from 'shared/zod.pipe';
import { ProgramExistsPipe } from './pipes/programExist.pipe';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';
import { hasPermission } from 'shared/auth/authorization';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';

@Controller('programs')
@UseGuards(PermissionGuard)
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Post('program')
  @Permission('create', 'Programs')
  async createProgram(
    @Body(new ZodPipe(AddProgramSchema))
    addProgramDto: AddProgramDto,
    @RequestUser() user: RequestUserDto,
  ) {
    const { title, days } = addProgramDto;
    const { id: userId } = user;
    const program = await this.programsService.createProgram(
      userId,
      title,
      days,
    );
    return program;
  }

  @Delete(':programId')
  async deleteProgram(
    @Param('programId', ProgramExistsPipe) programId: number,
    @RequestUser() user: RequestUserDto,
  ) {
    const program = await this.programsService.findOne(programId);
    if (!hasPermission(user.permissions, 'delete', program)) {
      throw new ForbiddenException();
    }
    await this.programsService.deleteProgram(programId);
    return {
      statusCode: 200,
      message: `Program ${program.programs_name} deleted succesfully`,
    };
  }

  @Get('all')
  @Permission('read', 'Programs')
  async getAllPrograms(@RequestUser() user: RequestUserDto) {
    return await this.programsService.getAllByUserId(user.id);
  }

  @Get('current')
  @Permission('read', 'Programs')
  async getCurrentProgram(@RequestUser() user: RequestUserDto) {
    return await this.programsService.getCurrentProgram(user.id);
  }
}
