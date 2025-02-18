import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotEnvConfig } from 'dotenv';
import { join } from 'path';

// Load environment variables
dotEnvConfig();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: (process.env.DB_DRIVER || 'mysql') as 'mysql' | 'mariadb' | 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')], // Auto-load entities
  synchronize: false,
  extra: {
    timezone: 'Z', // Force UTC
  },
};
