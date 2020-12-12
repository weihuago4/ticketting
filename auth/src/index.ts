import express from 'express'
import { json } from 'body-parser'

const app = express()

app.use(json())

app.get('/api/users/currentuser', (req, res) => {
  console.log('Hi There!')
})

app.post('/api/users/signout', (req, res) => {

})

app.post('/api/users/signin', (req, res) => {

})

app.post('/api/users/signup', (req, res) => {

})

app.listen(3000, () => {
  console.log('Auth Server is listening on 3000!!!!')
})