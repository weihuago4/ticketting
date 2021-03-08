import { app } from './app'
import mongoose from 'mongoose'

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY should not be undefined.')
    }
    if(!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be provided.')
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log('Connecting to the db...')
  } catch (error) {
    console.error(error)
  }
}

app.listen(3000, () => {
  console.log('Auth Server is listening on 3000!!!')
  start()
})