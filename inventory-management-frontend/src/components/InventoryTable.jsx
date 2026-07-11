const InventoryTable = ({ inventory }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">
                Product Stock Overview
            </h2>
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3">
                            Product
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Total Cost
                        </th>
                        <th>
                            Average Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inventory.map((item) => (
                            <tr
                                key={item.product_id}
                                className="border-b"
                            >
                                <td className="py-4">
                                    {item.product_id}
                                </td>
                                <td className="text-center">
                                    {item.current_quantity}
                                </td>
                                <td className="text-center">
                                    ₹ {Number(
                                        item.total_inventory_cost
                                    ).toFixed(2)}
                                </td>
                                <td className="text-center">
                                    ₹ {
                                        item.current_quantity > 0
                                            ?
                                            (
                                                Number(item.total_inventory_cost) /
                                                Number(item.current_quantity)
                                            ).toFixed(2)
                                            :
                                            "0.00"
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
export default InventoryTable;