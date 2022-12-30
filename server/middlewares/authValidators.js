const { body } = require("express-validator");

const validateSignUp = [
    body("email").trim().isEmail().toLowerCase(),
    body("phoneNumber").trim().isMobilePhone(),
    body("gradYear").trim().isNumeric().isLength(4),
    body("collegeId").trim().isMongoId(),
    body("fullName").trim().isString().isLength({min: 5}),
    body("password").trim().isAlphanumeric().isLength({min: 5}),
]

module.exports = validateSignUp;