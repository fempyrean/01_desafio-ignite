import express from 'express'
import cors from 'cors'

const app = express()

/** Adding CORS and JSON */
app.use(cors())
app.use(express.json())

export default app
