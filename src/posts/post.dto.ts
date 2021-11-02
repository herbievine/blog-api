import 'reflect-metadata'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator'
import { Category } from 'src/categories/category.entity'

@InputType()
export class PostCreateDto {
  @IsString()
  @Field()
  title: string

  @IsString()
  @Field()
  slug: string

  @IsString()
  @Field()
  description: string

  @IsString()
  @Field()
  relativeImage: string

  @IsString()
  @Field()
  rawMdx: string

  @IsOptional()
  @IsBoolean()
  @Field((type) => Boolean)
  published?: boolean

  // @IsOptional()
  // @Field((type) => [Category])
  // categories: Category[]
}

@InputType()
export class PostUpdateDto {
  @IsOptional()
  @IsString()
  @Field({nullable: true})
  title?: string

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  slug?: string

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  description?: string

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  relativeImage?: string

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  rawMdx?: string

  @IsOptional()
  @IsInt()
  @Field((type) => Int, {nullable: true})
  views?: number
}
