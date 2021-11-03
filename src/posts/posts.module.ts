import { Module } from '@nestjs/common'
import { LoggerService } from 'src/logger/logger.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { PostsResolver } from './posts.resolver'

@Module({
  providers: [PrismaService, LoggerService, PostsResolver]
})
export class PostsModule {}
