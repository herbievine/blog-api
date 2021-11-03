import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoriesResolver } from './categories.resolver'

@Module({
  providers: [PrismaService, CategoriesResolver]
})
export class CategoriesModule {}
