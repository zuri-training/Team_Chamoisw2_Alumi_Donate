const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const College = require('../models/collegeModel')
const User = require('../models/userModel')
const ResetPassword = require('../models/resetPasswordModel')
const jestMock = require('jest-mock')
let { forgotPassword } = require('../controllers/authController')

let mongoServer = null

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: "alumni_donate" })

    //Seed colleges
    await request(app).get('/api/colleges/populate')
})

afterAll(async () => {
    if(mongoServer)await mongoServer.stop()
})

const userEmail = 'test-user@mail.com'

describe('AuthController', () => {
  it('Signup route controller should create a new user record and return some data', async () => {
    const userCollege = await College.findOne({}).exec()

    return request(app)
      .post('/api/auth/signup')
      .send({
        email: userEmail,
        password: '12345abc',
        fullName: 'John Doe',
        phoneNumber: '+2349087009815',
        collegeId: userCollege._id,
        gradYear: 2020
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toEqual("New User has been created.")
        expect(response.body.email).toEqual(userEmail)
      })
  })

  it('Login route controller should generate a token and other user details', async () => {
    const userDoc = await User.findOne({ email: userEmail }).exec()
    const collegeDoc = await College.findOne({ _id: userDoc.collegeId }).exec()

    return request(app)
            .post('/api/auth/login')
            .send({
                email: userDoc.email,
                password: '12345abc'
            })
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual("user logged in successfully")
                expect(response.body.college).toEqual(collegeDoc.name)
                expect(response.body.fullName).toEqual(userDoc.fullName)
                expect(response.body.donationLink).toEqual(collegeDoc.donationLink)
                expect(response.body.email).toEqual(userDoc.email)
            })
  })

  it('Forgotpassword route controller should generate a unique token and return a response', async () => {
    forgotPassword = jestMock.fn(true)

    return request(app)
            .post('/api/auth/forgotpassword')
            .expect('Content-Type', /json/)
            .send({ email: userEmail })
            .expect(200)
            .then(response => {
                expect(response.body.message).toEqual("Password reset link has been sent to your email account")
            })    
  })

  it('Changepassword route controller should update the password of the user to the new password', async () => {
    const testUser = await User.findOne({email: userEmail}).exec()
    const resetPassDoc = await ResetPassword.findOne({ userId: testUser._id }, { token: 1 }).exec()
    
    return request(app)
        .post(`/api/auth/changepassword/${resetPassDoc.token}`)
        .send({
            newpassword: 'mynewpassword',
            confirmpassword: 'mynewpassword'
        })
        .expect(200)
        .then(response => {
            expect(response.body.message).toEqual("password changed")
            // The doc containing the reset token should have been deleted
            ResetPassword.findById(resetPassDoc._id).exec().then((err, doc) => {
                expect(doc).toEqual(null)
            })
            
        })

    
  })
})