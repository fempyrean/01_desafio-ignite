import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

const app = express()

/** Adding CORS and JSON */
app.use(cors())
app.use(express.json())

function checksExistsUserAccount(req: Request, res: Response, next: NextFunction): void {
  // Complete aqui
}

app.post('/users', (req: Request, res: Response): void => {
  // Complete aqui
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
