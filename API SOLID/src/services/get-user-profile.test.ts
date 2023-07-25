import { beforeEach, describe, expect, test } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile'
import { ResourceNotFoundError } from './errs/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
// sut => System Under Test
let sut: GetUserProfileService

describe('Get user profile service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  test('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  test('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
