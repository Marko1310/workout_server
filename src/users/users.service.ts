import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/signIn-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(signInUserDto: SignInUserDto): Promise<ResponseDto> {
    const { name, email, password } = signInUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    this.userRepository.save(newUser);
    return {
      success: true,
    };
  }

  async findByEmail(loginUserDto: LoginUserDto): Promise<ResponseDto> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new Error('Invalid mail or password');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return {
        success: false,
        message: 'Invalid email or password',
      };
    return {
      success: true,
      data: { id: user.id, email: user.email },
    };
  }
}
