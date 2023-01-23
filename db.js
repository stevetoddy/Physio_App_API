import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

// Mongoose connection
try{  
    const m = await mongoose.connect('mongodb+srv://fpb:pHmFk9DVbNQA05hJ@physioapi.0l6mgks.mongodb.net/physio?retryWrites=true&w=majority')
    console.log(m.connection.readyState === 1 ? 'Mongoose Connected' : 'Mongoose failed to connect')
} catch (err) {
    console.log(err)
} 


async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected')
}

// Mongoose Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

// Create a Mongoose model based on the schema
// Takes two parameters, first is a string which names the model, the second is the schema to use
const UserModel = mongoose.model('User', userSchema)

export { UserModel, dbClose }