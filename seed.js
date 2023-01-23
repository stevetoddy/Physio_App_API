import { UserModel, dbClose } from './db.js'

await UserModel.deleteMany()

const users = [
    { username: "Steve_1000", name: "Steve", email: "s@email.com", password: "password" },
    { username: "Oli_2000", name: "Oli", email: "o@email.com", password: "password2" },
    { username: "Kane_3000", name: "Kane", email: "k@email.com", password: "password3" }
]

const cats = await UserModel.insertMany(users)
console.log('Inserted Categories')

dbClose()