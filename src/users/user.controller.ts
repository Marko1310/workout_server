import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInUserDto } from './dto/signIn-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('signin')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.create(signInUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.findByEmail(loginUserDto);
  }
}
