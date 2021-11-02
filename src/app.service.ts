import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): { greeting: string } {
    return { greeting: 'Hello World!' }
  }
}
