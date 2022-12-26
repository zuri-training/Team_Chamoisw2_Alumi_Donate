const express = require('express')
const router = express.Router() 
const {
    userSignup, 
    userLogin, 
    forgotPassword,
    changePassword,
} = require("../controllers/authController")
const validateSignUp = require("../middlewares/authValidators")
  
router.post("/signup", validateSignUp, userSignup)
router.post("/login", userLogin)
router.post("/forgotpassword", forgotPassword)
router.post("/changepassword/:token", changePassword);

module.exports = router
