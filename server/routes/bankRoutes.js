const router = require('express').Router()
const { registerBank, getAllBanks } = require('./../controllers/bankController')
const { validateBankData } = require('./../middlewares/bankValidator')

router.post('/register', validateBankData, registerBank)
router.get('/all', getAllBanks)

module.exports = router