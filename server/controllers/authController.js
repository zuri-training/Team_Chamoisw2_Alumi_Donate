const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const User = require('./../models/userModel')

//function to check if user already exists
const userExist = async (_email) => {
    return await User.findOne({ email: _email }) ? true : false
};

const userSignup = async (req, res, next) => {
    /** 
     * #swagger.tags = ['Authentication']
     * #swagger.description = 'Register User' 
     * #swagger.parameters['body'] = {
	        in: 'body',
            type: 'object',
            required: true,
            schema: {
                $email: 'test-user@mail.com',
                $password: '12345abc',
                $fullName: 'John Doe',
                $phoneNumber: '+2349087009815',
                $collegeId: '63905e0909937edcf040433b',
                $gradYear: 2020
            }
        }
     * */
    try {
      let { email, password, fullName, phoneNumber, collegeId, gradYear } = req.body
  
      //Form signup
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const error = new Error("validation failed")
        error.statusCode = 422
        error.data = errors.array()
        return res
          .status(error.statusCode)
          .json({ message: "user validation failed", error: error })
      }
  
      if (await userExist(email)) {
        return res.status(400).json({ message: "email already in use" })
      }
  
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(400).json({ message: "account could not be created" })
        }

        const newUser = new User({
          email,
          fullName, 
          phoneNumber, 
          collegeId, 
          gradYear,
          password: hash,
        })

        const createdUser = await newUser.save()

        res.status(201).json({
          message: "New User has been created.",
          id: createdUser._id,
          email: createdUser.email,
        })
      })
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500
      }
      return res.status(error.statusCode).json({ message: "Signup failed", error: error })
    }
  }

  module.exports = {
    userSignup
  }