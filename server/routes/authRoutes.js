const express = require('express')
const router = express.Router() 

const {userSignup, userLogin} = require("../controllers/authController")
const validateSignUp = require("../middlewares/authValidators")
  
router.post("/signup", validateSignUp, userSignup)
router.post("/login", userLogin)

module.exports = router