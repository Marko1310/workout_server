import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // async signIn(signInUserDto: SignInUserDto): Promise<ResponseDto> {
  //   const { name, email, password } = signInUserDto;
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const newUser = await this.userRepository.create({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   });
  //   this.userRepository.save(newUser);
  //   return {
  //     success: true,
  //   };
  // }
}
