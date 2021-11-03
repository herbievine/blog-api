import 'reflect-metadata'
import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { Post } from 'src/posts/post.entity'

@ObjectType('CategoryEntity')
export class Category {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  color: string

  @Field((type) => [Post], { nullable: true })
  posts?: Post[]

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
