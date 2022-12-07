const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
require("dotenv").config()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Ready for Message ")
    console.log(success)
  }
})

const handlebarsOptions = {
  viewEngine:{
    extName: '.hbs',
    partialsDir: path.resolve(__dirname, '..', 'email-templates'),
    defaultLayout: false
  },
  viewPath: path.resolve(__dirname, '..', 'email-templates'),
  extName: '.hbs'
}

transporter.use('compile', hbs(handlebarsOptions))

const sendChangePasswordEmail = async ({ email, link }) => {
  //mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Reset password`,
    template: 'resetPassword',
    context: {
      email,
      link
    }
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        resolve(false)
      } else {
        resolve(true)
        console.log("Email sent: " + info.response)
      }
    })
  })
}

module.exports = {
  sendChangePasswordEmail,
}
