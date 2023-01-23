import express from "express"


const users = []


// Declare express under 'app' and assign a port number
const app = express()
const port = 4001

// Parses incoming requests with JSON headers
app.use(express.json())

// app.get/.put/.post etc is middle ware that comes with express and needs to go before 'app.listen'
// First parameter is the path, and can take a callback function second, which takes two parameters 'request' and 'response' (req, res)
// We can send responses using 'response.send()'.... This can be HTML, objects etc..
app.get('/', (request, response) => response.send({info: `Physio App 2023`}))

// Create an entry
app.post('/signup/', async (req, res) => {
    try {
        // 1. Create a new entry object with values passed in from request (from POSTMAN)
        const { userName, name, password } = req.body

        // Validation/sanitize inputs here
        const newLogin = { userName, name, password }
    
        // 2. Then push new entry to entries array
    
        newLogin.push(users) //// OLD entry method
        
        // const insertedEntry = await EntryModel.create(newEntry)

        // 3. Send the new entry with 201 status

        res.status(201).send(users)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


// Tell express to listen for connections (default is localhost)
// Can add a callback function, in this case a console log showing the URL
app.listen(port, () => console.log(`App running at http://localhost:${port}`))

