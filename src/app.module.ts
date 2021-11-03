import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { PostsModule } from './posts/posts.module'
import { CategoriesModule } from './categories/categories.module'
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql')
    }),
    PostsModule,
    CategoriesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
