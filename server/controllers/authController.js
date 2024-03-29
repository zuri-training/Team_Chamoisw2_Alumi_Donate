const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('./../models/userModel')
const ResetPassword = require('../models/resetPasswordModel')
const { generateToken } = require("../utils/generateToken")
const { sendChangePasswordEmail } = require("../utils/email")
const jwt = require('jsonwebtoken')
const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require('./../utils/helpers')
const Admin = require('../models/adminModel')


//function to check if user already exists
const userExist = async (_email) => {
    return await User.findOne({ email: _email }) ? true : false
}

const userSignup = handleAsync( async (req, res, next) => {
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

      //Form signup
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          throw createApiError(errors.array().map(errObj => ("&bull; " + errObj.msg)).join('<br /><br />'), 422)
      }

      let { email, password, fullName, phoneNumber, collegeId, gradYear } = req.body
  
      if (await userExist(email)) {
        throw createApiError("Email already in use", 400)
      }
  
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          throw createApiError("Account could not be created", 400)
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

        res.status(201).json(handleResponse({
          error: false,
          message: "New User has been created.",
          id: createdUser._id,
          email: createdUser.email,
          statusCode: 201
        }))
      })
})

const userLogin = handleAsync( async (req, res, next) => {
/**
 * #swagger.tags = ['Authentication']
 * #swagger.description = 'Login user'
 * #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        schema: {
          $email: 'test-user@mail.com',
          $password: '12345abc'
      }
    }
*/

        const { email, password } = req.body   

        if (!email || !password) {
          throw createApiError("Please provide email and password", 400)
        }

        let userFound = await User.findOne({ email }).exec()

        if (!userFound) {
          throw createApiError("A user for this email could not be found!", 400)
        }
        
        const passwordMatch = await bcrypt.compare(password,userFound.password)

        if (!passwordMatch) {
          throw createApiError("Invalid credentials!", 400 )
        }

        const accessToken = await generateToken(userFound)

        userFound = await userFound.populate('collegeId')
        
        res.status(200).json(handleResponse({
            message: "User logged in successfully",
            token: accessToken,
            fullName: userFound.fullName,
            college: userFound.collegeId.name,
            donationLink: userFound.collegeId.donationLink, 
            email: userFound.email,
            statusCode: 200,
            error: false
        }))
})

const forgotPassword = handleAsync(async (req, res) => {
    /**
        #swagger.tags = ['Authentication']
        #swagger.description = "Handles forgot password operation for changing a registered user's password"
        #swagger.parameters['body'] = {
            in: 'body',
            type: 'object',
            schema: {
                $email: 'test-user@mail.com'
            }
        }
     */
        const { email } = req.body
        const userFound = await User.findOne({ email })
        
        if (!userFound) {
        return res.status(400).json({ message: "User does not exist" })
        }
        const token = crypto.randomBytes(10).toString("hex")

        const resetPass = await ResetPassword.create({ userId: userFound._id, token })
    
        const link = `${process.env.BASE_URL}/change-password/${token}`
    
        const emailSent = await sendChangePasswordEmail({ email, link })
        
        if(!emailSent) {
            await ResetPassword.findOneAndDelete({ userId: userFound._id, token }).exec()
            throw createApiError('Operation failed. Please try again', 500)
        }

        res
        .status(200)
        .json(handleResponse({ message: "Password reset link has been sent to your email account" }))
})

const changePassword = handleAsync( async (req, res) => {
    /**
       #swagger.tags = ['Authentication']
       #swagger.description = 'Endpoint handles change of password'
       #swagger.parameters['token'] = {
          in: 'path',
          type: 'string',
          required: true,
          schema: {
            $token: 'c23349a7a135306ccece'
          }
       }
       #swagger.parameters['body'] = {
          in: 'body',
          type: 'object',
          required: true,
          schema: {
            $newpassword: 'mynewpass',
            $confirmpassword: 'mynewpass'
          }
       }
     */
      const { token }= req.params

      if (!token) {
        return res.status(400).json({ message: "token is required" })
      } 

        const { newpassword, confirmpassword } = req.body

        if (newpassword !== confirmpassword) {
          return res
            .status(400)
            .json({ message: "both passwords are not the same" })
        }
        
        // Get the userId associated with the token
        const user = await ResetPassword.findOne({ token },{ userId: true }).exec()

        if(!user) return res.status(400).json({error: true, message: 'Token for password reset has expired.'})

        // Hash the newpassword
        const hashedPass = await bcrypt.hash(newpassword, 10)

        // Update the password of the user
        await User.findByIdAndUpdate(user.userId, { password: hashedPass }).exec()
        
        // Remove the reset password document associated with the token
        await ResetPassword.findOneAndDelete({ token }).exec()

        res.status(200).json({ message: "password changed" })
})

const verifyJwt = handleAsync(async (req, res) => {
    const { authorization } = req.headers
    
    if(authorization === 'Bearer undefined') throw createApiError("User not authorized", 400)

    const verificationResponse = verifyJwtToken(authorization)

    res.status(200).json(handleResponse({message: verificationResponse}))
})

const adminLogin = handleAsync(async (req, res) => {
    const { email, password } = req.body   

    let adminFound = await Admin.findOne({ email }).exec()

    if (!adminFound) {
      throw createApiError("Incorrect login credentials", 400)
    }
    
    const passwordMatch = await bcrypt.compare(password, adminFound._doc.password)

    if (!passwordMatch) {
      throw createApiError("Incorrect login credentials", 400)
    }

    delete adminFound._doc.password

    const accessToken = await generateToken(adminFound._doc)

    if(!accessToken) throw createApiError("Some errors were encountered", 500)

    res.status(200).json(handleResponse({message: accessToken}))
})

const adminSignup = handleAsync(async (req, res) => {

  const admin = await Admin.findOne({}).exec()

  try{
    if(admin){
      const jwtPayload = verifyJwtToken(req.headers.authorization)

      if(!jwtPayload){
        throw createApiError("User not authorized", 400)
      }
    }

  }catch(err){
    throw createApiError(err.message, err.statusCode)
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      throw createApiError(errors.array().map(errObj => ("&bull; " + errObj.msg)).join('<br /><br />'), 422)
  }

  const { email, password, fullName, phoneNumber } = req.body

  // Check if email already exists for a registered admin
  const adminFound = await Admin.findOne({ email }).exec()

  if (adminFound) {
    throw createApiError("Email is not available", 400)
  }

  const accountCreated = await new Promise((resolve, reject) => {
    // Hash the password  
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        resolve(false)
      }

      try{
        await new Admin({
          email,
          password: hash,
          fullName,
          phoneNumber
        })
        .save()

        resolve(true)

      }catch(err){
        resolve(false)
      }

    })
  })

  if(!accountCreated) throw createApiError("Account could not be created", 400)
    
  res.status(200).json(handleResponse({message: "Account created successfully"}))

})

const adminExists = handleAsync(async (req, res) => {
  const adminFound = await Admin.find().exec()
  
  res.status(200).json(handleResponse({message: adminFound.length > 0 ? 'exists': 'none'}))
})

module.exports = {
    userSignup,
    userLogin,
    forgotPassword,
    changePassword,
    verifyJwt,
    adminLogin,
    adminSignup,
    adminExists
}