import { getConnection } from 'typeorm'
import app from '../server'
import createConnection from '../database'
import request from 'supertest'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })
  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  test('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'any_name',
      username: 'any_username'
    })
    expect(response.status).toBe(201)
  })

  test('Should not be able to create a new user when username already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'any_name',
      username: 'any_username'
    })
    expect(response.status).toBe(400)
  })
})
