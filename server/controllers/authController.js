const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const User = require('./../models/userModel')
const ResetPassword = require('../models/resetPasswordModel')
const { generateToken } = require("../utils/generateToken")
const { sendChangePasswordEmail } = require("../utils/email")
const jwt = require('jsonwebtoken')
const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require('./../utils/helpers')


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
          throw new createApiError(errors.array().map(errObj => ("&bull; " + errObj.msg)).join('<br /><br />'), 422)
      }

      let { email, password, fullName, phoneNumber, collegeId, gradYear } = req.body
  
      if (await userExist(email)) {
        throw new createApiError("Email already in use", 400)
      }
  
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          throw new createApiError("Account could not be created", 400)
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
          throw new createApiError("Please provide email and password", 400)
        }

        let userFound = await User.findOne({ email })

        if (!userFound) {
          throw new createApiError("A user for this email could not be found!", 400)
        }
        
        const passwordMatch = await bcrypt.compare(password,userFound.password)

        if (!passwordMatch) {
          throw new createApiError("Invalid credentials!", 400 )
        }

        userFound = await userFound.populate('collegeId')

        const { accessToken } = await generateToken(userFound)

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
    
        const link = `${process.env.BASE_URL}/changepassword/${token}`
    
        const emailSent = await sendChangePasswordEmail({ email, link })
       
        if(!emailSent) {
            await ResetPassword.findOneAndDelete({ userId: userFound._id, token }).exec()
            throw new Error('Operation failed. Please try again')
        }

        res
        .status(200)
        .json({ message: "Password reset link has been sent to your email account" })
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

    const verificationResponse = verifyJwtToken(authorization)

    res.status(200).json(handleResponse({message: verificationResponse}))
})

module.exports = {
    userSignup,
    userLogin,
    forgotPassword,
    changePassword,
    verifyJwt
}