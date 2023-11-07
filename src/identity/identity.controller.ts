import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';

@Controller()
export class IdentityController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
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
