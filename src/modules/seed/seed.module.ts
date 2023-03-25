import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { seedDataSourceOptions } from '../../database';
import { User } from '../user/entities';
import { UserSeeder } from './user.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(seedDataSourceOptions),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [SeedService, UserSeeder],
})
export class SeedModule {}
