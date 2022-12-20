const express = require('express');
const router = express.Router();
const {populateColleges} = require('./../controllers/collegeController')

router.get('/populate', populateColleges);
module.exports = router


