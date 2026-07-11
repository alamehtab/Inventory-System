const {
    fetchInventoryDashboard,
    fetchTransactionLedger,
    resetDashboard
} = require("../services/dashboard.service");

const getInventoryDashboard = async (req, res) => {
    try {
        const inventory =
            await fetchInventoryDashboard();
        return res.status(200).json({
            success: true,
            message: "Inventory fetched successfully.",
            data: inventory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getTransactionLedger = async (req, res) => {
    try {
        const ledger =
            await fetchTransactionLedger();
        return res.status(200).json({
            success: true,
            message: "Ledger fetched successfully.",
            data: ledger
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const resetInventoryDashboard = async (req, res) => {
    try {
        await resetDashboard();
        return res.status(200).json({
            success: true,
            message: "Dashboard reset successfully"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Reset failed"
        });
    }
};

module.exports = {
    getInventoryDashboard,
    getTransactionLedger,
    resetInventoryDashboard
};