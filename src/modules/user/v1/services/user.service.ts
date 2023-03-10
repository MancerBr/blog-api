import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { User } from '../../entities';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRoleDto,
  UserDto,
} from '../dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public getUserByEmailAndSelect(
    email: string,
    select: FindOptionsSelect<User>,
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      select,
      where: {
        email,
      },
    });
  }

  public getProfile(id: number): Promise<User> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(userDto);
      return await this.usersRepository.save(user);
    } catch (e) {
      if (e?.code === '23505') {
        throw new ConflictException(`User ${userDto.email} already exist!`);
      }
      throw e;
    }
  }

  public async update(id: number, updateDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneByOrFail({ id });
    const updateUser = this.usersRepository.create({
      ...user,
      ...updateDto,
    });
    try {
      return await this.usersRepository.save(updateUser);
    } catch (e) {
      if (e?.code === '23505') {
        throw new ConflictException(`Can't update email, try another email`);
      }
      throw e;
    }
  }

  public async delete(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneByOrFail({ id });
    return this.usersRepository.remove(user);
  }

  public async updateRole(body: UpdateUserRoleDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneByOrFail({
      id: body.userId,
    });
    user.role = body.role;
    return this.usersRepository.save(user);
  }
}
