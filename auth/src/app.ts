import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors' // 处理异步异常
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import cookieSession from 'cookie-session'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler, NotFoundError } from '@mtctickets/common'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }