import { Router } from 'express'
import { UserModel } from "../db.js"

const router = Router()

// USER ROUTES
// Retrieve all Users
router.get('/', async (req, res) => res.status(200).send(await UserModel.find()))

// Create an User
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body

        const newUser = { username, email, password }

        const insertedUser = await UserModel.create(newUser)

        res.status(201).send(insertedUser)     
    }
    catch (err) {
         res.status(500).send({ error: err.message })
    }
})

// Update an User
router.put('/:id', async (req, res) => {
    
    const { username, email, password } = req.body
    // Validation/sanitize inputs here
    const updateUser = { username, email, password }

    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, updateUser, { returnDocument: 'after' })

        if (user) {
            res.send(await user.populate()) // MIGHT NEED TO CHECK
        } else {
            res.status(404).send({ error: 'User not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)

        if (user) {
            res.status(204)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default router
