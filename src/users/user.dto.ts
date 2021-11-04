import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsEmail } from 'class-validator'

@InputType('UserCreateDto')
export class UserCreateDto {
  @IsString()
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @IsString()
  @Field()
  password: string
}
