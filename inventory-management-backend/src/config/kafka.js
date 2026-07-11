const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "inventory-app",
    brokers: [
        process.env.KAFKA_BROKERS
    ],
    ssl: true,
    sasl: {
        mechanism: "scram-sha-256",
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
    },
});

module.exports = kafka;