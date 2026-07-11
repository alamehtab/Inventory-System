const pool = require("../config/db");

const createSale = async (client, data) => {
    const {
        productId,
        quantity,
        totalCost,
        soldAt
    } = data;

    const result = await client.query(
        `
        INSERT INTO sales
        (
            product_id,
            quantity,
            total_cost,
            sold_at
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            productId,
            quantity,
            totalCost,
            soldAt
        ]
    );
    return result.rows[0];
};

const createAllocation = async (client, data) => {
    const {
        saleId,
        inventoryBatchId,
        quantity,
        unitPrice,
        batchCost
    } = data;

    await client.query(
        `
        INSERT INTO sale_batch_allocations
        (
            sale_id,
            inventory_batch_id,
            quantity,
            unit_price,
            batch_cost
        )
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
            saleId,
            inventoryBatchId,
            quantity,
            unitPrice,
            batchCost
        ]
    );
};

module.exports = {
    createSale,
    createAllocation
};