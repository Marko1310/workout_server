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
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { NoJwtAuth } from 'auth/noJwtAuth.decorator';
import { SignupDto, SignupDtoSchema } from 'auth/dto/signup.dto';
import { ZodPipe } from 'shared/zod.pipe';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @NoJwtAuth()
  @Post('signup')
  async signup(
    @Body(new ZodPipe(SignupDtoSchema)) signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.identityService.signup(signupDto);
    res.cookie('access_token', access_token, { httpOnly: true, secure: false });
  }

  @UseGuards(LocalAuthGuard)
  @NoJwtAuth()
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Request() req) {
    const accessToken = await this.identityService.login(req.user);
    res.cookie('access_token', accessToken, { httpOnly: true, secure: false });
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
