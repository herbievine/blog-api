import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'
import { Auth } from './auth.types'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(
    email: string,
    password: string
  ): Promise<Auth.CleanUser | null> {
    const user = await this.authService.validate(email, password)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
