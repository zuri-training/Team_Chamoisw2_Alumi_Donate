const express = require('express');
const router = express.Router();
const {populateColleges, getAllColleges} = require('./../controllers/collegeController')

router.get('/populate', populateColleges);
router.get('/all', getAllColleges)
module.exports = router


