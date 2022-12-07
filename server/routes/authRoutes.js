const express = require('express')
const router = express.Router() 
const {
    userSignup, 
    userLogin, 
    userLogout,
    forgotPassword
} = require("../controllers/authController")
const validateSignUp = require("../middlewares/authValidators")
  
router.post("/signup", validateSignUp, userSignup)
router.post("/login", userLogin)
router.delete("/logout", userLogout)
router.post("/forgotpassword", forgotPassword)

module.exports = router
