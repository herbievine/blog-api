import { User } from 'src/users/user.entity'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

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

  type DecodedJwt = {
    id: string
    email: string
    iat: number
    exp: number
  }

  interface Request extends ExpressRequest {
    user?: User
  }

  interface GqlContext extends GraphQLExecutionContext {
    req: ExpressRequest
    res: ExpressResponse
  }
}
