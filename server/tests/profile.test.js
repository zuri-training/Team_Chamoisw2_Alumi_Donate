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
const Admin = require('../models/adminModel')

const college = {
    name:'University of Zuri',
    location:'Lagos, Nigeria',
    donationLink: '23du293u23e1213e19',
    contact:{
      email: 'efpyi@example.com',
      phoneNumber: '09087654321'
    },
    accountDetails: {
      name: 'University of Zuri',
      number: '3391093829',
      bank: '058' // The bank value here is the unique bank code of the bank associated with the account.
    }
}

const seedCollege = async () => {
  await new College(college).save()
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
// End of seedUser()

// start of seedAdmins()
const testAdmins = [
  {
    fullName: 'John Doe',
    email: 'johndoe@mail.com',
    password: bcrypt.hashSync('1ehi9213', 10),
    phoneNumber: '08033299111'
  },
  {
    fullName: 'Alex giggs',
    email: 'alexgiggs@mail.com',
    password: bcrypt.hashSync('0092jq31', 10),
    phoneNumber: '08033299120'
  }
]

const seedAdmins = async () => {
  await Admin.insertMany(testAdmins)
}
// End of seedAdmins()

let mongoServer = null

beforeEach(async () => {
    mongoServer = await MongoMemoryReplSet.create()
    
    mongoose.set('strictQuery', true);
    
    await mongoose.connect(mongoServer.getUri(), { dbName: "alumni_donate" + Math.floor(Math.random() * 10) })

    await seedCollege()

    await seedUser()
})

afterEach(async () => {
    if(mongoServer)await mongoServer.stop()
    await mongoose.disconnect()
})

describe('ProfilesController', () => {
    it('URL = "/api/profile/" should fetch partial infos of all registered users', async () => {
        const testUser = await User.findOne({}).exec()  

        const token = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET)

        return request(app)
                .get(`/api/profile/`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .then(res => {
                  const { fullName, email, gradYear, phoneNumber, collegeId } = res.body.data.message
                  
                  expect(fullName).toEqual(testUser.fullName)
                  expect(email).toEqual(testUser.email)
                  expect(gradYear).toEqual(testUser.gradYear)
                  expect(phoneNumber).toEqual(testUser.phoneNumber)
                  expect(String(collegeId._id)).toEqual(testUser.collegeId.toString())    
                })
    })

    it('URL = "/api/profile/update" should update a user\'s profile record', async () => {
      const testUser = await User.findOne({}).exec()

      const token = jwt.sign({ userId: testUser._id, collegeId: testUser.collegeId }, process.env.JWT_SECRET)

      // This object is referencing existing values as well as the new values for update 
      const updateDetails = {
        phoneNumber: testUser.phoneNumber,
        collegeId: testUser.collegeId,
        gradYear: testUser.gradYear,
        fullName: 'John Doe Updated',
        email: 'upchh@example.com',
      }

      return request(app)
             .patch(`/api/profile/update`)
             .set('Authorization', `Bearer ${token}`)
             .send(updateDetails)
             .expect(200)
             .then(res => {
                expect(res.body.data.message.fullName).toEqual(updateDetails.fullName)
                expect(res.body.data.message.email).toEqual(updateDetails.email)
             })
    })

    it('URL = "/api/profile/newsletter/subscription" should alter the state of a user\'s newsletter subscription', async() => {
      const testUser = await User.findOne({}).exec()

      const token = jwt.sign({ userId: testUser._id, collegeId: testUser.collegeId }, process.env.JWT_SECRET)

      return request(app)
              .patch('/api/profile/newsletter/subscription')
              .set('Authorization', `Bearer ${token}`)
              .expect(200)
              .then(res => {
                expect(res.body.data.message).toEqual('Newsletter subscription successful')
              })
    })

    it('URL = "/api/profile/admins/all" should fetch an array of all admins records', async() => {
        await seedAdmins()

        const testAdmin = await Admin.findOne({}).exec()

        const token = jwt.sign({ userId: testAdmin._id }, process.env.JWT_SECRET)

        return request(app)
                .get('/api/profile/admins/all')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .then(res => {
                  expect(res.body.data.message).toHaveLength(testAdmins.length)
                })
    })

    it('URL = "/admin/delete" should delete an admin record', async() => {
      await seedAdmins()

      // A random admin record is selected to be deleted
      const testAdmin = await Admin.findOne({}).exec()

      const token = jwt.sign({ userId: testAdmin._id }, process.env.JWT_SECRET)

      return request(app)
             .delete('/api/profile/admin/delete')
             .set('Authorization', `Bearer ${token}`)
             .send({adminId: testAdmin._id})
             .expect(200)
             .expect(async res => {
               expect(res.body.data.message).toEqual('Admin record successfully deleted')
             
               const totalAdminsLeft = await Admin.find().exec()

               expect(totalAdminsLeft.length).toEqual(testAdmins.length - 1)
              })
    })

    it('URL = "/admin/update" should update an admin record', async() => {
      await seedAdmins()

      // A random admin record is selected to be updated
      const testAdmin = await Admin.findOne({}).exec()

      const token = jwt.sign({ userId: testAdmin._id }, process.env.JWT_SECRET)

      const updateDetails = {
        _id: testAdmin._id,
        fullName: 'Admin 1',
        email: 'admin1@example.com',
        phoneNumber: '09031772318'
      }

      return request(app)
              .patch('/api/profile/admin/update')
              .set('Authorization', `Bearer ${token}`)
              .send(updateDetails)
              .expect(200)
              .expect(async res => {
                expect(res.body.data.message).toEqual("Admin successfully updated")

                const updatedAdmin = await Admin.findById(testAdmin._id).exec()

                expect(updatedAdmin.fullName).toEqual(updateDetails.fullName)
                expect(updatedAdmin.email).toEqual(updateDetails.email)
              })
    })
})