const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require('./../utils/helpers')
const User = require('./../models/userModel')
const { Types: { ObjectId } } = require('mongoose')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { generateToken } = require('./../utils/generateToken')

const getUserData  = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
      throw createApiError("Invalid token", 400)
    }
    
    // If token verified
    const userData = await User
        .findById(ObjectId(tokenVerified.userId), 
        { 
            _id: false,
            fullName: true,
            email: true,
            collegeId: true,
            phoneNumber: true,
            gradYear: true
        })
        .populate({path: 'collegeId', select: ['name']}).exec()
        
    return res.status(200).json(handleResponse(userData))
})

const updateUserData = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
      throw createApiError("Invalid token", 400)
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw createApiError(errors.array().map(errObj => (errObj.msg)).join('<br />'), 400)
    }

    const { password } = req.body
   
    if(password === "" || password == 'undefined'){ 
        delete req.body.password 
    }else{
        const newHashedPassword = bcrypt.hashSync(password, 10)
        req.body.password = newHashedPassword
    }

    await User.findByIdAndUpdate(tokenVerified.userId, req.body).exec()
    
    const userData = await User
        .findById(ObjectId(tokenVerified.userId), 
        { 
            _id: false,
            fullName: true,
            email: true,
            collegeId: true,
            phoneNumber: true,
            gradYear: true
        })
        .populate({path: 'collegeId', select: ['_id','name', 'donationLink']})

    const oldCollegeId = tokenVerified.collegeId
    let updatedToken = ''

    // if the college institution was updated, generate new token for user
    if(oldCollegeId !== req.body.collegeId){
        updatedToken = (await generateToken({_id: tokenVerified.userId, collegeId: req.body.collegeId})).accessToken
    }
    
    res.status(200).json(handleResponse({...(userData._doc), updatedToken}))
})

const updateNewsletterSub = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
        throw createApiError("User not authorized", 400)
    }

    const subscribed = await User.findByIdAndUpdate(tokenVerified.userId, { $set : { newsletterSub: true } }, { new : true }).exec()

    if(subscribed){
        return res.status(200).json(handleResponse({ message: "You have successfully subscribed to our newsletter"}))
    }else{
        throw createApiError("Some errors were encountered, Newsletter subscription failed", 500)
    }
})

module.exports = {
    getUserData,
    updateUserData,
    updateNewsletterSub
}