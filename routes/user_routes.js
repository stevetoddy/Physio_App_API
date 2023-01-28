import { Router } from 'express'
import { UserModel } from "../db.js"
import authenticateToken from '../controllers/auth_controller.js'
import { check, validationResult } from 'express-validator'

const router = Router()

// USER ROUTES - All need valid JWT
// Retrieve all Users
// Add AUTH
router.get('/', async (req, res) => res.send(await UserModel.find()))

// Retrieve a specific user
// ADD AUTH
router.get('/:id', async (req, res) => res.send(await UserModel.findById(req.params.id)))

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
        // if(req.user.id.toString() !== req.params.id.toString()) {
        //     return res.status(401).send({ "error": "Unauthorized to perform this action" })
        // }
        const user = await UserModel.findByIdAndDelete(req.params.id)

        if (user) {
            res.status(204).send()
        }
    }
    catch (err) {
        res.status(404).send()
    }
})


export default router
