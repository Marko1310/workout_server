import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'auth/dto/signup.dto';
import { UsersService } from 'users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class IdentityService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authorize(signupDto: SignupDto) {
    const identity = await this.upsertUser(signupDto);
    //TODO: authorization and permissions
    const permissions = 'add_permissions';
    const accessToken = await this.jwtService.signAsync(
      { permissions },
      { subject: String(identity.id) },
    );
    return accessToken;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  private async upsertUser(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const existingUser = await this.userService.findOne(email);
    if (existingUser) return existingUser;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return newUser;
  }
}
