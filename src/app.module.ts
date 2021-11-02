import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostsModule } from './posts/posts.module'
import { LoggerService } from './logger/logger.service'
import { PrismaService } from './prisma/prisma.service'
import { CategoriesResolver } from './categories/categories.resolver';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService, PrismaService, CategoriesResolver],
})
export class AppModule {}
