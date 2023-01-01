const express = require('express');
const router = express.Router();
const {populateColleges, getAllColleges, getCollege} = require('./../controllers/collegeController')

router.get('/populate', populateColleges);
router.get('/all', getAllColleges)
router.get('/single/:donationLink', getCollege)
module.exports = router


