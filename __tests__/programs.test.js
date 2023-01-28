import request from 'supertest'
import { UserModel } from '../db'
import app from '../index.js'
import jwt from 'jsonwebtoken'
import { expect, jest, test } from '@jest/globals'

// describe('Test the programs routes', () => {
//   // GET ALL PROGRAMS (YES)

//   // GET SINGLE PROGRAM (YES)

//   // FIND ALL PROGRAMS UNDER USER ID (YES)

//   // POST A PROGRAM (YES)

//   // UPDATE EXERCISE LIST (YES)

//   // UPDATE EXERCISES IN A PROGRAM (YES)

//   // UPDATE METRICS (YES)
// })