const { check } = require("express-validator");

const validateSignUp = [
    check("email").trim().isEmail().toLowerCase(),
    check("password").trim().not().isEmpty(),
    check("phoneNumber").trim().not().isEmpty(),
    check("gradYear").trim().not().isEmpty(),
    check("collegeId").trim().not().isEmpty(),
    check("fullName").trim().not().isEmpty()
]

module.exports = validateSignUp;