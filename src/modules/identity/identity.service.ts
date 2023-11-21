import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'auth/dto/signup.dto';
import { UsersService } from 'modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from '@entities/users.entity';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class IdentityService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private authorizationService: AuthorizationService,
  ) {}

  async signup(signupDto: SignupDto) {
    const identity = await this.upsertUser(signupDto);
    return await this.assignAccessToken(identity);
  }

  async login(identity: any) {
    return await this.assignAccessToken(identity);
  }

  private async assignAccessToken(identity: Users) {
    const permissions =
      await this.authorizationService.getPermissions(identity);
    const payload = { permissions, subject: String(identity.id) };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  private async upsertUser(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const existingUser = await this.userService.findOneByMail(email);
    if (existingUser) throw new ConflictException('User already exists');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.userService.create(name, email, hashedPassword);
  }
}
