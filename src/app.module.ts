import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/guards/jwt.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users-modules/users.module';
import { WorkoutSplitsModule } from '@training-modules/workout-splits/workout-splits.module';
import { WorkoutsModule } from '@training-modules/workouts/workouts.module';
import { ExercisesModule } from '@training-modules/exercises/exercises.module';
import { SessionsModule } from '@training-modules/sessions/sessions.module';
import { IdentityModule } from '@identity-modules/identity.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(config: ConfigService) {
        return {
          secret: config.get('app.jwt.secret'),
          signOptions: { expiresIn: '1h', issuer: 'workout' },
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    IdentityModule,
    WorkoutSplitsModule,
    WorkoutsModule,
    ExercisesModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
