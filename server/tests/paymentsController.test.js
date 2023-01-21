require('dotenv').config();
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryReplSet } = require('mongodb-memory-server')
const College = require('../models/collegeModel')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Donation = require('../models/donationsModel')


let mongoServer = null

beforeEach(async () => {
    mongoServer = await MongoMemoryReplSet.create()
    
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(mongoServer.getUri(), { dbName: "alumni_donate" + Math.floor(Math.random() * 10) })
})

afterEach(async () => {
    if(mongoServer)await mongoServer.stop()
    await mongoose.disconnect()
})

describe('DonationsController', () => {
    it('URL = "/api/transaction/verify/reference" should fetch all donations record', async () => {
        const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET)

        const verificationResponse = {
          data: {
            status: true,
            message: "Verification successful",
            data: {
              status: "success",
              amount: 20000
            }
          }
        }

        jest.spyOn(axios, 'get').mockResolvedValueOnce(Promise.resolve(verificationResponse))

        return request(app)
                .post(`/api/transaction/verify/23662839139`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toEqual(verificationResponse.data.message)
                    
                    expect(res.body.data.status).toEqual(verificationResponse.data.status)
                  })
    })
})