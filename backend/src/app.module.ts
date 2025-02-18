import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ServerController } from './server/server.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({ ...typeOrmConfig, autoLoadEntities: true }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [ServerController],
})
export class AppModule {}
