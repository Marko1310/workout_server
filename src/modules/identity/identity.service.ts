import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationService } from './authorization.service';
import { UsersService } from 'modules/users/users.service';
import { Users } from '@entities/users.entity';
import { SignupDto } from 'auth/dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class IdentityService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private authorizationService: AuthorizationService,
  ) {}

  async signup(signupDto: SignupDto) {
    const identity = await this.upsertUser(signupDto);
    const access_token = await this.assignAccessToken(identity);
    return { access_token, identity };
  }

  async login(identity: Users) {
    const access_token = await this.assignAccessToken(identity);
    return { access_token, identity };
  }

  async findUser(id: number) {
    return await this.userService.findOneById(id);
  }

  private async assignAccessToken(identity: Users) {
    const permissions =
      await this.authorizationService.getPermissions(identity);
    const payload = { permissions, subject: String(identity.user_id) };
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
