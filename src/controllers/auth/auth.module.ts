// src/controllers/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // opcional si ya usas JwtModule en otro lado
  ],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy], // 👈 importante exportar
})
export class AuthModule {}
