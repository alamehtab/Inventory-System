const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");
const { getInventoryDashboard, getTransactionLedger,resetInventoryDashboard } = require("../controllers/dashboard.controller");

router.get(
    "/inventory",
    authenticate,
    getInventoryDashboard
);

router.get(
    "/ledger",
    authenticate,
    getTransactionLedger
);

router.post(
"/reset",
authenticate,
resetInventoryDashboard
);

module.exports = router;