const collegesJSON = require("./../colleges.json");
const pureUUID = require('pure-uuid');
const College = require('./../models/collegeModel');

const populateColleges = async(req, res) => {
    collegesJSON.forEach(async (val) => {
        const objKey = Object.keys(val)
    
        const collegesList = val[objKey[0]]
        
        const collegesKeys = Object.keys(collegesList)
        
        collegesKeys.forEach(async key => {
            if(collegesList[key] == "")return
            await new College({
                collegeName: collegesList[key],
                location: objKey[0],
                donationLink: JSON.stringify(await new pureUUID(4))
            }).save()            
        })
        
    })
    
    res.status(201).json({message: "seeded"})
} 
module.exports = { populateColleges }