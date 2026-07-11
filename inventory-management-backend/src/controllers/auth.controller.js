const { loginUser } = require("../services/auth.service");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(
            username,
            password
        );
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                username,
                token
            }
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    login
};