import { Injectable, Scope, ConsoleLogger } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  // log(message: string) {
  // 	return this.log(`hello ${message}`)
  // }
}
