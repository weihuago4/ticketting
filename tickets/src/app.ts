import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors' // 处理异步异常
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@mtctickets/common'
import { createTicketRouter } from './routes/new'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(createTicketRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }