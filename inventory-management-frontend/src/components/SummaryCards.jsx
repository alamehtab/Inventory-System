const SummaryCards = ({ inventory }) => {
    
    const totalProducts = inventory.length;
    const totalStock = inventory.reduce(
        (sum, item) => sum + Number(item.current_quantity),
        0
    );
    const totalCost = inventory.reduce(
        (sum, item) => sum + Number(item.total_inventory_cost),
        0
    );
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-gray-500">
                    Products
                </h2>
                <h1 className="text-4xl font-bold mt-2">
                    {totalProducts}
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-gray-500">
                    Total Stock
                </h2>
                <h1 className="text-4xl font-bold mt-2">
                    {totalStock}
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-gray-500">
                    Inventory Cost
                </h2>
                <h1 className="text-3xl font-bold mt-2">
                    ₹ {totalCost.toFixed(2)}
                </h1>
            </div>
        </div>
    );
};

export default SummaryCards;