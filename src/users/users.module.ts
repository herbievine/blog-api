import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from './users.service'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [PrismaService, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
