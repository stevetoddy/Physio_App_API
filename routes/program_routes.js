import { Router } from 'express'
import { ProgramModel } from "../db.js"

import jwt_decode from "jwt-decode"

export const router = Router()


// Find All Programs 
router.get('/', async (req, res) => res.status(200).send(await ProgramModel.find()))

// Find All Programs Under User ID
router.get('/users/:id', async (req, res) => {
    // const token = req.headers.authorization
    // const decoded = jwt_decode(token)
    // const requesterId = decoded.comparedUser[0]._id
    // if (req.params.id !== requesterId) {
    //     return res.status(401).send("This ain't your profile buddy")
    // }
    res.status(200).send(await ProgramModel.find({ userID: req.params.id }))
})


// Get single entry using colon for RESTful parameter 

router.get('/:id', async (req, res) => {
    try {
        const prog = await ProgramModel.findById(req.params.id)
        if (prog) 
            res.send(prog)
    } catch (err) {
        res.status(404).send({ error: 'Program was not found' })
        }
    })
    

// Create a Program

// FIX USER ID (HINT, token)

router.post('/', async (req, res) => {
    try {
        // const token = req.headers.authorization
        // const decoded = jwt_decode(token)
        // const requesterId = decoded.comparedUser[0]._id
        // if (req.params.id !== requesterId) {
        //     return res.status(401).send("This ain't your profile buddy")
        // }

        const { name, exercises, metrics, userID } = req.body

        const newProgram = { name, exercises, metrics, userID }

        const insertedProgram = await ProgramModel.create(newProgram)

        res.status(201).send(insertedProgram)     
    }
    catch (err) {
         res.status(400).send({ error: "Please fill in the fields correctly." })
    }
})


// Update Exercise List (One or Many)
// AUTHORIZE
router.put('/exercise/:id', async (req, res) => {
    try {
        const { exercises } = req.body
        
        const updateExercise = { exercises }
        
        const newExercises = await ProgramModel.findByIdAndUpdate(req.params.id,{ $push: updateExercise}, { returnDocument: 'after' })
        
        if (exercises) {
            res.send(await newExercises.populate()) 
        } 
    }
    catch (err) {
        res.status(404).send({ error: 'Exercise could not be found' })
    }
})


// Replace Exercise List with new Exercises
// AUTHORIZE
router.put('/exercise/all/:id', async (req, res) => {
    const { exercises } = req.body
    const updateExercise = { exercises }

    try {
        // const token = req.headers.authorization
        // const decoded = jwt_decode(token)
        // const requesterId = decoded.comparedUser[0]._id
        // if (req.params.id !== requesterId) {
        //     return res.status(401).send("This ain't your profile buddy")
        // }
        const exercises = await ProgramModel.findByIdAndUpdate(req.params.id, updateExercise, { returnDocument: 'after' })

        if (exercises) {
            res.send(await exercises.populate()) 
        }
    }
    catch (err) {
        res.status(404).send({ error: 'Program could not be found' })
    }
})


// Update Metrics List (One or Many)
// AUTHORIZE
router.put('/metrics/:id', async (req, res) => {
    const newMetrics = req.body.metrics

    try {
        const program = await ProgramModel.findByIdAndUpdate(req.params.id, 
            {$push: { metrics: newMetrics}
        }, { new: true})

        if (program) {
            const updatedProgram = await program.save()
            res.send(await updatedProgram.populate()).status(200) 
        }
    }
    catch (err) {
        res.status(404).send({ error: 'Program could not be found' })
    }
})

export default router
