import { Module } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesResolver } from './categories.resolver';

@Module({
	providers: [PrismaService, LoggerService, CategoriesResolver],
})
export class CategoriesModule {}
