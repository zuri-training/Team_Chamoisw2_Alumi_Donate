const { handleAsync, createApiError, handleResponse } = require('../utils/helpers')
const Bank = require('./../models/bankModel')
const { validationResult } = require('express-validator')

const registerBank = handleAsync(async (req, res) => {
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
    const banks = await Bank.find({}).exec()

    return res.status(200).json(handleResponse({message: banks}))
})

module.exports = {
    registerBank,
    getAllBanks
}