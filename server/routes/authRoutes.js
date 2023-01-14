const express = require('express')
const router = express.Router() 
const {
    userSignup, 
    userLogin, 
    forgotPassword,
    changePassword,
    verifyJwt,
    adminSignup,
    adminLogin,
    adminExists
} = require("../controllers/authController")
const { validateSignUp, validateAdminSignup } = require("../middlewares/authValidators")
  
router.post("/signup", validateSignUp, userSignup)
router.post("/login", userLogin)
router.post("/forgotpassword", forgotPassword)
router.post("/changepassword/:token", changePassword);
router.get("/token/verify", verifyJwt)
router.post("/admin/register", validateAdminSignup, adminSignup)
router.post("/admin/login", adminLogin)
router.post("/admin/exists", adminExists)

module.exports = router
