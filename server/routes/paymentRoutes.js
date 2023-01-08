const express = require('express');
const router = express.Router();
const {verifyTransaction} = require('./../controllers/paymentsController')

router.post('/:reference', verifyTransaction)

module.exports = router


