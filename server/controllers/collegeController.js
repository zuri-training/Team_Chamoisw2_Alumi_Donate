const pureUUID = require('pure-uuid')
const College = require('./../models/collegeModel')
const { handleAsync, createApiError, handleResponse, verifyJwtToken } = require('./../utils/helpers')
const { validationResult } = require('express-validator')
const Bank = require('./../models/bankModel')
const axios = require('axios')

const getAllColleges = handleAsync(async (req,res) => {
    const colleges = await College.find({}, {_id: 1, name: 1,location: 1 }).exec()

    if(!colleges) throw createApiError("No college has been registered", 500)

    res.status(200).json(handleResponse({ message: colleges}))
})

const getCollege = handleAsync(async (req, res) => {
    const donationLink = req.params.donationLink
    
    const collegeFound = await College.findOne({ donationLink }, {name: true, location: true}).exec()

    if(!collegeFound) throw createApiError("No college was found that matches provided donation link", 400)

    res.status(200).json(handleResponse({ message: [ collegeFound ] }))
})

const getCollegesFullDetails = handleAsync(async (req, res) => {
    const colleges = await College.find({}).exec()

    res.status(200).json(handleResponse({ message: colleges ? colleges : [] }))
})

const registerCollege = handleAsync(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw createApiError(errors.array().map(errObj => ("&bull; " + errObj.msg)).join('<br /><br />'), 422)
    }

   const { name, location, email, phoneNumbers, accountName, accountNumber, bankCode } = req.body

   try{
    const collegeRegistered = await new College({
        name,
        location,
        donationLink: String(await new pureUUID(4)),
        isVerified: true,
        accountDetails: {
            name: accountName,
            number: accountNumber,
            bank: bankCode
        },
        contact: {
            email,
            phoneNumbers: phoneNumbers ? phoneNumbers.split('\n') : []
        }
    }).save()

    if(!collegeRegistered) throw createApiError("Some errors were encountered", 500)

    res.status(200).json(handleResponse({message: "College(Institution) has been successfully registered"}))
   }catch(err){
     throw createApiError("The email you provided is in use by another college(Institution)", 500)
   }
})

const collegeExists = async (collegeId) => {
    return await College.findById(collegeId).exec()
}

const deleteCollege = handleAsync(async (req, res) => {
    const { collegeId } = req.body

    // Check if college with the provided ID exists
    const collegeFound = collegeExists(collegeId)

    if(!collegeFound) throw createApiError("No college was found with the provided ID") 
    
    const collegeDeleted = await College.findByIdAndDelete(collegeId).exec()

    if(!collegeDeleted) throw createApiError('Some errors were encountered', 500)

    res.status(200).json(handleResponse({ message: "College deleted successfully" }))
})

const updateCollege = handleAsync(async (req, res) => {
    const { _id, name, location, email, phoneNumbers, accountName, accountNumber, bankId: bankCode} = req.body

    // Check if college with the provided ID exists
    const collegeFound = await collegeExists(_id)

    if(!collegeFound) throw createApiError("No college was found with the provided ID") 

    const collegeUpdated = await College.findByIdAndUpdate(_id, {
        name,
        location,
        accountDetails: {
            name: accountName,
            number: accountNumber,
            bank: bankCode
        },
        contact: {
            email,
            phoneNumbers: phoneNumbers ? phoneNumbers.split('\n') : []
        }
   })

   if(!collegeUpdated) throw createApiError("Failed to update college details", 500)

   res.status(200).json(handleResponse({message: "College(Institution) details has been updated successfully"}))
})

const verifyAccount = handleAsync(async (req, res) => {
    try{
        verifyJwtToken(req.headers.authorization)
    }catch(err){
        throw createApiError(err.message, 401)
    }
    

    const { accountName, accountNumber, bankCode } = req.body

    if(accountNumber === '' || bankCode === '') throw createApiError("Please provide account name, number and bank", 400)

    // Make a request to paystack to verify the account
    const verResponse = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,{
        headers: {
            'Authorization': `Bearer ${process.env.PAYSTACK_SECRET}`
        }
    })

    if(verResponse.data.status === false) {
        throw createApiError("Failed to verify account", 400)
    }
    else if(verResponse.data.status === true && verResponse.data.data.account_number === accountNumber) {
        res.status(200).json(handleResponse({message: true}))
    } 

})

module.exports = { 
    getAllColleges,
    getCollege,
    registerCollege,
    getCollegesFullDetails,
    deleteCollege,
    updateCollege,
    verifyAccount
}