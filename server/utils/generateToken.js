const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
    try {
        // The user object without the "collegeId" being used as the payload here is the admin record from the database
        const payload = user.collegeId ? { userId: user._id, collegeId: user.collegeId } : {...user}
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );
        return Promise.resolve(accessToken)
    } catch (err) {
        return false
    }
};

module.exports = { generateToken }