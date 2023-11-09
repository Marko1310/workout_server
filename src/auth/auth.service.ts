import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

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

  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;
    const existingUser = await this.userService.findOne(email);
    return existingUser;

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const newUser = await this.userRepository.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // this.userRepository.save(newUser);
    // return {
    //   success: true,
    // };
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
