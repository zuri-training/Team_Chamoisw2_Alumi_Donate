const collegesJSON = require("./../colleges.json");
const pureUUID = require('pure-uuid');
const College = require('./../models/collegeModel');
const { handleAsync, createApiError, handleResponse } = require('./../utils/helpers');

// This is for testing purposes. College has to be registered by their authorities.
const populateColleges = handleAsync(async(req, res) => {
    await College.deleteMany({}).exec()

    collegesJSON.forEach(async (val) => {
        const objKey = Object.keys(val)
    
        const collegesList = val[objKey[0]]
        
        const collegesKeys = Object.keys(collegesList)
        
        collegesKeys.forEach(async key => {
            if(collegesList[key] == "")return
            await new College({
                name: collegesList[key],
                location: objKey[0],
                donationLink: String(await new pureUUID(4))
            }).save()            
        })
    })
    
    res.status(201).json({message: "seeded"})
})

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

module.exports = { 
    populateColleges,
    getAllColleges,
    getCollege
}