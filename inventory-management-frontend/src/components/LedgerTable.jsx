const LedgerTable = ({ ledger }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-5">
                Transaction Ledger
            </h2>
            <table className="min-w-full">
                <thead>
                    <tr className="border-b bg-gray-100">
                        <th className="text-left px-4 py-3">
                            Date & Time
                        </th>
                        <th className="text-left px-4 py-3">
                            Type
                        </th>
                        <th className="text-left px-4 py-3">
                            Product
                        </th>
                        <th className="text-center px-4 py-3">
                            Quantity
                        </th>
                        <th className="text-center px-4 py-3">
                            Fifo Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ledger.length > 0 ?
                            ledger.map((transaction, index) => {
                                const isSale =
                                    transaction.transaction_type === "SALE";
                                return (
                                    <tr
                                        key={`${transaction.product_id}-${index}`}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">
                                            {
                                                new Date(
                                                    transaction.transaction_time
                                                ).toLocaleString()
                                            }
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    isSale
                                                        ?
                                                        "text-red-600 font-semibold"
                                                        :
                                                        "text-green-600 font-semibold"
                                                }
                                            >
                                                {
                                                    isSale
                                                        ?
                                                        "Sale"
                                                        :
                                                        "Purchase"
                                                }
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {transaction.product_id}
                                        </td>
                                        <td className="text-center px-4 py-3">
                                            {transaction.quantity}
                                        </td>
                                        <td className="text-center px-4 py-3">
                                            ₹ {
                                                Number(
                                                    transaction.total_cost
                                                    ||
                                                    (
                                                        transaction.quantity *
                                                        transaction.unit_price
                                                    )
                                                )
                                                    .toFixed(2)
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8"
                                >
                                    No transactions found.
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};
export default LedgerTable;