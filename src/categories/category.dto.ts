import 'reflect-metadata'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator'
import { Post } from 'src/posts/post.entity'

@InputType()
export class CategoryCreateDto {
  @IsString()
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
  @IsString()
  @Field({nullable: true})
  name?: string

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  color?: string
}
