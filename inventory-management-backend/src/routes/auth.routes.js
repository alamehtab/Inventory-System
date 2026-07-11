const express = require("express");
const { loginValidator } = require("../validators/auth.validator");
const validateRequest = require("../middleware/validation.middleware");
const { login } = require("../controllers/auth.controller");
const router = express.Router();

router.post(
    "/login",
    loginValidator,
    validateRequest,
    login
);

module.exports = router;