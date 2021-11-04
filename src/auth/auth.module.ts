import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './auth.strategy'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { UsersService } from 'src/users/users.service'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d'
      }
    })
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    UsersService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
