import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

const auth = Router()


// SIGNUP ROUTE
auth.post('/signup', [
  check("email", "Please provide a valid email")
    .isEmail(),
  check("password", "Please provide a password that is greater than 5 characters.")
    .isLength({
      min: 6
    }),
  check("username", "Please provide a username that is greater than 5 characters.")
    .isLength({
      min: 6
    })
], async (req, res) => {
  try {
    const { username, email, password } = req.body

  // VALIDATED THE INPUT
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({
      errors: errors.array()
    })

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = { username, email, password: hashedPassword }

  const insertedUser = await UserModel.create(newUser)

  // Payload
  const token = await jwt.sign({
    newUser
    // Below, use an ENV reference
  }, "nfb32iur32ibfqfvi3vf932bg932g932", {
    expiresIn: 360000
  })

  res.status(201).json({ insertedUser, token })

  } catch (err) {
    res.status(500).send({ error: err.message })
  }
  
})

export default auth