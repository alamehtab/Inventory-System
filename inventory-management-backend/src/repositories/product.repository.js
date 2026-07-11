const pool = require("../config/db");

const findProductByCode = async (client, productId) => {
    const result = await client.query(
        `
        SELECT *
        FROM products
        WHERE product_id = $1
        `,
        [productId]
    );
    return result.rows[0];
};

const createProduct = async (client, productId) => {
    const result = await client.query(
        `
        INSERT INTO products (product_id)
        VALUES ($1)
        RETURNING *
        `,
        [productId]
    );
    return result.rows[0];
};

const getOrCreateProduct = async (client, productId) => {
    let product = await findProductByCode(client, productId);
    if (!product) {
        product = await createProduct(client, productId);
    }
    return product;
};

module.exports = {
    findProductByCode,
    createProduct,
    getOrCreateProduct
};