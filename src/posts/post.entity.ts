import 'reflect-metadata'
import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { Category } from 'src/categories/category.entity'

@ObjectType()
export class Post {
  @Field()
  id: string

  @Field()
  title: string

  @Field()
  slug: string

  @Field()
  description: string

  @Field()
  relativeImage: string

  @Field()
	rawMdx: string
	
	@Field((type) => Boolean)
  published: boolean

  @Field((type) => Int)
	views: number

	@Field((type) => Int)
	likes: number
	
	@Field((type) => [Category], { nullable: true })
	categories?: Category[]

  @Field((type) => GraphQLISODateTime)
  createdAt: Date

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date
}
