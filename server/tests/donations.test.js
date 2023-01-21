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
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Donation = require('../models/donationsModel')

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


const testUser1Email = 'test-user1@mail.com'
const testUser2Email = 'test-user2@mail.com'
let testUsers;

const seedUser = async () => {
  const testPassword1 = '123456abcde'
  const password1Hash = await bcrypt.hash(testPassword1, 10)

  const testPassword2 = '123456cbdaeeq'
  const password2Hash = await bcrypt.hash(testPassword2, 10)

  const testColleges = await College.find({}).exec()

testUsers = [{
  fullName: 'John Doe 1',
  email: testUser1Email,
  gradYear: 2021,
  newsletterSub: false,
  phoneNumber: '08033299111',
  password: password1Hash,
  collegeId: testColleges[0]._id
},
{
  fullName: 'John Doe 2',
  email: testUser2Email,
  gradYear: 2021,
  newsletterSub: false,
  phoneNumber: '08033299112',
  password: password2Hash,
  collegeId: testColleges[1]._id
}]

  await User.insertMany(testUsers)
}

let mongoServer = null

beforeEach(async () => {
    mongoServer = await MongoMemoryReplSet.create()
    
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(mongoServer.getUri(), { dbName: "alumni_donate" + Math.floor(Math.random() * 10) })

    //Seed colleges
    await seedColleges()

    //Seed a user
    await seedUser()
})

afterEach(async () => {
    if(mongoServer)await mongoServer.stop()
    await mongoose.disconnect()
})

describe('DonationsController', () => {
    it('URL = "/api/donations" should fetch all donations record', async () => {
        const testUsers = await User.find({}).exec()
        const testColleges = await College.find({}).exec()

        // Seed Donations
        await Donation.insertMany([
          {
            collegeId: testColleges[0]._id,
            amount: Math.floor(Math.random() * 1000000),
            userId: testUsers[0]._id,
            paymentReference: 834082348378
          },
          {
            collegeId: testColleges[1]._id,
            amount: Math.floor(Math.random() * 1000000),
            userId: testUsers[1]._id,
            paymentReference: 923123310120
          }
        ])

        return request(app)
                .get('/api/donations')
                .expect(200)
                .then(res => {
                    expect(res.body.data.message).toHaveLength(2)
                })
    })
})