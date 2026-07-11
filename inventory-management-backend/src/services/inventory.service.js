const getClient = require("../config/transaction");
const { getOrCreateProduct } = require("../repositories/product.repository");
const {
    createBatch,
    getAvailableBatches,
    updateBatchQuantity
} = require("../repositories/inventory.repository");
const {
    createSale,
    createAllocation
} = require("../repositories/sales.repository");

const processPurchase = async (event) => {
    const client = await getClient();
    try {
        await client.query("BEGIN");
        const product = await getOrCreateProduct(
            client,
            event.product_id
        );
        await createBatch(client, {
            productId: product.id,
            quantity: event.quantity,
            unitPrice: event.unit_price,
            purchasedAt: event.timestamp
        });
        await client.query("COMMIT");
        console.log("Purchase processed");
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
};

const processSale = async (event) => {
    const client = await getClient();
    try {
        await client.query("BEGIN");
        const product = await getOrCreateProduct(
            client,
            event.product_id
        );
        let remainingToSell = event.quantity;
        let totalCost = 0;
        const allocations = [];
        const batches = await getAvailableBatches(
            client,
            product.id
        );
        if (batches.length === 0) {
            throw new Error("No inventory available.");
        }
        for (const batch of batches) {
            if (remainingToSell === 0) {
                break;
            }
            const quantityTaken = Math.min(
                remainingToSell,
                batch.remaining_quantity
            );
            const batchCost =
                quantityTaken * Number(batch.unit_price);
            totalCost += batchCost;
            allocations.push({
                inventoryBatchId: batch.id,
                quantity: quantityTaken,
                unitPrice: Number(batch.unit_price),
                batchCost
            });
            await updateBatchQuantity(
                client,
                batch.id,
                batch.remaining_quantity - quantityTaken
            );
            remainingToSell -= quantityTaken;
        }
        if (remainingToSell > 0) {
            throw new Error("Insufficient inventory.");
        }
        const sale = await createSale(client, {
            productId: product.id,
            quantity: event.quantity,
            totalCost,
            soldAt: event.timestamp
        });
        for (const allocation of allocations) {
            await createAllocation(client, {
                saleId: sale.id,
                inventoryBatchId: allocation.inventoryBatchId,
                quantity: allocation.quantity,
                unitPrice: allocation.unitPrice,
                batchCost: allocation.batchCost
            });
        }
        await client.query("COMMIT");
        console.log(`Sale processed | FIFO Cost: ${totalCost}`);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
};

const processInventoryEvent = async (event) => {
    switch (event.event_type) {
        case "purchase":
            return processPurchase(event);
        case "sale":
            return processSale(event);
        default:
            throw new Error("Invalid event type.");
    }
};

module.exports = {
    processInventoryEvent
};