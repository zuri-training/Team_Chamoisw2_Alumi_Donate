const collegesJSON = require("./../colleges.json");
const pureUUID = require('pure-uuid');
const College = require('./../models/collegeModel');

const populateColleges = async(req, res) => {
    const result = collegesJSON.reduce((parsedObj, val) => {
        const objKey = Object.keys(val)
    
        const collegesLocation = objKey[0]
        
        const collegesKeys = Object.keys(val[collegesLocation])
    
        let collegesInfo = {}
    
        for(let x = 0; x < collegesKeys.length; x++){
            collegesInfo['location'] = collegesLocation
            collegesInfo['name'] = val[collegesLocation][collegesKeys[x]]
            collegesInfo['donationLink'] = new pureUUID(4);
            parsedObj.push(collegesInfo)
            collegesInfo = {}
        }
        return parsedObj
    }, [])
    const operationResult = await College.create(result)
    res.status(201).json(operationResult)
} 
module.exports = {populateColleges}