const { getDonations } = require('../controllers/donationsController')

const router = require('express').Router()

// All donations are retrieved through this route
router.get('/', getDonations)

module.exports = router