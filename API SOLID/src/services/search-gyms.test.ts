import { beforeEach, describe, expect, test } from 'vitest'
import { SearchGymsService } from './search-gyms'
import { InMemoryGymsRepository } from 'in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
// sut => System Under Test
let sut: SearchGymsService

describe('Search gyms service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  test('should be able to fetch check-in history', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      latitude: -6.0850176,
      longitude: -39.4554036,
      description: null,
      phone: null,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      latitude: -6.0850176,
      longitude: -39.4554036,
      description: null,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  test('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym ${i}`,
        latitude: -6.0850176,
        longitude: -39.4554036,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym 21' }),
      expect.objectContaining({ title: 'Javascript Gym 22' }),
    ])
  })
})
