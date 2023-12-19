import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOneByMail(email: string): Promise<Users | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<Users | null> {
    return this.userRepository.findOneBy({ user_id: id });
  }

  async create(name: string, email: string, hashedPassword: string) {
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
