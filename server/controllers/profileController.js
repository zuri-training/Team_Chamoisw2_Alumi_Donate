const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require('./../utils/helpers')
const User = require('./../models/userModel')
const { Types: { ObjectId } } = require('mongoose')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { generateToken } = require('./../utils/generateToken')
const Admin = require('./../models/adminModel')

const getUserData  = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
      throw createApiError("Unauthorized access", 401)
    }
    
    // If token verified
    const userData = await User
        .findById(ObjectId(tokenVerified.userId),{ 
            _id: false,
            fullName: true,
            email: true,
            collegeId: true,
            phoneNumber: true,
            gradYear: true
        })
        .populate({path: 'collegeId', select: ['name']}).exec()
        
    return res.status(200).json(handleResponse({message: userData}))
})

const updateUserData = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
      throw createApiError("Unauthorized access", 401)
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
    
    res.status(200).json(handleResponse({message: {...(userData._doc), token: updatedToken}}))
})

const updateNewsletterSub = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
        throw createApiError("User not authorized", 401)
    }

    const subscribed = await User.findByIdAndUpdate(tokenVerified.userId, { $set : { newsletterSub: true } }, { new : true }).exec()

    if(subscribed){
        return res.status(200).json(handleResponse({ message: "You have successfully subscribed to our newsletter"}))
    }else{
        throw createApiError("Some errors were encountered, Newsletter subscription failed", 500)
    }
})

const getAdmins = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)
    
    if(!tokenVerified){
        throw createApiError("User not authorized", 401)
    }

    const admins = await Admin.find({}).exec()

    res.status(200).json(handleResponse({message: admins ? admins : [] }))
})

const deleteAdmin = handleAsync(async(req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)
    
    if(!tokenVerified){
        throw createApiError("User not authorized", 401)
    }

    const adminDeleted = await Admin.findByIdAndDelete(req.body.adminId).exec()

    if(!adminDeleted) throw createApiError("Some errors were encountered", 500)

    res.status(200).json(handleResponse({ message: "Admin successfully deleted" }))
})

const updateAdmin = handleAsync(async(req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
        throw createApiError("User not authorized", 401)
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw createApiError(errors.array().map(errObj => (errObj.msg)).join('<br />'), 400)
    }

    const { password } = req.body

    if(password === "" || password == 'undefined'){ 
        delete req.body.password
        delete req.body.confirmPassword
    }else{
        const newHashedPassword = bcrypt.hashSync(password, 10)
        req.body.password = newHashedPassword
    }

    try{
        const adminUpdated = await Admin.findByIdAndUpdate(req.body._id, req.body).exec()

        if(!adminUpdated) throw createApiError("Some errors were encountered", 500)
    
        res.status(200).json(handleResponse({message: "Admin successfully updated"}))
    }catch(err){
        throw createApiError("Some errors were encountered", 500)
    }
})

module.exports = {
    getUserData,
    updateUserData,
    updateNewsletterSub,
    getAdmins,
    deleteAdmin,
    updateAdmin
}