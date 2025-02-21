import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: bcrypt.hashSync(createUserDto.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException('Credentials are invalid');
  }
}
