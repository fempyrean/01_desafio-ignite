import { getConnection } from 'typeorm'
import app from '../server'
import createConnection from '../database'
import request from 'supertest'

let user = null
let todo = null

describe('Todos', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()

    user = await request(app).post('/users').send({
      name: 'any_name',
      username: 'any_username'
    })

    todo = await request(app).post('/todos').set('user', user.body.id).send({
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

  test('Should be able to create a new todo', async () => {
    const { id } = user.body
    const response = await request(app).post('/todos').set('user', id).send({
      title: 'any_title',
      deadline: '2021-12-31'
    })
    expect(response.status).toBe(201)
  })

  test('Should be able to update a todo', async () => {
    const { id } = user.body
    const { id: todoId } = todo.body
    const response = await request(app).put(`/todos/${String(todoId)}`).set('user', id).send({
      title: 'new_title',
      deadline: '2022-01-01'
    })
    expect(response.status).toBe(204)
  })

  test('Should not be able to update a non existing todo', async () => {
    const { id } = user.body
    const response = await request(app).put('/todos/invalid_id').set('user', id).send({
      title: 'new_title',
      deadline: '2022-01-01'
    })
    expect(response.body).toHaveProperty('error')
    expect(response.status).toBe(404)
  })
})
