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
import { RequestUser } from '@users-modules/decorator/requestUser.decorator';
import { RequestUserDto } from '@users-modules/dto/request-user.dto';
import { Permission, PermissionGuard } from 'shared/auth/permission.guard';

@Controller('identity')
@UseGuards(PermissionGuard)
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @NoJwtAuth()
  @Post('signup')
  async signup(
    @Body(new ZodPipe(SignupDtoSchema)) signupDto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, identity } =
      await this.identityService.signup(signupDto);
    res.cookie('access_token', access_token, {
      httpOnly: false,
      secure: false,
    });
    return { id: identity.user_id, name: identity.name, email: identity.email };
  }

  @UseGuards(LocalAuthGuard)
  @NoJwtAuth()
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Request() req) {
    const { access_token, identity } = await this.identityService.login(
      req.user,
    );
    res.cookie('access_token', access_token, {
      httpOnly: false,
      secure: false,
    });
    return { id: identity.user_id, name: identity.name, email: identity.email };
  }

  @Get('me')
  @Permission('read', 'Users')
  async getProfile(@RequestUser() user: RequestUserDto) {
    return { user: user.id };
  }

  @Get('logout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
  }

  @Get('user')
  @Permission('read', 'Users')
  async findUser(@RequestUser() user: RequestUserDto) {
    const currentUser = await this.identityService.findUser(user.id);
    return {
      id: currentUser.user_id,
      name: currentUser.name,
      email: currentUser.email,
    };
  }
}
