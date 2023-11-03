import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('new')
  signIn(@Body() signDto: Record<string, any>) {
    return this.usersService.createUser(
      signDto.name,
      signDto.email,
      signDto.password,
    );
  }
}
