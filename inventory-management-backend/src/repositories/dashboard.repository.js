const pool = require("../config/db");

const getInventoryDashboard = async () => {
    const result = await pool.query(`
        SELECT
            p.product_id,
            COALESCE(
                SUM(ib.remaining_quantity),
                0
            ) AS current_quantity,
            COALESCE(
                SUM(
                    ib.remaining_quantity * ib.unit_price
                ),
                0
            ) AS total_inventory_cost,
            COALESCE(
                ROUND(
                    SUM(
                        ib.remaining_quantity * ib.unit_price
                    ) /
                    NULLIF(
                        SUM(ib.remaining_quantity),
                        0
                    ),
                    2
                ),
                0
            ) AS average_cost_per_unit
        FROM products p
        LEFT JOIN inventory_batches ib
        ON p.id = ib.product_id
        GROUP BY
            p.id,
            p.product_id
        ORDER BY p.product_id;
    `);
    return result.rows;
};

const getPurchases = async () => {
    const result = await pool.query(`
        SELECT
            ib.id,
            'PURCHASE' AS transaction_type,
            p.product_id,
            ib.purchased_quantity AS quantity,
            ib.unit_price,
            NULL AS total_cost,
            ib.purchased_at AS transaction_time
        FROM inventory_batches ib
        JOIN products p
        ON p.id = ib.product_id
        ORDER BY ib.purchased_at;
    `);
    return result.rows;
};

const getSales = async () => {
    const result = await pool.query(`
        SELECT
            s.id,
            'SALE' AS transaction_type,
            p.product_id,
            s.quantity,
            NULL AS unit_price,
            s.total_cost,
            s.sold_at AS transaction_time
        FROM sales s
        JOIN products p
        ON p.id = s.product_id
        ORDER BY s.sold_at;
    `);
    return result.rows;
};

const getSaleBreakdown = async (saleId) => {
    const result = await pool.query(`
        SELECT
            inventory_batch_id,
            quantity,
            unit_price,
            batch_cost
        FROM sale_batch_allocations
        WHERE sale_id = $1
        ORDER BY inventory_batch_id;
    `, [saleId]);
    return result.rows;
};

const resetDashboardData = async()=>{

    await pool.query(`
    
    TRUNCATE 
    sale_batch_allocations,
    sales,
    inventory_batches,
    products
    RESTART IDENTITY
    CASCADE;

    `);


};

module.exports = {
    getInventoryDashboard,
    getPurchases,
    getSales,
    getSaleBreakdown,
    resetDashboardData
};