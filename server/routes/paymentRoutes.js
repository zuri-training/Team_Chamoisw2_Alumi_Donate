const express = require('express');
const router = express.Router();
const {verifyTransaction} = require('./../controllers/paymentsController')

router.get('/:reference', verifyTransaction)

module.exports = router


