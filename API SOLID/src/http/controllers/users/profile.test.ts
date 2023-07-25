import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { test, afterAll, beforeAll, describe, expect } from 'vitest'

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const resposne = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(resposne.statusCode).toEqual(200)
    expect(resposne.body.user).toEqual(
      expect.objectContaining({
        email: 'jonh.doe@gmail.com',
      }),
    )
  })
})
