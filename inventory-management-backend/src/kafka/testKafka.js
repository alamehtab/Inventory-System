require("dotenv").config();
const kafka = require("../config/kafka");

async function testKafka() {
    const producer = kafka.producer();
    try {
        await producer.connect();
        console.log("Kafka Connected Successfully");
        await producer.disconnect();
    } catch (error) {
        console.error("Kafka Connection Failed");
        console.error(error);
    }
}
testKafka();