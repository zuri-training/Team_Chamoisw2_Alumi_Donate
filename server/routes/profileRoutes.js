const router = require('express').Router()
const { getUserData, updateUserData, updateNewsletterSub } = require('./../controllers/profileController')
const { validateUserUpdateData } = require('./../middlewares/userDataValidator')

router.get('/', getUserData)
router.patch('/update', validateUserUpdateData, updateUserData)
router.patch('/newsletter/subscription', updateNewsletterSub)

module.exports = router