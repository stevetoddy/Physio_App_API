import request from 'supertest'
import { UserModel } from '../db'
import app from '../index.js'
import users from '../routes/user_routes.js'
import jwt from 'jsonwebtoken'
import authenticateToken from '../controllers/auth_controller'

describe('Test the user routes', () => {
    let testUser, token

    beforeEach(async () => {
    testUser = await UserModel.create({email: "test@gmail.com", username: "testuser", password: "testpassword"})
    token = jwt.sign({ testUser }, 
        // Below, use an ENV reference
        "nfb32iur32ibfqfvi3vf932bg932g932", 
        { expiresIn: 360000 })
    })

    afterEach(async () => {
        await UserModel.deleteOne({username: "testuser"})
    })

    test('It should return all users', async () => {
        const response = await request(app)
                .get('/users')
                .set({ 'authorization': `Bearer ${token}`})
              expect(response.status).toBe(200)
              expect(response.body.length).toBe(5)
              expect(response.body[4].username).toBe("testuser")
          })

})

