import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { Auth } from './auth.types'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(
    email: string,
    password: string
  ): Promise<Auth.CleanUser | null> {
    const user = await this.usersService.getUser(email)

    if (user && user.password === password) {
      const { password, ...rest } = user

      return rest
    }

    return null
  }

  async login(user: Auth.BasicUser): Promise<{ jwt: string }> {
    const payload = {
      email: user.email,
      password: user.password
    }

    return {
      jwt: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET
      })
    }
  }

  async verify(jwt: string): Promise<User> {
    const decoded = await this.jwtService.verifyAsync(jwt, {
      secret: process.env.JWT_SECRET
    })

    const user = await this.usersService.getUser(decoded.email)

    if (user && user.password === decoded.password) {
      return user
    }

    return null
  }

  async createUser(user: User): Promise<{ jwt: string }> {
    const payload = {
      email: user.email,
      password: user.password
    }

    await this.usersService.createUser(user)

    return {
      jwt: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET
      })
    }
  }
}
