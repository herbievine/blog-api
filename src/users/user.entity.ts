import 'reflect-metadata'
import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType('UserEntity')
export class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  email: string

  password: string

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}

@ObjectType('JwtEntity')
export class Jwt {
  @Field()
  jwt: string
}
