import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      description,
      phone,
      title,
    })
    return { gym }
  }
}
