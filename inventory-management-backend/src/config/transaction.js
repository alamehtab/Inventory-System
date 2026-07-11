const pool = require("./db");

const getClient = async () => {
    const client = await pool.connect();
    return client;
};

module.exports = getClient;