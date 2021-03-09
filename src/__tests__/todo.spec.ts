import { getConnection } from 'typeorm'
import app from '../server'
import createConnection from '../database'
import request from 'supertest'

let user = null

describe('Todos', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()

    user = await request(app).post('/users').send({
      name: 'any_name',
      username: 'any_username'
    })

    await request(app).post('/todos').set('user', user.body.id).send({
      title: 'any_title',
      deadline: '2021-12-31'
    })
  })
  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  test('Should be able to list all user`s todos', async () => {
    const { id } = user.body
    const response = await request(app).get('/todos').set('user', id).send()
    expect(response.body.length).toBe(1)
  })
})
