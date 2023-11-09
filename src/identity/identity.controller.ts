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
import { IdentityService } from './identity.service';
import { JwtAuthGuard } from 'auth/guards/jwt.auth.guard';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { NoJwtAuth } from 'auth/noJwtAuth.decorator';
import { SignupDto } from 'auth/dto/signup.dto';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @NoJwtAuth()
  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    //TODO: zod validation of signupDto
    const access_token = await this.identityService.authorize(signupDto);
    res.cookie('access_token', access_token, { httpOnly: true, secure: false });
  }

  @UseGuards(LocalAuthGuard)
  @NoJwtAuth()
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Request() req) {
    const accessToken = await this.identityService.login(req.user);
    res.cookie('access_token', accessToken, { httpOnly: true, secure: false });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
