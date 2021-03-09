import express, { Request, Response, NextFunction } from 'express'
import createConnection from './database'
import { getRepository } from 'typeorm'
import { User } from './models/User'
import cors from 'cors'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
createConnection()
const app = express()

/** Adding CORS and JSON */
app.use(cors())
app.use(express.json())

function checksExistsUserAccount (req: Request, res: Response, next: NextFunction): void {
  // Complete aqui
}

app.post('/users', async (req: Request, res: Response): Promise<void> => {
  const { name, username } = req.body
  const userRepo = getRepository(User)
  const user = userRepo.create({ name, username })
  await userRepo.save(user)

  return res.status(201).send(user)
})

app.get('/todos', checksExistsUserAccount, (req: Request, res: Response): void => {
  // Complete aqui
})

app.post('/todos', checksExistsUserAccount, (req: Request, res: Response): void => {
  // Complete aqui
})

app.put('/todos/:id', checksExistsUserAccount, (req: Request, res: Response): void => {
  // Complete aqui
})

app.patch('/todos/:id/done', checksExistsUserAccount, (req: Request, res: Response): void => {
  // Complete aqui
})

app.delete('/todos/:id', checksExistsUserAccount, (req: Request, res: Response): void => {
  // Complete aqui
})

export default app
