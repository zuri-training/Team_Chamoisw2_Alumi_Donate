const { body } = require('express-validator')

const validateBankData = [
    body("name").trim().isString().isLength({ min: 3 }).withMessage('Provide a valid bank name'),
    body("bankCode").trim().isString().isLength({ min: 3 }).withMessage('Provide a valid bank code'),
    body("slug").trim().isString().optional({ nullable: true })
]

module.exports = {
    validateBankData
}