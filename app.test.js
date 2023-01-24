import app from './app.js'
import request from 'supertest'

describe("Seed Tests", () => {
  test('Users', async () => {
    const res = await request(app).get('/users')
    expect(res.status).toBe(200)
    expect(res.body[0].username).toBe("Steve_1000")
    expect(res.headers['content-type']).toMatch(/json/i)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(4)
  })})

///////   TESTING UPDATE USER, CANNOT GET DYNAMIC PARAMS WORKING WITH TEST JUST YET

// describe("User Routes", () => {
//         let id;
//         beforeAll(async () => {
//             app.post('/signup/', async (req, res) => {
        
//                 const newUser = { username: "Jane", email: "test@email.com", password: "password1" }
        
//                 const insertedUser = await UserModel.create(newUser)
        
//                 res.send(insertedUser)     
//             }),
//             id = newUser.body.id;
//         });

//         test('It should update the user details', async () => {
//             const response = await request(app)
//               .put(`/users/${id}`)
//               .send({ username: 'John Doe' });
//             expect(response.statusCode).toBe(200);
//             expect(response.body).toEqual({ id, username: 'John Doe' });
//           });
//         });


    // test("Update User", async () => {
    //     const res = await request(app).put(`/users/${id}`)
    //     expect(res.status).toBe(200) 
    // })
// })

//   describe('Get categories list', () => {
//     let res

//     beforeEach(async () => {
//       res = await request(app).get('/categories')
//       expect(res.status).toBe(200)
//       expect(res.headers['content-type']).toMatch(/json/i)
//     })

//     it('Should return an array of 4 elements', () => {
//       expect(res.body).toBeInstanceOf(Array)
//       expect(res.body.length).toBe(4)
//     })

//     it('Has an element with the correct data structure and data', () => {
//       res.body.forEach(el => {
//         expect(el._id).toBeDefined()
//         expect(el.name).toBeDefined()
//         expect(el._id.length).toBe(24)
//       })
//       expect(res.body[0].name).toBe('Coding')
//     })
//   })

//   test('Create a new entry', async () => {
//     const res = await request(app).post('/entries').send({
//       category: 'Work',
//       content: 'Jest testing'
//     })

//     expect(res.status).toBe(201)
//     expect(res.headers['content-type']).toMatch(/json/i)
//     expect(res.body._id).toBeDefined()
//     expect(res.body.content).toBeDefined()
//     expect(res.body.category.name).toBeDefined()
//     expect(res.body.category.name).toBe('Work')
//     expect(res.body.content).toBe('Jest testing')
//   })
// })