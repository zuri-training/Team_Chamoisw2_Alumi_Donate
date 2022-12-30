const { body } = require("express-validator");

const validateUserUpdateData = [
    body("email").trim().isEmail().toLowerCase().withMessage('Invalid email'),
    body("phoneNumber").trim().isMobilePhone().withMessage('Invalid phone-number'),
    body("gradYear").trim().isNumeric().isLength(4).withMessage('Invalid graduation year'),
    body("collegeId").trim().isMongoId().withMessage('Invalid college value'),
    body("fullName").trim().isString().isLength({min: 5}).withMessage("Invalid Fullname")
]

module.exports = { validateUserUpdateData };