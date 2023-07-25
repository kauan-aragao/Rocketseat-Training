import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryGymsRepository } from 'in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
// sut => System Under Test
let sut: FetchNearbyGymsService

describe('Fetch nearby gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  test('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -6.338376,
      longitude: -39.307661,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -6.0850176,
      longitude: -39.4554036,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -6.0850176,
      userLongitude: -39.4554036,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
