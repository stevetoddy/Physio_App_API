import express from "express"
import { UserModel } from "./db.js"


const users = [
    { username: "Steve_1000", name: "Steve", email: "s@email.com", password: "password" },
    { username: "Oli_2000", name: "Oli", email: "o@email.com", password: "password2" },
    { username: "Kane_3000", name: "Kane", email: "k@email.com", password: "password3" }
]





// Declare express under 'app' and assign a port number
const app = express()
const port = 4001

// Parses incoming requests with JSON headers
app.use(express.json())

// app.get/.put/.post etc is middle ware that comes with express and needs to go before 'app.listen'
// First parameter is the path, and can take a callback function second, which takes two parameters 'request' and 'response' (req, res)
// We can send responses using 'response.send()'.... This can be HTML, objects etc..
app.get('/', (req, res) => res.send({info: `Physio App 2023`}))


app.get('/users', (req, res) => res.send(users))

// Create an entry
app.post('/signup/', async (req, res) => {
    try {
        const { username, name, email, password } = req.body

        const newUser = { username, name, email, password }

        const insertedUser = await UserModel.create(newUser)

        res.status(201).send(insertedUser)     
    }
    catch (err) {
         res.status(500).send({ error: err.message })
    }
})


// Tell express to listen for connections (default is localhost)
// Can add a callback function, in this case a console log showing the URL
app.listen(port, () => console.log(`App running at http://localhost:${port}`))

