import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ThrottlerModule } from '@nestjs/throttler'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service'
import { PostsModule } from './posts/posts.module'
import { CategoriesModule } from './categories/categories.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

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
        credentials: true
      }
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    }),
    ConfigModule.forRoot(),
    PostsModule,
    CategoriesModule,
    UsersModule,
    AuthModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
