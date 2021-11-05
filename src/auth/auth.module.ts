import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UsersService } from 'src/users/users.service'
import { AuthResolver } from './auth.resolver'

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
    AuthService,
    UsersService,
    AuthResolver
  ],
  exports: [AuthService]
})
export class AuthModule {}
