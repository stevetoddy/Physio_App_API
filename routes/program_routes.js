import { Router } from 'express'
import { ProgramModel } from "../db.js"
import authenticateToken from '../controllers/auth_controller.js'

export const router = Router()

// PROGRAM ROUTES -  ALl need valid JWT
// Find All Programs 
router.get('/', async (req, res) => res.status(200).send(await ProgramModel.find()))

// Find All Programs Under User ID
router.get('/users/:id', async (req, res) => res.status(200).send(await ProgramModel.find({ userID: req.params.id })))


// Get single entry using colon for RESTful parameter 
router.get('/:id', async (req, res) => {
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

// Create a Program
router.post('/', async (req, res) => {
    try {
        const { name, exercises, metrics, userID } = req.body

        const newProgram = { name, exercises, metrics, userID }

        const insertedProgram = await ProgramModel.create(newProgram)

        res.status(201).send(insertedProgram)     
    }
    catch (err) {
         res.status(500).send({ error: err.message })
    }
})


// Update Exercise List (One or Many)
router.put('/exercise/:id', async (req, res) => {
    const { exercises } = req.body
    const updateExercise = { exercises }

    try {
        const exercises = await ProgramModel.findByIdAndUpdate(req.params.id,{ $push: updateExercise}, { returnDocument: 'after' })

        if (exercises) {
            res.send(await exercises.populate()) 
        } else {
            res.status(404).send({ error: 'Program could not be found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Replace Exercise List with new Exercises
router.put('/exercise/all/:id', async (req, res) => {
    const { exercises } = req.body
    const updateExercise = { exercises }

    try {
        const exercises = await ProgramModel.findByIdAndUpdate(req.params.id, updateExercise, { returnDocument: 'after' })

        if (exercises) {
            res.send(await exercises.populate()) 
        } else {
            res.status(404).send({ error: 'Program could not be found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Update Metrics List (One or Many)
router.put('/metrics/:id', async (req, res) => {
    const { metrics } = req.body
    const updateMetrics = { metrics }

    try {
        const metrics = await ProgramModel.findByIdAndUpdate(req.params.id,{ $push: updateMetrics}, { returnDocument: 'after' })

        if (metrics) {
            res.send(await metrics.populate()) 
        } else {
            res.status(404).send({ error: 'Program could not be found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default router
