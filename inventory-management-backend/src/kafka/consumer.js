const kafka = require("../config/kafka");
const { processInventoryEvent } = require("../services/inventory.service");
const { CONSUMER_GROUP, INVENTORY_TOPIC } = require("../constants/kafka.constants");

const consumer = kafka.consumer({
    groupId: CONSUMER_GROUP
});

const startConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: INVENTORY_TOPIC,
        fromBeginning: false
    });
    console.log("Kafka Consumer Started");
    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(
                message.value.toString()
            );
            await processInventoryEvent(data);
        }
    });
};

module.exports = {
    startConsumer
};