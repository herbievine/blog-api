import 'reflect-metadata'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsString, IsInt, IsOptional } from 'class-validator'
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

  @IsInt()
  @Field((type) => Int, { defaultValue: 1 })
  views: number

  @Field((type) => [Category])
  categories: Category[]
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
h
  @IsOptional()
  @IsInt()
  @Field((type) => Int, {nullable: true})
  views?: number
}
