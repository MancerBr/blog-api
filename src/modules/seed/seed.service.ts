import { Injectable, Logger } from '@nestjs/common';

import { ISeeder } from './seeder.interface';
import { UserSeeder } from './user.seeder';

@Injectable()
export class SeedService {
  private readonly seeders: ISeeder[];
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly userSeeder: UserSeeder) {
    this.seeders = [this.userSeeder];
  }

  public async run(): Promise<void> {
    this.logger.log('[run] Start seeding');
    for (const seeder of this.seeders) {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    }
    this.logger.log('[run] Seeding has been completed');
  }
}
