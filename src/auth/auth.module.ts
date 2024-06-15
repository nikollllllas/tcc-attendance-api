import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
