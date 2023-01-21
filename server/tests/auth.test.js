const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryReplSet } = require('mongodb-memory-server')
const College = require('../models/collegeModel')
const User = require('../models/userModel')
const ResetPassword = require('../models/resetPasswordModel')
const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')

const colleges = [
  {
    name:'University of Zuri',
    location:'Lagos, Nigeria',
    donationLink: '23du293u23e1213e19',
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

const userEmail = 'test-user@mail.com'
const testPassword = '123456abcde'

const seedUser = async () => {
  
  const testCollege = await College.findOne({}).exec()
  const passwordHash = await bcrypt.hash(testPassword, 10)

  await new User({
    fullName: 'John Doe',
    email: userEmail,
    gradYear: 2021,
    newsletterSub: false,
    phoneNumber: '08033299111',
    password: passwordHash,
    collegeId: testCollege._id
  }).save()
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

describe('AuthController', () => {
  it('Signup route controller should create a new user record and return some data', async () => {
    const userCollege = await College.findOne({}).exec()

    return request(app)
      .post('/api/auth/signup')
      .send({
        email: "test-user2@mail.com",
        password: testPassword,
        fullName: 'John Doe',
        phoneNumber: '+2349087009815',
        collegeId: userCollege._id,
        gradYear: 2020
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toEqual("success")
      })
  })

  it('Login route controller should generate a token and other user details', async () => {
    const userDoc = await User.findOne({ email: userEmail }).exec()

    const collegeDoc = await College.findOne({ _id: userDoc.collegeId }).exec()

    return request(app)
            .post('/api/auth/login')
            .send({
                email: userDoc.email,
                password: testPassword
            })
            .expect(200)
            .then(response => {
                expect(response.body.data.message).toEqual("User logged in successfully")
                expect(response.body.data.college).toEqual(collegeDoc.name)
                expect(response.body.data.fullName).toEqual(userDoc.fullName)
                expect(response.body.data.donationLink).toEqual(collegeDoc.donationLink)
                expect(response.body.data.email).toEqual(userDoc.email)
            })
  })

  it('Forgotpassword route controller should generate a unique token and return a response', async () => {

    return request(app)
            .post('/api/auth/forgotpassword')
            .expect('Content-Type', /json/)
            .send({ email: userEmail })
            .expect(200)
            .then(response => {  
              expect(response.body.data.message).toEqual("Password reset link has been sent to your email account")
            })    
  })

  it('Changepassword route controller should update the password of the user to the new password', async () => {
    // Seed the ResetPassword data for testing the change password controller
    const user = await User.findOne({}).exec()
    const token = crypto.randomBytes(10).toString("hex")

    await ResetPassword.create({ userId: user._id, token })
    

    const testUser = await User.findById(user._id ).exec()
    const resetPassDoc = await ResetPassword.findOne({ userId: testUser._id }, { token: 1 }).exec()

    return request(app)
        .post(`/api/auth/change-password/${resetPassDoc.token}`)
        .send({
            newpassword: 'mynewpassword',
            confirmpassword: 'mynewpassword'
        })
        .expect(200)
        .then(async response => {

            expect(response.body.message).toBe('password changed')

            // The doc containing the reset token should have been deleted
            ResetPassword.findById(resetPassDoc._id.toString()).then((doc) => {
                expect(doc).toEqual(null)
            })
            
        })

    
  })
})