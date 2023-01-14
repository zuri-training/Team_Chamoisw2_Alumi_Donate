require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const authRoutes = require('./routes/authRoutes')
const collegeRoutes = require('./routes/collegeRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const donationRoutes = require('./routes/donationRoutes')
const profileRoutes =  require('./routes/profileRoutes')
const bankRoutes = require('./routes/bankRoutes')

const app = express()

const connectDB = require('./utils/dbConn')
connectDB()

app.use(cors({
    origin: '*'
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/colleges", collegeRoutes)
app.use("/api/transaction/verify", paymentRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/banks", bankRoutes)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app