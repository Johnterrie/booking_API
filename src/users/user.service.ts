import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.email', 'users.role', 'users.workplace'])
      .getMany();
  }

  async addOne(email: string, password: string): Promise<User> {
    const user: User = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<Partial<User>> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return {
      id: user.id,

      email: user.email,
      // role: user.role,
      // workplace: user.workplace,
    };
  }

  async update(id: number, updateUserDTO: UpdateUserDto) {
    const user: Partial<User> = await this.findOne(id);
    await this.userRepository.update(user, updateUserDTO);
    return await this.userRepository.findOneBy({ id });
  }
}
