require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const authRoutes = require('./routes/authRoutes')
const collegeRoutes = require('./routes/collegeRoutes')

const app = express()

const PORT = process.env.PORT || 5000;

const connectDB = require('./utils/dbConn')
connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/colleges", collegeRoutes)

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connection.once("open", () => {
    console.log("Connected to DB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});