import 'reflect-metadata'
import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql'
import { User } from 'src/users/user.entity'

@ObjectType('AuthenticatedUserEntity')
export class AuthenticatedUser {
  @Field()
  jwt: string

  @Field((type) => User)
  user: User
}
