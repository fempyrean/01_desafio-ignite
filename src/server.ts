import express, { Request, Response, NextFunction } from 'express'
import createConnection from './database'
import { getRepository } from 'typeorm'
import { User } from './models/User'
import { Todo } from './models/Todo'
import cors from 'cors'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
createConnection()
const app = express()

/** Adding CORS and JSON */
app.use(cors())
app.use(express.json())

async function checksExistsUserAccount (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.headers.user) {
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({
      where: { id: req.headers.user }
    })
    req.user = user
    return next()
  }
  return res.status(404).send({ error: 'User not found' })
}

app.post('/users', async (req: Request, res: Response): Promise<void> => {
  const { name, username } = req.body
  const userRepo = getRepository(User)
  const existingUser = await userRepo.findOne({ username })
  if (existingUser) return res.status(400).send({ error: 'Username is already being used' })
  const user = userRepo.create({ name, username })
  await userRepo.save(user)

  return res.status(201).send(user)
})

app.get('/todos', checksExistsUserAccount, async (req: Request, res: Response): Promise<void> => {
  const { user } = req
  const todosRepo = getRepository(Todo)
  const todos = await todosRepo.find({
    where: { user_id: user.id }
  })

  return res.status(200).send(todos)
})

app.post('/todos', checksExistsUserAccount, async (req: Request, res: Response): Promise<void> => {
  const { title, deadline } = req.body
  const { id } = req.user
  const todosRepo = getRepository(Todo)
  const todo = todosRepo.create({
    title,
    deadline: new Date(deadline),
    user_id: id,
    done: false
  })
  await todosRepo.save(todo)

  return res.status(201).send(todo)
})

app.put('/todos/:id', checksExistsUserAccount, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const todosRepo = getRepository(Todo)
  const todo = await todosRepo.findOne({ id, user_id: req.user.id })
  if (!todo) return res.status(404).send({ error: 'Could not find todo' })
  /** Here, we have a valid todo. We shall update it with the data sent on the request */
  const updatedTodo = {
    ...todo,
    ...req.body
  }
  await todosRepo.save(updatedTodo)

  return res.status(204).send(updatedTodo)
})

app.patch('/todos/:id/done', checksExistsUserAccount, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const todosRepo = getRepository(Todo)
  const todo = await todosRepo.findOne({ id, user_id: req.user.id })
  if (!todo) return res.status(404).send({ error: 'Could not find todo' })
  /** Here, we have a valid todo. We shall update the done property to true */
  const updatedTodo = {
    ...todo,
    done: true
  }
  await todosRepo.save(updatedTodo)

  return res.status(204).send(updatedTodo)
})

app.delete('/todos/:id', checksExistsUserAccount, async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const todosRepo = getRepository(Todo)
  const todo = await todosRepo.findOne({ id, user_id: req.user.id })
  if (!todo) return res.status(404).send({ error: 'Could not find todo' })
  await todosRepo.delete(id)

  return res.status(204).send(todo)
})

export default app
