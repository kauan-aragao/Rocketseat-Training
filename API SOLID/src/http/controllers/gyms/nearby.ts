import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGymService = makeFetchNearbyGymsService()

  const { gyms } = await fetchNearbyGymService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
