import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let resolver: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    }).compile()

    resolver = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
