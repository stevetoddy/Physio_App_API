import { Router } from 'express'
import { UserModel } from "../db.js"
import { check, validationResult } from 'express-validator'
// import jwt_decode from "jwt-decode"

const router = Router()

// USER ROUTES - All need valid JWT
// Retrieve all Users

router.get('/', async (req, res) => res.send(await UserModel.find()))


router.get('/', async (req, res) => {
  res.send(await UserModel.find())
})
  
// Retrieve a specific user
router.get('/:id', async (req, res) => {
  try {
    // const token = req.headers.authorization
    // const decoded = jwt_decode(token)
    // const requesterId = decoded.comparedUser[0]._id
    // if (req.params.id !== requesterId) {
    //   return res.status(401).send("This ain't your profile buddy")
    // }
    res.status(200).send(await UserModel.findById(req.params.id))
  } catch {
    res.status(404).send("The user was not found")
  }
})

// Update an User
router.put('/:id', [
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
    
    const { username, email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(400).json({
      errors: errors.array()
    })

    const updateUser = { username, email, password }

    try {

        // const token = req.headers.authorization
        // const decoded = jwt_decode(token)
        // const requesterId = decoded.comparedUser[0]._id
        // if (req.params.id !== requesterId) {
        //   return res.status(401).send("This ain't your profile buddy")
        // }
        const user = await UserModel.findByIdAndUpdate(req.params.id, updateUser, { returnDocument: 'after' })

        if (user) {
            res.send(await user.populate()) // MIGHT NEED TO CHECK // Reminder to check with Steve if a 404 else for this block is necessary. Difficult to access through a test.
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Delete User
router.delete('/:id', async (req, res) => {
    try {
      // const token = req.headers.authorization
      // const decoded = jwt_decode(token)
      // const requesterId = decoded.comparedUser[0]._id
      // if (req.params.id !== requesterId) {
      //   return res.status(401).send("This ain't your profile buddy")
      // }
      const user = await UserModel.findByIdAndDelete(req.params.id)
      
        if (user) {
            res.status(200).send("It was deleted")
        }
    }
    catch (err) {
        res.status(404).send()
    }
})

router.get('/:id/progress', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      const programs = await ProgramModel.find({userID: req.params.id})
      res.status(200).send(programs)
    }
  } catch (err) {
    res.status(404).send()
  }
})

export default router
