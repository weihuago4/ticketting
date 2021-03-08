import express, { Request, Response } from 'express'
import { body, } from 'express-validator'
import { validateRequest, BadRequestError } from '@mtctickets/common'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { Password } from '../services/password'

const router = express.Router()

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Invalid email address.'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
  validateRequest
  , async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('credientials failed.')
    }

    const passwordMatch = await Password.compare(existingUser.password, password)
    if (!passwordMatch) {
      throw new BadRequestError('credientials failed.')
    }

    // generate jwt
    const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)

    // store it on session object
    req.session = { jwt: userJwt }

    res.status(200).send(existingUser)
  })

export { router as signinRouter }