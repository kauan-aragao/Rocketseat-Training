import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryGymsRepository } from 'in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  test('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      latitude: -6.0850176,
      longitude: -39.4554036,
      description: null,
      phone: null,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
