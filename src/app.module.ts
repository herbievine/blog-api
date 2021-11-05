import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ThrottlerModule } from '@nestjs/throttler'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { PostsModule } from './posts/posts.module'
import { CategoriesModule } from './categories/categories.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? '.herbievine.com'
            : 'http://localhost:4000',
        credentials: true,
      }
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    }),
    PostsModule,
    CategoriesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
