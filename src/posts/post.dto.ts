import 'reflect-metadata'
import { InputType, Field, Int } from '@nestjs/graphql'
import { IsString, IsInt, IsOptional, IsBoolean, IsAlpha } from 'class-validator'

@InputType('PostCreateDto')
export class PostCreateDto {
  @IsString()
  @Field()
  title: string

  @IsOptional()
  @IsAlpha()
  @Field((type) => String, { nullable: true })
  slug?: string

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
  @Field((type) => Boolean, { nullable: true })
  published?: boolean
}

@InputType()
export class PostUpdateDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  title?: string

  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  slug?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  relativeImage?: string

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  rawMdx?: string

  @IsOptional()
  @IsInt()
  @Field((type) => Int, { nullable: true })
  views?: number
}
