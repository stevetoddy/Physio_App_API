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
      min: 3
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
 
  res.status(201).json(insertedUser)

  } catch (err) {
      if (err.code === 11000) return res.status(400).json({ error: 'This username/email already exists. Please choose another.'})
      res.status(500).send({ error: err.message })
  }
  
})


// LOGIN ROUTE
auth.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Find user using email
    const loginUserEmail = { email }
    const comparedUser = await UserModel.find(loginUserEmail)

    console.log(comparedUser)
    // If no user is found, send error msg
    if(comparedUser.length === 0){
        return res.status(422).json({
            errors: "Invalid Details. Please check email and password are correct",
        })

    }

    // Check if password is valid against stored, hashed password
    if(!await bcrypt.compare(password, comparedUser[0].password)){
        return res.status(404).json({
            error: "Invalid Password: Bcrypt Error"
        })
    }
    
    
    // const token = await jwt.sign({ comparedUser }, 
    //     // Below, use an ENV reference
    //     process.env.JWT_SECRET, 
    //     { expiresIn: 360000 }
    // )
    
        // Temp response to get token

        res.json(token)



  } catch (error) {
        res.status(500).send({error: error.message})
  }
})

export default auth