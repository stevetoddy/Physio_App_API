import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected')
}

// Mongoose connection
try{  
    const m = await mongoose.connect(process.env.PHYSIO_APP_DB_URL)
    console.log(m.connection.readyState === 1 ? 'Mongoose Connected' : 'Mongoose failed to connect')
} catch (err) {
    console.log(err)
} 

// DATABASE SETUP

  // 2 x Collections (User, Program)

      // Users
        // username, password, email
        
      // Programs
        // name, exercises [(name, image, info)], entries [(date, diff, pain, complete)], *ref userID*


// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Create a Mongoose model based on the schema
// Takes two parameters, first is a string which names the model, the second is the schema to use

// User Model
const UserModel = mongoose.model('User', userSchema)

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    image: { type: String } , 
    info: { type: String }
})

// Metrics Schema
const metricSchema = new mongoose.Schema({
    complete: { type: Number, required: true }, 
    pain: { type: Number, required: true } , 
    diff: { type: Number, required: true },
    date: { type: String }
})

// Program Schema
const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [exerciseSchema],
    metrics: [metricSchema],
    userID: { type: String, required: true,}
})

// Program Model
const ProgramModel = mongoose.model('Program', programSchema)




export { UserModel, ProgramModel, dbClose}


