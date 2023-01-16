const { handleAsync, createApiError, handleResponse, verifyJwtToken } = require('../utils/helpers')
const Bank = require('./../models/bankModel')
const { validationResult } = require('express-validator')

const registerBank = handleAsync(async (req, res) => {
    // If token verification fails, an error is thrown and code execution stops
    verifyJwtToken(req.headers.authorization)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw createApiError(errors.array().map(errObj => ("&bull; " + errObj.msg)).join('<br /><br />'), 422)
    }

    const bankRegistered = await new Bank( req.body ).save()

    if(!bankRegistered){
        throw createApiError("Some errors were encountered", 500)
    }

    return res.status(200).json(handleResponse({ message: "Bank registration successful" }))
})

const getAllBanks = handleAsync(async (req, res) => {
    // If token verification fails, an error is thrown and code execution stops
    verifyJwtToken(req.headers.authorization)

    const banks = await Bank.find({}).exec()

    return res.status(200).json(handleResponse({message: banks}))
})

const bankExists = async bankId => {
    return await Bank.findById( bankId ).exec()
}

const deleteBank = handleAsync(async (req, res) => {
    // If token verification fails, an error is thrown and code execution stops
    verifyJwtToken(req.headers.authorization)

    const { bankId } = req.body

    // Checks to see if bank does not exist and throws an error
    if(! await bankExists(bankId)){
        throw createApiError("Bank does not exist", 404)
    }

    const bankDeleted = await Bank.findByIdAndDelete( bankId ).exec()

    if(!bankDeleted){
        throw createApiError("Some errors were encountered", 500)
    }

    return res.status(200).json(handleResponse({ message: true}))
})

const updateBankDetails = handleAsync(async (req, res) => {
    // If token verification fails, an error is thrown and code execution stops
    verifyJwtToken(req.headers.authorization)

    const { _id, name, code, slug } = req.body
    
    // checks to see if bank does not exist and throws an error
    if(! await bankExists(_id)){
        throw createApiError("Bank does not exist", 404)
    }

    const bankUpdated = await Bank.findByIdAndUpdate(_id, { name, code, slug }).exec()

    if(!bankUpdated){
        throw createApiError("Some errors were encountered while trying to update bank details", 500)
    }

    res.status(200).json(handleResponse({ message: "Bank updated"}))
})


module.exports = {
    registerBank,
    getAllBanks,
    deleteBank,
    updateBankDetails
}