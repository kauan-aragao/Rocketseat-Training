import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      email: 'jonh.doe@gmail.com',
      password_hash: await hash('123456', 6),
      name: 'John Doe',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const auhtResponse = await request(app.server).post('/sessions').send({
    email: 'jonh.doe@gmail.com',
    password: '123456',
  })

  const { token } = auhtResponse.body

  return { token }
}
