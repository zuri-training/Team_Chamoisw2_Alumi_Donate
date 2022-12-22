const { validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')
const User = require('./../models/userModel')
const UserToken = require("../models/userTokenModel")
const ResetPassword = require('../models/resetPasswordModel')
const { generateToken } = require("../utils/generateToken")
const { sendChangePasswordEmail } = require("../utils/email")
const { verifyRefreshToken } = require("../middlewares/verifyRefreshToken")
const jwt = require('jsonwebtoken')
const { handleAsync } = require('./../utils/helpers')


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
          error: false,
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
            return res.status(400).json("Please provide email and password")
        }

        let userFound = await User.findOne({ email })

        if (!userFound) {
            return res.status(400).json({message: "A user for this email could not be found!"})
        }
        
        const passwordMatch = await bcrypt.compare(password,userFound.password)

        if (!passwordMatch) {
            return res.status(400).json({message: "Wrong password!"})
        }

        userFound = await userFound.populate('collegeId')

        const { accessToken } = await generateToken(userFound)

        return res.status(200).json({
            message: "user logged in successfully",
            token: accessToken,
            fullName: userFound.fullName,
            college: userFound.collegeId.name
        })
})

const userLogout = async (req, res) => {
    /**
       #swagger.tags = ['Authentication']
       #swagger.description = 'Sign out the authenticated user'
       #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        schema: {
            $refreshToken: 'S70FIpFv3oe7rDpNSul3UjYZNAYTgU6uMmwarYeIMaLeI5BXGw'
        }
       }
     */
    try {
        const userRefreshToken = await UserToken.findOne({ token: req.body.refreshToken })
        if (!userRefreshToken)
        return res
            .status(200)
            .json({ error: false, message: "Logged Out Sucessfully" })

        await userRefreshToken.remove()
        res.status(200).json({ error: false, message: "Logged Out Sucessfully" })
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error" })
    }
}

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
    try{
        const { email } = req.body
        const userFound = await User.findOne({ email })
    
        if (!userFound) {
        return res.status(400).json({ message: "User does not exist" })
        }
        const token = crypto.randomBytes(10).toString("hex")

        const resetPass = await ResetPassword.findOneAndUpdate({ userId: userFound._id},{ userId: userFound._id, token },{upsert: true}).exec()
    
        const link = `${process.env.BASE_URL}/changepassword/${token}`
    
        const emailSent = await sendChangePasswordEmail({ email, link })
        
        if(!emailSent) {
            await ResetPassword.findOneAndDelete({ userId: userFound._id, token }).exec()
            throw new Error('Operation failed. Please try again')
        }

        res
        .status(200)
        .json({ message: "Password reset link has been sent to your email account" })
    }catch(err){
        console.log(err)
        return res.status(500).json({error: true, message: err.message})
    }

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
    try {
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
      
    } catch (error) {
      return res.status(400).json({ message: "invalid Token" })
    }
})

const refreshToken = handleAsync(async (req, res) => {
    /**
       #swagger.tags = ['Authentication']
       #swagger.parameters['body'] = {
          in: 'body',
          type: 'object',
          required: true,
          schema: {
            $refreshToken: 'MddEQ7teWmpfC561Vw/wetyNeJY4ErDKEAgZfbUxSG2oUfN8LjruiG'
          }
       }
     */
    verifyRefreshToken(req.body.refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { userId: tokenDetails.userId }
        const accessToken = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
        res.status(200).json({
          error: false,
          accessToken,
          message: "Access token created successfully",
        });
      })
      .catch((err) => res.status(400).json(err));
})

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    forgotPassword,
    changePassword,
    refreshToken
}