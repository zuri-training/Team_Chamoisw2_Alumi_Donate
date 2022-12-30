const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require('./../utils/helpers')
const User = require('./../models/userModel')
const { Types: { ObjectId } } = require('mongoose')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const getUserData  = handleAsync(async (req, res) => {
    const tokenVerified = verifyJwtToken(req.headers.authorization)

    if(!tokenVerified){
      throw new createApiError("Invalid token", 400)
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
      throw new createApiError("Invalid token", 400)
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new createApiError(errors.array().map(errObj => (errObj.msg)).join('<br />'), 400)
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
        .populate({path: 'collegeId', select: ['_id','name']}).exec()

    res.status(200).json(handleResponse(userData))
})

module.exports = {
    getUserData,
    updateUserData
}