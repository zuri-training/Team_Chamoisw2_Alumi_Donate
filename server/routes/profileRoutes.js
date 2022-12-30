const router = require('express').Router()
const { getUserData, updateUserData } = require('./../controllers/profileController')
const { validateUserUpdateData } = require('./../middlewares/userDataValidator')

router.get('/', getUserData)
router.patch('/update', validateUserUpdateData, updateUserData)

module.exports = router