import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { AuthModule } from 'src/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [AuthModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '30d'
    }
  })],
  providers: [PrismaService, UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
