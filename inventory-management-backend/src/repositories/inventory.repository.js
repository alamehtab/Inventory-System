const pool = require("../config/db");

const createBatch = async (client, data) => {
    const {
        productId,
        quantity,
        unitPrice,
        purchasedAt
    } = data;
    const result = await client.query(
        `
        INSERT INTO inventory_batches
        (
            product_id,
            purchased_quantity,
            remaining_quantity,
            unit_price,
            purchased_at
        )
        VALUES ($1, $2, $2, $3, $4)
        RETURNING *
        `,
        [
            productId,
            quantity,
            unitPrice,
            purchasedAt
        ]
    );
    return result.rows[0];
};

const getAvailableBatches = async (client, productId) => {
    const result = await client.query(
        `
        SELECT *
        FROM inventory_batches
        WHERE product_id = $1
        AND remaining_quantity > 0
        ORDER BY purchased_at ASC, id ASC
        FOR UPDATE
        `,
        [productId]
    );
    return result.rows;
};

const updateBatchQuantity = async (
    client,
    batchId,
    remainingQuantity
) => {
    await client.query(
        `
        UPDATE inventory_batches
        SET remaining_quantity = $1
        WHERE id = $2
        `,
        [
            remainingQuantity,
            batchId
        ]
    );
};

module.exports = {
    createBatch,
    getAvailableBatches,
    updateBatchQuantity
};