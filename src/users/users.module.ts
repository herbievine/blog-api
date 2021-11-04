import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from './users.service'
import { AuthModule } from 'src/auth/auth.module'
import { UsersResolver } from './users.resolver';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
