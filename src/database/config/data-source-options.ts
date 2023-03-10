import * as path from 'path';
import * as dotenv from 'dotenv';

import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: +process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  logging: process.env['NODE_ENV'] === 'development',
  entities: [path.resolve(__dirname, '../../**/*.entity{.js,.ts}')],
  migrations: [path.resolve(__dirname, '../migrations/*{.js,.ts}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: false,
  ssl: false,
};
