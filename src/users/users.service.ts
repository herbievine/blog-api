import { Injectable } from '@nestjs/common'
import { Args } from '@nestjs/graphql'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserCreateDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(
    @Args('email', { type: () => String }) email: string
  ): Promise<User | null> {
    const { user } = this.prismaService

    return user.findUnique({ where: { email } })
  }

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
