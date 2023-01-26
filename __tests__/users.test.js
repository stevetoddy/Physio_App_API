import request from 'supertest'
import { UserModel } from '../db'
import app from '../index.js'
import router from '../routes/user_routes.js'
import jwt from 'jsonwebtoken'


describe('Test the user routes', () => {
  beforeEach(async () => {
      await UserModel.create({email: "test@gmail.com", username: "testuser", password: "testpassword"})
  })
  afterEach(async () => {
      await UserModel.deleteMany()
  })

  test('It should return all users', async () => {
      // jest.mock(jwt, () => {
      //   return {
      //     sign: jest.fn()
      //   }
      // })
      // jest.mock('../controllers/auth_controller.js', () => jest.fn((req, res, next) => next()))
      app.use('/users', router)
      const response = await request(app).get('/users')
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0].username).toBe("testuser")
  })
})




