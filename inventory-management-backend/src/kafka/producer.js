const kafka = require("../config/kafka");
const { INVENTORY_TOPIC } = require("../constants/kafka.constants");

const producer = kafka.producer();
let connected = false;
const connectProducer = async () => {
    if (!connected) {
        await producer.connect();
        connected = true;
        console.log("Kafka Producer Connected");
    }
};

const disconnectProducer = async () => {
    if (connected) {
        await producer.disconnect();
        connected = false;
        console.log("Kafka Producer Disconnected");
    }
};

const sendMessage = async (message) => {
    await connectProducer();
    await producer.send({
        topic: INVENTORY_TOPIC,
        messages: [
            {
                value: JSON.stringify(message)
            }
        ]
    });
    console.log("Kafka Event Sent:", message);
};

module.exports = {
    connectProducer,
    disconnectProducer,
    sendMessage
};