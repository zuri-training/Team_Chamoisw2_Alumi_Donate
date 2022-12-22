const express = require('express');
const router = express.Router();
const {populateColleges, getAllColleges, getDonationLink} = require('./../controllers/collegeController')

router.get('/populate', populateColleges);
router.get('/all', getAllColleges)
router.get('/donatelink/get/:collegeId', getDonationLink)
module.exports = router


