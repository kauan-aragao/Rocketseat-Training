import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { InMemoryCheckInsRepository } from 'in-memory/in-memory-check-ins-repository'
import { ValidateService } from './validate-check-in'
import { ResourceNotFoundError } from './errs/resource-not-found-error'
import { LateCheckInValidateError } from './errs/late-check-in-validate-error'

let checkInsRepository: InMemoryCheckInsRepository
// sut => System Under Test
let sut: ValidateService

describe('Validate check-in service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  test('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent check-in id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('should not be able to validate the check in after 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const twentyOneMinutesInMiliseconds = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)

    await expect(() =>
      sut.execute({ checkInId: createdCheckIn.id }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
