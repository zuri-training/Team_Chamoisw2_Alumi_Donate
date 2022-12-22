const collegesJSON = require("./../colleges.json");
const pureUUID = require('pure-uuid');
const College = require('./../models/collegeModel');
const { handleAsync, createApiError } = require('./../utils/helpers');

const populateColleges = handleAsync(async(req, res) => {
    collegesJSON.forEach(async (val) => {
        const objKey = Object.keys(val)
    
        const collegesList = val[objKey[0]]
        
        const collegesKeys = Object.keys(collegesList)
        
        collegesKeys.forEach(async key => {
            if(collegesList[key] == "")return
            await new College({
                name: collegesList[key],
                location: objKey[0],
                donationLink: JSON.stringify(await new pureUUID(4))
            }).save()            
        })
        
    })
    
    res.status(201).json({message: "seeded"})
})

const getAllColleges = handleAsync(async (req,res) => {
    console.log('called')
    const colleges = await College.find({}, {_id: 1, name: 1,location: 1 }).exec()
    console.log(colleges)
    res.status(200).json({ message: colleges })
})

module.exports = { 
    populateColleges,
    getAllColleges
}