import 'reflect-metadata'
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType('UserEntity')
export class User {
  @Field()
  uuid: string

  @Field()
  id: string

  @Field()
  username?: string

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
