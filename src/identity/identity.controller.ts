import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/guards/jwt.auth.guard';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { NoJwtAuth } from 'auth/noJwtAuth.decorator';
import { SignupDto } from 'auth/dto/signup.dto';

@Controller()
export class IdentityController {
  constructor(private authService: AuthService) {}

  @NoJwtAuth()
  @Post('auth/signup')
  async signup(@Body() signupDto: SignupDto) {
    const identity = await this.authService.upsertUser(signupDto);
    return identity;
  }

  @UseGuards(LocalAuthGuard)
  @NoJwtAuth()
  @Post('auth/login')
  async login(@Res({ passthrough: true }) res: Response, @Request() req) {
    const accessToken = await this.authService.login(req.user);
    res.cookie('access_token', accessToken, { httpOnly: true, secure: false });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
