const router = require('express').Router()
const { getUserData, updateUserData, updateNewsletterSub, getAdmins, deleteAdmin, updateAdmin } = require('./../controllers/profileController')
const { validateUserUpdateData, validateAdminUpdateData } = require('./../middlewares/userDataValidator')

router.get('/', getUserData)
router.patch('/update', validateUserUpdateData, updateUserData)
router.patch('/newsletter/subscription', updateNewsletterSub)
router.get('/admins/all', getAdmins)
router.delete("/admin/delete", deleteAdmin)
router.patch("/admin/update", validateAdminUpdateData, updateAdmin)

module.exports = router