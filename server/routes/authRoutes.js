const express = require('express')
const router = express.Router() 
const {
    userSignup, 
    userLogin, 
    userLogout,
    forgotPassword,
    changePassword,
    refreshToken
} = require("../controllers/authController")
const validateSignUp = require("../middlewares/authValidators")
  
router.post("/signup", validateSignUp, userSignup)
router.post("/login", userLogin)
router.delete("/logout", userLogout)
router.post("/forgotpassword", forgotPassword)
router.post("/changepassword/:token", changePassword);
router.post("/refreshToken", refreshToken);

module.exports = router
