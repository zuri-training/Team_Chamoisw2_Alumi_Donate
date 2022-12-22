const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
    try {
        const payload = { userId: user._id, collegeId: user.collegeId }
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );
       
        return Promise.resolve({ accessToken })
    } catch (err) {
        return Promise.reject(err)
    }
};

module.exports = { generateToken }