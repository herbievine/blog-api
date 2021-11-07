import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-express'
import { cookieConfig } from 'src/config'
import { UserCreateDto, UserLoginDto } from 'src/users/user.dto'
import { User } from 'src/users/user.entity'
import { AuthenticatedUser } from './auth.entity'
import { AuthService } from './auth.service'
import { Auth } from './auth.types'

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthenticatedUser)
  async register(
    @Context() { res }: Auth.GqlContext,
    @Args('payload', { type: () => UserCreateDto }) payload: UserCreateDto,
    @Args('websitePassword', { type: () => String }) websitePassword: string
  ): Promise<AuthenticatedUser> {
    if (websitePassword !== process.env.WEBSITE_PASSWORD) {
      throw new ForbiddenError('Unauthorized access')
    }

    const authenticatedUser = await this.authService.register(payload)

    res.cookie('jwt', authenticatedUser.jwt, cookieConfig)

    return authenticatedUser
  }

  @Mutation((returns) => AuthenticatedUser)
  async login(
    @Context() { res }: Auth.GqlContext,
    @Args('payload', { type: () => UserLoginDto }) payload: UserLoginDto
  ): Promise<AuthenticatedUser> {
    const authenticatedUser = await this.authService.login(payload)

    res.cookie('jwt', authenticatedUser.jwt, cookieConfig)

    return authenticatedUser
  }
}
