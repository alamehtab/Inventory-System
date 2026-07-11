const { sendMessage } = require("./producer");

const generateDummyEvents = async () => {
    const now = new Date().toISOString();
    const events = [
        {
            product_id: "PRD001",
            event_type: "purchase",
            quantity: 40,
            unit_price: 110,
            timestamp: now
        },
        {
            product_id: "PRD001",
            event_type: "purchase",
            quantity: 25,
            unit_price: 125,
            timestamp: now
        },
        {
            product_id: "PRD001",
            event_type: "sale",
            quantity: 35,
            timestamp: now
        },
        {
            product_id: "PRD002",
            event_type: "purchase",
            quantity: 80,
            unit_price: 75,
            timestamp: now
        },
        {
            product_id: "PRD002",
            event_type: "sale",
            quantity: 20,
            timestamp: now
        }
    ];
    for (const event of events) {
        await sendMessage(event);
    }
};

module.exports = {
    generateDummyEvents
};

if (require.main === module) {
    (async () => {
        await generateDummyEvents();
        process.exit();
    })();
}