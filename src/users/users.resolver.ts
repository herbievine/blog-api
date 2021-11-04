import { Req } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from 'src/auth/auth.service'
import { Auth } from 'src/auth/auth.types'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserCreateDto } from './user.dto'
import { Jwt, User } from './User.entity'

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation((returns) => User)
  async createUser(
    @Args('payload', { type: () => UserCreateDto }) payload: UserCreateDto
  ): Promise<User> {
    const { user } = this.prismaService

    return user.create({
      data: {
        ...payload
      }
    })
  }
}
