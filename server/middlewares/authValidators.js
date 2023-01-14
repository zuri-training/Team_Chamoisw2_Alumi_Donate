const { body } = require("express-validator");

// This set of validation rules is for a casual user registration data
const validateSignUp = [
    body("email").trim().isEmail().toLowerCase().withMessage('Invalid email'),
    body("phoneNumber").trim().isMobilePhone().withMessage('Invalid phone number'),
    body("gradYear").trim().isNumeric().isLength(4).withMessage('Invalid graduation year'),
    body("collegeId").trim().isMongoId().withMessage('Invalid college value'),
    body("fullName").trim().isString().isLength({min: 5}).withMessage("Invalid Fullname"),
    body("password").trim().isAlphanumeric().isLength({min: 5}).withMessage("Password must be at least 5 characters")
]

const validateAdminSignup = [
    body("fullName").trim().isString().isLength({min: 5}).withMessage("Invalid Fullname"),
    body("email").trim().isEmail().toLowerCase().withMessage('Invalid email'),
    body("phoneNumber").trim().isMobilePhone().withMessage('Invalid phone number'),
    body("password").trim().isAlphanumeric().isLength({min: 5}).withMessage("Password must be at least 5 characters")
]

module.exports = { validateSignUp, validateAdminSignup };