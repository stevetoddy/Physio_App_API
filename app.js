import express from "express"
import { UserModel, ProgramModel } from "./db.js"

// Declare express under 'app' and assign a port number
const app = express()
const port = 4001

// Parses incoming requests with JSON headers
app.use(express.json())

// app.get/.put/.post etc is middle ware that comes with express and needs to go before 'app.listen'
// First parameter is the path, and can take a callback function second, which takes two parameters 'request' and 'response' (req, res)
// We can send responses using 'response.send()'.... This can be HTML, objects etc..
app.get('/', (req, res) => res.status(200).send({info: `Physio App 2023`}))

// USER ROUTES
// Retrieve all Users
app.get('/users', async (req, res) => res.status(200).send(await UserModel.find()))

// Create an User
app.post('/signup/', async (req, res) => {
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
app.put('/users/:id', async (req, res) => {
    
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
app.delete('/users/:id', async (req, res) => {
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

// PROGRAM ROUTES
// Find All Programs 
app.get('/programs', async (req, res) => res.status(200).send(await ProgramModel.find()))

// Find All Programs Under User ID
app.get('/programs/users/:id', async (req, res) => res.status(200).send(await ProgramModel.find({ userID: req.params.id })))


// Get single entry using colon for RESTful parameter 
app.get('/programs/:id', async (req, res) => {
    try {
        const prog = await ProgramModel.findById(req.params.id)
        if (prog) {
            res.send(prog)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default app