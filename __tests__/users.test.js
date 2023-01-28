import request from 'supertest'
import { UserModel } from '../db'
import app from '../index.js'
import jwt from 'jsonwebtoken'
import { expect, jest, test } from '@jest/globals'


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
    
    test('PUT one user, with an invalid request', async () => {
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
            .put(`/users/${fakeId}`)
            .set({  'authorization': `Bearer ${token}`})
            .send({username: 'testuser', email: 'test@gmail.com', password: 'testpassword'})
        expect(response.status).toBe(500)
    })

    test('DELETE, ', async () => {
        jest.spyOn(UserModel, 'findByIdAndDelete').mockImplementationOnce(() => {
            throw new Error('Server Error')
        })

        const res = await request(app)
            .delete(`/users/${testUser._id.toString()}`)
            .set({  'authorization': `Bearer ${token}`})

        expect(res.status).toBe(500)
        expect(res.body).toEqual({ error: 'Server Error' })
    })
})


