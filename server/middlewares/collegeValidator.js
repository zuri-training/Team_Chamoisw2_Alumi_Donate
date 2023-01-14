const { body } = require('express-validator')

const validateCollegeRegData = [
    body("name").trim().isString().isLength({min: 3}).withMessage('College(Institution) name not valid'),
    body("location").trim().isString().isLength({min: 3}).withMessage('College(Institution) location not valid'),
    body("email").trim().isEmail().withMessage('Invalid email format'),
    body("accountName").trim().isString().isLength({min: 5}).withMessage('Provide a valid account name'),
    body("accountNumber").trim().isNumeric().isLength({min: 10}).withMessage('Provide a valid account number'),
    body("bankId").trim().isMongoId().withMessage('Incorrect bank info'),
]

module.exports = {
    validateCollegeRegData
}