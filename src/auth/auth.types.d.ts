import { User } from 'src/users/user.entity'
import { Request as ExpressRequest } from 'express'

export namespace Auth {
  type CleanUser = Omit<User, 'password'>

  type BasicUser = {
    email: string
    password: string
  }

  type JwtPayload = {
    email: string
    password: string
  }

  interface Request extends ExpressRequest {
    user?: User
  }
}
