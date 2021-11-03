import 'reflect-metadata'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsString, IsOptional, IsAlpha } from 'class-validator'
import { Post } from 'src/posts/post.entity'

@InputType('CategoryCreateDto')
export class CategoryCreateDto {
  @IsAlpha()
  @Field()
  name: string

  @IsString()
  @Field()
  color: string

  // @IsOptional()
  // @Field((type) => [Post])
  // posts: Post[]
}

@InputType()
export class CategoryUpdateDto {
  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  color?: string
}
