import { CookieOptions } from 'express'

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30, // one month
  domain: process.env.NODE_ENV === 'production' ? '.marble.com' : undefined
}
