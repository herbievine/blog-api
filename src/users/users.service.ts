import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { toApolloError } from 'apollo-server-errors'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserCreateDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getUser(email: string): Promise<User> {
    const { user } = this.prismaService

    const query = await user.findUnique({ where: { email } })

    if (query === null) {
      throw toApolloError(
        new NotFoundException(`User with email ${email} not found`)
      )
    }

    return query
  }

  public async createUser(payload: UserCreateDto): Promise<User> {
    const { user } = this.prismaService

    return user.create({
      data: {
        ...payload
      }
    })
  }
}
