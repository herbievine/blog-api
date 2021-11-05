import { Logger } from '@nestjs/common'
import { Args, Context, GraphQLExecutionContext, Mutation, Resolver } from '@nestjs/graphql'
import { ForbiddenError } from 'apollo-server-express'
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
		@Context() context: Auth.GqlContext,
		@Args('payload', { type: () => UserCreateDto }) payload: UserCreateDto,
		@Args('password', { type: () => String }) password: string,
  ): Promise<AuthenticatedUser> {
		if (password !== process.env.WEBSITE_PASSWORD) {
			throw new ForbiddenError('Unauthorized access')
		}

		const authenticatedUser = await this.authService.register(payload)

		context.res.cookie('jwt', authenticatedUser.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month
      domain:
        process.env.NODE_ENV === 'production' ? '.herbievine.com' : undefined
    })

		return authenticatedUser
	}
	
	@Mutation((returns) => AuthenticatedUser)
  async login(
		@Context() context: Auth.GqlContext,
    @Args('payload', { type: () => UserLoginDto }) payload: UserLoginDto
  ): Promise<AuthenticatedUser> {
		const authenticatedUser = await this.authService.login(payload)

		context.res.cookie('jwt', authenticatedUser.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30, // one month
      domain:
        process.env.NODE_ENV === 'production' ? '.herbievine.com' : undefined
    })

		return authenticatedUser
  }
}
