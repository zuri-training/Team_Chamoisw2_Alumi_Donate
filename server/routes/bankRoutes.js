const router = require('express').Router()
const { registerBank, getAllBanks, deleteBank, updateBankDetails } = require('./../controllers/bankController')
const { validateBankData } = require('./../middlewares/bankValidator')

router.post('/register', validateBankData, registerBank)
router.get('/all', getAllBanks)
router.delete('/delete', deleteBank)
router.patch('/update', validateBankData, updateBankDetails)

module.exports = router