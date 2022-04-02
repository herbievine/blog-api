import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsOptional, Matches } from 'class-validator'

@InputType('UserCreateDto')
export class UserCreateDto {
  @IsString()
  @Matches(/^[a-zA-z]{2}[0-9]{6}$/g)
  @Field()
  id: string

  @IsOptional()
  @Field((type) => String, { nullable: true })
  username?: string
}
