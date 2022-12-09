const {body, check} = require("express-validator");

const validateSignUp = check(["email","password", "phoneNumber", "gradYear", "collegeId", "fullName"]) ? 
    [
        body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), 
        body("password").trim().not().isEmpty(),
        body("phoneNumber").trim().not().isEmpty(),
        body("gradYear").trim().not().isEmpty(),
        body("collegeId").trim().not().isEmpty(),
        body("fullName").trim().not().isEmpty()  
    ] : [];

module.exports = validateSignUp;