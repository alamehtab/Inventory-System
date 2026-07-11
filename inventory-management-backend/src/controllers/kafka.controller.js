const { generateDummyEvents } = require("../kafka/simulator");

const simulateKafka = async (req, res) => {
    try {
        await generateDummyEvents();
        return res.status(200).json({
            success: true,
            message: "Dummy Kafka events generated successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate Kafka events."
        });
    }
};

module.exports = {
    simulateKafka
};