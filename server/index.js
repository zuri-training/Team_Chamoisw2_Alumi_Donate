const mongoose = require('mongoose')
const app = require('./index')

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
    console.log("Connected to DB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});
