import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserCreateDto, UserLoginDto } from 'src/users/user.dto'
import { User } from 'src/users/user.entity'
import { UsersService } from 'src/users/users.service'
import { AuthenticatedUser } from './auth.entity'
import { Auth } from './auth.types'
import { verify, hash } from 'argon2'
import { AuthenticationError } from 'apollo-server-express'

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

  async login(payload: UserLoginDto): Promise<AuthenticatedUser> {
    const { password, email } = payload

    const user = await this.usersService.getUser(email)

    const isValidPassword = await this.verifyPassword(user.password, password)

    if (!isValidPassword) {
      throw new AuthenticationError('Password does not match')
    }

    const { id } = user

    const jwt = await this.jwtService.signAsync({ id, email }, {
      secret: process.env.JWT_SECRET
    })

    return {
      jwt,
      user
    }
  }

  async verify(jwt: string): Promise<User> {
    const decoded = await this.jwtService.verifyAsync(jwt, {
      secret: process.env.JWT_SECRET
    })

    const user = await this.usersService.getUser(decoded.email)

    const isValidPassword = await this.verifyPassword(user.password, decoded.password)

    if (user && isValidPassword) {
      return user
    }

    return null
  }

  async register(payload: UserCreateDto): Promise<AuthenticatedUser> {
    const { password, ...restOfPayload } = payload

    const hashedPassword = await this.hashPassword(password)

    const user = await this.usersService.createUser({
      password: hashedPassword,
      ...restOfPayload
    })

    const { id, email } = user

    const jwt = await this.jwtService.signAsync({ id, email }, {
      secret: process.env.JWT_SECRET
    })

    return {
      jwt,
      user
    }
  }

  private async verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return await verify(hashedPassword, password)
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, {
      // salt: Buffer.from(process.env.AUTH_SALT)
    })
  }
}
