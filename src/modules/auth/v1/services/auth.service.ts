import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../../user/v1/services';
import { User } from '../../../user/entities';
import { CreateUserDto } from '../../../user/v1/dto';
import { JwtDto } from '../dto';
import { ERole } from '../../enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.getUserByEmailAndSelect(email, {
      id: true,
      role: true,
      password: true,
    });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
  }

  public async signUp(userDto: CreateUserDto): Promise<JwtDto> {
    const user = await this.userService.create(userDto);
    return this.getAccessToken(user.id, user.role);
  }

  public async signIn(user: User): Promise<JwtDto> {
    return this.getAccessToken(user.id, user.role);
  }

  private getAccessToken(id: number, role: ERole): JwtDto {
    return {
      accessToken: this.jwtService.sign({ sub: id, role }),
    };
  }
}
