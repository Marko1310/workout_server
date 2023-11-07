import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) return null;

    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) return null;

    const { ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user.userId, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
