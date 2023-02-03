import express from 'express'
import userRoutes from './routes/user_routes.js'
import programRoutes from './routes/program_routes.js'
import authRoutes from './routes/auth.js' 
import cors from 'cors'




// Declare express under 'app' and assign a port number
const app = express()
const port = 4002

app.use(cors())

app.use(cors())


// Parses incoming requests with JSON headers
app.use(express.json())


// Route Ends
app.use('/users', userRoutes)
app.use('/programs', programRoutes)
app.use('/auth', authRoutes)


// app.get/.put/.post etc is middle ware that comes with express and needs to go before 'app.listen'
// First parameter is the path, and can take a callback function second, which takes two parameters 'request' and 'response' (req, res)
// We can send responses using 'response.send()'.... This can be HTML, objects etc..
app.get('/', (req, res) => res.status(200).send({info: `Physio App 2023`}))


// Tell express to listen for connections (default is localhost)
// Can add a callback function, in this case a console log showing the URL
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))

export { app, port }

