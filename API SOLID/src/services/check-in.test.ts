import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { InMemoryCheckInsRepository } from 'in-memory/in-memory-check-ins-repository'
import { CheckInService } from './checkin'
import { InMemoryGymsRepository } from 'in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errs/max-number-of-check-ins-error'
import { MaxDistanceError } from './errs/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
// sut => System Under Test
let sut: CheckInService

describe('Check-in service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      latitude: -6.0850176,
      longitude: -39.4554036,
      description: null,
      phone: null,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.0850176,
      userLongitude: -39.4554036,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.0850176,
      userLongitude: -39.4554036,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -6.0850176,
        userLongitude: -39.4554036,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  test('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.0850176,
      userLongitude: -39.4554036,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -6.0850176,
      userLongitude: -39.4554036,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  test('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-6.073048),
      longitude: new Decimal(-39.47051),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -6.0850176,
        userLongitude: -39.4554036,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
