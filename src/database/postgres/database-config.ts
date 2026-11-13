import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions, FormattedConsoleLogger } from 'typeorm';

import { User } from '../../modules/users/entities/user.ts';
import { NamingStrategy } from './naming-strategy.ts';

dotenv.config({ quiet: true });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL as string,
  poolSize: 3,
  schema: 'public',
  entities: [User],
  migrations: ['./migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  namingStrategy: new NamingStrategy(),
  synchronize: false,
  logging: ['schema', 'error', 'warn'],
  logger: new FormattedConsoleLogger(['schema', 'error', 'warn']),
};

export default new DataSource(dataSourceOptions);
