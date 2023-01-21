require('dotenv').config();
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryReplSet } = require('mongodb-memory-server')
const College = require('../models/collegeModel')
const mockAxios = require('jest-mock-axios')
let { verifyJwtToken } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const colleges = [
    {
      name:'University of Zuri',
      location:'Lagos, Nigeria',
      donationLink: '23du293u23e1213e19',
      contact:{
        email: 'university.zuri@gmail.com',
      },
      accountDetails: {
        name: 'University of Zuri',
        number: '3391093829',
        bank: '058' // The bank value here is the unique bank code of the bank associated with the account.
      }
    },
    {
      name:'University of HNG',
      location:'Lagos, Nigeria',
      donationLink: 'a39e73d3h2dy82323e',
      contact:{
        email: 'university.hng@gmail.com',
      },
      accountDetails: {
        name: 'University of HNG',
        number: '0221329329',
        bank: '020'
      }
    },
    {
      name:'University of Interns',
      location:'Lagos, Nigeria',
      donationLink: '0931uehu429d83dt34',
      contact:{
        email: 'university.interns@gmail.com',
      },
      accountDetails: {
        name: 'University of Interns',
        number: '5834239120',
        bank: '010' 
      }
    }
  ]
  
const seedColleges = async () => {
    await College.insertMany(colleges)
}

let mongoServer = null

beforeEach(async () => {
    mongoServer = await MongoMemoryReplSet.create()
    
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(mongoServer.getUri(), { dbName: "alumni_donate" + Math.floor(Math.random() * 10) })

    //Seed colleges
    await seedColleges()

    //Seed a user
    //await seedUser()
})

afterEach(async () => {
    if(mongoServer)await mongoServer.stop()
    await mongoose.disconnect()
})

describe('CollegeController', () => {
    it('URL = "/api/colleges/all" should get all colleges', async () => {
        return request(app)
                .get('/api/colleges/all')
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toHaveLength(3)
                })
    })

    it('URL = "/api/colleges/single/:donationLink" should get all colleges', async () => {
        const testCollege = colleges[1]

        return request(app)
                .get(`/api/colleges/single/${ testCollege.donationLink }`)
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toHaveLength(1)
                    expect(res.body.data.message[0].name).toBe(testCollege.name)
                    expect(res.body.data.message[0].location).toBe(testCollege.location)
                })
    })

    it('URL = "/api/colleges/all/complete" should get all colleges with full details', async () => {
        return request(app)
                .get('/api/colleges/all/complete')
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toHaveLength(3)
                })
    })

    it('URL = "/api/colleges/register" should register a new college', async () => {
        return request(app)
               .post('/api/colleges/register')
               .send({
                    name: 'University of Zuri',
                    location: 'Lagos, Nigeria',
                    donationLink: '23du293u23e12123',
                    email: 'university2@zuri.edu',
                    phoneNumbers: '08033299111\n',
                    accountName: 'University of Zuri',
                    accountNumber: '3391093829',
                    bankCode: '058' // The bank value here is the unique bank code of the bank associated with the account.
                })
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toBe("College(Institution) has been successfully registered")
                })
    })

    it('URL = "/api/colleges/delete" should delete a college', async () => {
        const testCollege = await College.findOne({}).exec()

        return request(app)
              .delete('/api/colleges/delete')
              .send({
                collegeId: testCollege._id
              })
              .expect(200)
              .then(res => {
                expect(res.body.data.message).toBe("College deleted successfully")
              })
    })

    it('URL = "/api/colleges/update" should update a college', async () => {
        const testCollege = await College.findOne({}).exec()
        const testBankCode = '082'

        return request(app)
                .patch('/api/colleges/update')
                .send({
                    _id: testCollege._id,
                    bankId: testBankCode
                })
                .expect(200)
                .then(async res => {
                    expect(res.body.data.message).toBe("College(Institution) details has been updated successfully")
                    
                    //Query for the updated college, using testCollege._id
                    const updatedCollege = await College.findById(testCollege._id).exec()
                    
                    expect(updatedCollege.accountDetails.bank).toBe(testBankCode)
                })
    })

    it('URL = "/api/colleges/account/verify" should verify a college account', async () => {
        const jwtToken = jwt.sign({ collegeId: colleges[0].name }, process.env.JWT_SECRET)
        
        const testCollege = colleges[1]
        
        const verificationResponse = {
            data: {
                status: true,
                data: {
                    account_number: testCollege.accountDetails.number,
                    account_name: testCollege.accountDetails.name
                }
            }
        }

        jest.spyOn(axios, 'get').mockResolvedValueOnce(Promise.resolve(verificationResponse))
                 
        return request(app)
        .post('/api/colleges/account/verify')
        .set('Authorization', `Bearer ${ jwtToken }`)
        .send({
            accountName: testCollege.accountDetails.name,
            accountNumber: testCollege.accountDetails.number,
            bankCode: '033',
        })
        .expect(200)
        .then(res => {
            expect(res.body.data.message).toBe(true)
        })
    })
})