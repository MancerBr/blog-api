import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISeeder } from './seeder.interface';
import { User } from '../user/entities';
import { ERole } from '../auth/enums';

@Injectable()
export class UserSeeder implements ISeeder {
  private readonly logger = new Logger(UserSeeder.name);
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async seed(): Promise<void> {
    await this.createAdminIfNotExist();
  }

  private async createAdminIfNotExist(): Promise<void> {
    const admin = await this.usersRepository.findOneBy({
      role: ERole.Admin,
    });

    if (admin) {
      this.logger.log(
        '[createAdminIfNotExist] User with role Admin already exist',
      );
      return;
    }

    const userAdmin = this.usersRepository.create({
      email: 'admin',
      firstName: 'UserAdmin',
      lastName: 'UserAdmin',
      password: 'admin',
      role: ERole.Admin,
    });
    try {
      await this.usersRepository.insert(userAdmin);
      this.logger.log(
        `[createAdminIfNotExist] Admin has been created with credentials (email: admin, password: admin), login to system and change email and password`,
      );
    } catch (e) {
      this.logger.error(JSON.stringify(e));
    }
  }
}
