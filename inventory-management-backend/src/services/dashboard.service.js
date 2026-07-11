const {
    getInventoryDashboard,
    getPurchases,
    getSales,
    getSaleBreakdown,
    resetDashboardData
} = require("../repositories/dashboard.repository");

const fetchInventoryDashboard = async () => {
    return await getInventoryDashboard();
};

const fetchTransactionLedger = async () => {
    const purchases = await getPurchases();
    const sales = await getSales();
    for (const sale of sales) {
        sale.fifo_breakdown =
            await getSaleBreakdown(sale.id);
    }
    const ledger = [
        ...purchases,
        ...sales
    ];
    ledger.sort(
        (a, b) =>
            new Date(a.transaction_time) -
            new Date(b.transaction_time)
    );
    return ledger;
};
const resetDashboard = async()=>{
    await resetDashboardData();
};

module.exports = {
    fetchInventoryDashboard,
    fetchTransactionLedger,
    resetDashboard
};