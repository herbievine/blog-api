import 'reflect-metadata'
import { InputType, Field } from '@nestjs/graphql'
import { IsOptional, IsAlpha, IsHexColor } from 'class-validator'

@InputType('CategoryCreateDto')
export class CategoryCreateDto {
  @IsAlpha()
  @Field()
  name: string

  @IsHexColor()
  @Field()
  color: string
}

@InputType()
export class CategoryUpdateDto {
  @IsOptional()
  @IsAlpha()
  @Field({ nullable: true })
  name?: string

  @IsOptional()
  @IsHexColor()
  @Field({ nullable: true })
  color?: string
}
