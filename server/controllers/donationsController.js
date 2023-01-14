const Donation = require('./../models/donationsModel')
const { handleAsync, handleResponse, createApiError } = require('./../utils/helpers')

const getDonations = handleAsync(async(req, res) => {
    const donations = await Donation
    .find({})
    .populate({path: 'userId', select: ['fullName', 'gradYear']})
    .populate({path: 'collegeId', select: ['name', 'location']})
    .exec()

    return res.status(200).json(handleResponse({ message: donations }))
})

module.exports = {
    getDonations
}