import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialError } from './errs/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
// sut => System Under Test
let sut: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  test('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  test('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
