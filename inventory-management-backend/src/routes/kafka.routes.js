const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");

const { simulateKafka } = require("../controllers/kafka.controller");

router.post(
    "/simulate",
    authenticate,
    simulateKafka
);

module.exports = router;