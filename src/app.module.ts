import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app.jwt.secret'),
          signOptions: { expiresIn: '1h', issuer: 'upload-jet' },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('database'),
          synchronize: true,
          entities: [User],
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
