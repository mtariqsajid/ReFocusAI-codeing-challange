import { DataSource } from 'typeorm';
import { config as dotEnvConfig } from 'dotenv';

// Load environment variables from .env file
dotEnvConfig();

export const AppDataSource = new DataSource({
  type: (process.env.DB_DRIVER || 'mysql') as 'mysql' | 'mariadb' | 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: ['./database/migrations/*-migration,ts'],
  migrationsRun: false,
  logging: false,
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );
