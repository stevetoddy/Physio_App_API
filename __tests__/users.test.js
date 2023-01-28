import request from 'supertest'
import { ProgramModel, UserModel, dbClose } from '../db'
import { app, port } from '../index.js'
import jwt from 'jsonwebtoken'
import { expect, jest, test } from '@jest/globals'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


describe('Test the user routes', () => {
    let testUser, token

    beforeEach(async () => {
    testUser = await UserModel.create({email: "test@gmail.com", username: "testuser", password: "testpassword"})
    token = jwt.sign({ testUser }, 
        // Below, use an ENV reference
        process.env.JWT_SECRET, 
        { expiresIn: 360000 })
    })

    afterEach(async () => {
        await UserModel.deleteOne({username: "testuser"})
    })

    test('GET all users', async () => {
        const response = await request(app)
                .get('/users')
                .set({'authorization': `Bearer ${token}`})
              expect(response.status).toBe(200)
              expect(response.body.length).toBe(5)
              expect(response.body[4].username).toBe("testuser")
    })
    
    test('GET one user, with a given ID', async () => {
        const response = await request(app)
            .get(`/users/${testUser._id.valueOf()}`)
            .set({'authorization': `Bearer ${token}`})
            expect(response.status).toBe(200)
            expect(Object.keys(response.body).length).toBe(5)
    })
    
    test('PUT one user with a given ID', async () => {
        const updatedUser = { username: 'updatedUserName', email: 'updated@gmail.com', password: 'updatedPassword'}
        const response = await request(app)
            .put(`/users/${testUser._id.valueOf()}`)
            .set({'authorization': `Bearer ${token}`})
            .send(updatedUser)
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(updatedUser)
        const updatedUserFromDb = await UserModel.findById(testUser._id.valueOf())
        expect(updatedUserFromDb.username).toBe(updatedUser.username)
        expect(updatedUserFromDb.email).toBe(updatedUser.email)
        expect(updatedUserFromDb.password).toBe(updatedUser.password)

    })
    
    test('PUT one user, with an invalid email', async () => {
        const response = await request(app)
            .put(`/users/${testUser._id.valueOf()}`)
            .set({  'authorization': `Bearer ${token}`})
            .send({username: 'testuser', email: 'test', password: 'testpassword'})
        expect(response.status).toBe(400)
        expect(response.body.errors[0].msg).toBe('Please provide a valid email')
    })

    test('PUT one user, with an invalid password', async () => {
        const response = await request(app)
            .put(`/users/${testUser._id.valueOf()}`)
            .set({  'authorization': `Bearer ${token}`})
            .send({username: 'testuser', email: 'test@gmail.com', password: '12'})
        expect(response.status).toBe(400)
        expect(response.body.errors[0].msg).toBe('Please provide a password that is greater than 5 characters.')
    })

    test('PUT one user, with a non-existing ID', async () => {
        const fakeId = "aohcauohscsanlca"
        const response = await request(app)
            .put(`/users/${fakeId}`)
            .set({  'authorization': `Bearer ${token}`})
            .send({username: 'testuser', email: 'test@gmail.com', password: 'testpassword'})
        expect(response.status).toBe(500)
    })

    test('DELETE one user', async () => {
        const response = await request(app)
            .delete(`/users/${testUser._id.toString()}`)
            .set({'authorization': `Bearer ${token}`})
        expect(response.status).toBe(204)
    })

    test('DELETE one user, with a non-existing ID', async () => {
        const fakeId = "aohcauohscsanlca"
        const response = await request(app)
            .delete(`/users/${fakeId}`)
            .set({  'authorization': `Bearer ${token}`})
        expect(response.status).toBe(404)
    })

})
describe('Test the programs routes', () => {
    
    let testProgram, testUser 

    beforeEach(async () => {
        testUser = await UserModel.create({email: "test@gmail.com", username: "testuser", password: "testpassword"})
        testProgram = await ProgramModel.create({name: "NOT CHEST", 
        exercises: [
            {name: "Bench Press", image: "Link", info: "4 x 10 reps, 50kg"},
            {name: "Push-Ups", image: "Link", info: "5 x 15 reps"},
            {name: "Dumbbell Fly", image: "Link", info: "4 x 10 reps, 10kg each hand"}
        ], 
        metrics: [
            {date: "17/01/23", diff: 7.1, pain: 2.6, complete: 1},
            {date: "19/01/23", diff: 8.2, pain: 6.5, complete: 0.67}
        ], 
        userID: testUser._id.valueOf()}
        )
    })
    
    afterEach(async () => {
        await ProgramModel.deleteOne({ _id: testProgram._id })
        await UserModel.deleteOne({ _id: testUser._id })
    })

    test('GET all programs', async () => {
    const response = await request(app)
            .get('/programs')
          expect(response.status).toBe(200)
          expect(response.body.length).toBe(7)
    })

    test('GET all programs by a user', async () => {
        const response = await request(app)
            .get(`/programs/users/${testUser._id}`)
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
    })

    test('Create a Program', async () => {
        const response = await request(app)
            .post('/programs')
            .send({
                name: "NOT CHEST", 
                exercises: [
                    {name: "Bench Press", image: "Link", info: "4 x 10 reps, 50kg"},
                    {name: "Push-Ups", image: "Link", info: "5 x 15 reps"},
                    {name: "Dumbbell Fly", image: "Link", info: "4 x 10 reps, 10kg each hand"}
                ], 
                metrics: [
                    {date: "17/01/23", diff: 7.1, pain: 2.6, complete: 1},
                    {date: "19/01/23", diff: 8.2, pain: 6.5, complete: 0.67}
                ], 
                userID: testUser._id.valueOf()
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('name', 'NOT CHEST')
        expect(response.body).toHaveProperty('exercises')
        expect(response.body).toHaveProperty('metrics')
        expect(response.body).toHaveProperty('userID', testUser._id.valueOf())
    })

    // test('PUT /programs/exercise/:id', async () => {
    //     const newExercises = [
    //         {name: "Exercise 3", image: "Link", info: "4 x 12 reps, 45kg"},
    //         {name: "Exercise 4", image: "Link", info: "3 x 20 reps"}
    //     ]
    //     const response = await request(app)
    //         .put(`/programs/exercise/${testProgram._id}`)
    //         .send({ exercises: newExercises })

    //     expect(response.status).toBe(200)
    //     expect(response.body.exercises).toEqual(expect.arrayContaining(newExercises))
    // })

    test('PUT /programs/all/:id', async () => {
        const newExercises = [
            {name: "Exercise 3", image: "Link", info: "4 x 12 reps, 45kg"},
            {name: "Exercise 4", image: "Link", info: "3 x 20 reps"}
        ]
        const response = await request(app)
            .put(`/programs/exercise/all/${testProgram._id}`)
            .send({ exercises: newExercises })

        expect(response.status).toBe(200)
        expect(response.body.exercises).toMatchObject(newExercises)
        const updatedProgramFromDb = await ProgramModel.findById(testProgram._id.valueOf())
        expect(updatedProgramFromDb.exercises[0].name).toBe("Exercise 3")
        expect(updatedProgramFromDb.exercises[1].name).toBe("Exercise 4")
    })

    test('PUT Metrics', async () => {
        let newMetrics = {complete: 0.67, pain: 8.6, date: "24/07/2022", diff: 5.8}
        const response = await request(app)
            .put(`/programs/metrics/${testProgram._id}`)
            .send({ metrics: newMetrics })

        expect(response.body.metrics[2].diff).toBe(newMetrics.diff)
        expect(response.body.metrics[2].pain).toBe(newMetrics.pain)
        expect(response.body.metrics[2].date).toBe(newMetrics.date)
        expect(response.body.metrics[2].complete).toBe(newMetrics.complete)
        expect(response.body.metrics.length).toBe(3)
        expect(response.status).toBe(200)
    })
})

describe('SignUp Route', () => {
    test('POST Signup - valid input', async () => {
        const newUser = {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123'
        }
      
        const response = await request(app)
          .post('/auth/signup')
          .send(newUser)
      
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('username', newUser.username)
        expect(response.body).toHaveProperty('email', newUser.email)
        expect(response.body).toHaveProperty('password')
        expect(bcrypt.compareSync(newUser.password, response.body.password)).toBe(true)
      })
      
      test('POST Signup - invalid email', async () => {
        const newUser = {
          username: 'testuser',
          email: 'invalidemail',
          password: 'password123'
        }
      
        const response = await request(app)
          .post('/auth/signup')
          .send(newUser)
      
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0]).toHaveProperty('msg', 'Please provide a valid email')
      })
      
      test('POST Signup - short password', async () => {
        const newUser = {
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'short'
        }
      
        const response = await request(app)
          .post('/auth/signup')
          .send(newUser)
      
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0]).toHaveProperty('msg', 'Please provide a password that is greater than 5 characters.')
      })
      
      test('POST Signup - short username', async () => {
        const newUser = {
          username: 'te',
          email: 'testuser@example.com',
          password: 'password123'
        }
      
        const response = await request(app)
          .post('/auth/signup')
          .send(newUser)
      
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0]).toHaveProperty('msg', 'Please provide a username that is greater than 5 characters.')
      })

      test('POST Signup - Duplicate Username', async () => {
        const newUser = {
            username: 'Steve_1000',
            email: 'test@temail.com',
            password: 'password231'
        }

        const response = await request(app)
          .post('/auth/signup')
          .send(newUser)

          expect(response.status).toBe(400)
          expect(response.body).toHaveProperty('error', 'This username/email already exists. Please choose another.')
      })

      test("Failing to create a user due to error other than duplicate email/username", async () => {
        // Mock the UserModel.create() method to throw an error
        const newUser = {username: "testuser", email: "testuser@email.com", password: "test123"}
        const createSpy = jest.spyOn(UserModel, 'create')
        createSpy.mockImplementationOnce((newUser) => {
        throw new Error('Error creating new user')
        })

      
        // Send a POST request to the /signup route
        const response = await request(app)
          .post("/auth/signup")
          .send(newUser)
        
        
        // Assert that the response has a status of 500 and the correct error message
        expect(response.status).toBe(500)
        expect(response.body).toEqual({ error: "Error creating new user" })
        createSpy.mockRestore()
      })
})

describe("POST /login", () => {
    let testUser
      // mock the UserModel.find() method to return the login user
    beforeEach(async () => {
        testUser = await UserModel.create({email: "test@gmail.com", username: "testusers", password: "testpassword"})
    })
  
    afterEach(async () => {
        await UserModel.deleteOne({username: "testusers"})
    })
    // 
    test("Should return a JWT token if login details are valid", async () => {
      // Send a POST request to the /login route with valid login details
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "s@email.com", password: "password1" })
  
      // Assert that the response has a status of 200 and a JWT token
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("Signed In!")
      expect(response.body["Signed In!"]).toBeTruthy()
    })
    // 
    test("Should return a 422 error if email is not found", async () => {
      // Send a POST request to the /login route with an email that doesn't exist
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "nonexistent@email.com", password: "test123" })
  
      // Assert that the response has a status of 422 and the correct error message
      expect(response.status).toBe(422)
      expect(response.body).toEqual({ errors: "Invalid Details. Please check email and password are correct" })
    })
  
    test("Should return a 404 error if password is invalid", async () => {
      // Send a POST request to the /login route with an invalid password
      const response = await request(app)
        .post("/auth/login")
        .send({ email: "s@email.com", password: "invalidpassword" })
  
      // Assert that the response has a status of 404 and the correct error message
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: "Invalid Password: Bcrypt Error" })
    })
  
    test("Should return a 500 error if an error occurs", async () => {
        // mock the UserModel.find() method to throw an error
        const findSpy = jest.spyOn(UserModel, 'find')
        findSpy.mockImplementationOnce((loginUserEmail) => {
            throw new Error("Error finding user")
        })

        // Send a POST request to the /login route
        const response = await request(app)
            .post("/auth/login")
            .send({ email: "s@email.com", password: "password1"})
        
        expect(response.status).toBe(500)
    
    })
})

describe('dbClose Confirmed', () => {
  test('closes the database connection and logs a message', async () => {
    // Create a spy to check if the correct message is logged
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await dbClose();

    // Assert that the connection is closed
    expect(mongoose.connection.readyState).toBe(0)
    // Assert that the correct message is logged
    expect(spy).toHaveBeenCalledWith('Database disconnected')
    spy.mockRestore()
  })
})

describe('PORT', () => {
    test('should be set to process.env.PORT', () => {
        process.env.PORT = 4001
        const port = process.env.PORT || 4002
        expect(port).toBe(process.env.PORT)
    });

    test('should be set to 4002 if process.env.PORT is not set', () => {
        delete process.env.PORT
        const port = process.env.PORT || 4002
        expect(port).toBe(4002)
    })
})

