const express = require('express');
const router = express.Router();
const { validateCollegeRegData } = require('./../middlewares/collegeValidator')
const {
    getAllColleges, 
    getCollege, 
    registerCollege, 
    getCollegesFullDetails,
    deleteCollege,
    updateCollege
} = require('./../controllers/collegeController')

router.get('/all', getAllColleges)
router.get('/single/:donationLink', getCollege)
router.get('/all/complete', getCollegesFullDetails)
router.post('/register', validateCollegeRegData, registerCollege)
router.delete('/delete', deleteCollege)
router.patch('/update', updateCollege)

module.exports = router


