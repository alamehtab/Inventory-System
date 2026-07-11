const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { findUserByUsername } = require("../repositories/auth.repository");

const loginUser = async (username, password) => {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new Error("Invalid username or password");
    }
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if (!isMatch) {
        throw new Error("Invalid username or password");
    }
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    return token;
};

module.exports = {
    loginUser
};