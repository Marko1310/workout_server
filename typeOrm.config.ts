import { config } from 'dotenv';
config();

import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './src/config/database.config';

const dataSourceConfig: DataSourceOptions = {
  ...databaseConfig(),
  type: 'postgres',
  entities: [`./src/**/*entity.ts`],
  migrations: [`./src/**/*migrations.ts`],
  migrationsTableName: 'migrations_typeorm',

  logging: true,
};
export default new DataSource({ ...dataSourceConfig });
