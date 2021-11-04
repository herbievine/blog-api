import { Controller, Logger, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard'
import { Auth } from './auth.types'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Auth.Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ jwt: string }> {
    const { email, password } = req.user

    const { jwt } = await this.authService.login({ email, password })

    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 31, // one month
      domain:
        process.env.NODE_ENV === 'production' ? '.herbievine.com' : undefined
    })

    return { jwt }
  }
}
