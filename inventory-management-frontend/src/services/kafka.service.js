import api from "../api/axios";

const generateRandomEvents = () => {
    const now = new Date().toISOString();
    const events = [
        {
            product_id: "PRD001",
            event_type: "purchase",
            quantity: Math.floor(Math.random() * 50) + 20,
            unit_price: Math.floor(Math.random() * 50) + 100,
            timestamp: now
        },
        {
            product_id: "PRD001",
            event_type: "sale",
            quantity: Math.floor(Math.random() * 20) + 10,
            timestamp: now
        },
        {
            product_id: "PRD002",
            event_type: "purchase",
            quantity: Math.floor(Math.random() * 80) + 30,
            unit_price: Math.floor(Math.random() * 30) + 70,
            timestamp: now
        },
        {
            product_id: "PRD002",
            event_type: "sale",
            quantity: Math.floor(Math.random() * 20) + 10,
            timestamp: now
        }
    ];
    return events;
};

export const simulateKafka = async () => {
    const events = generateRandomEvents();
    const responses = [];
    for (const event of events) {
        const response = await api.post(
            "/kafka/simulate",
            event
        );
        responses.push(response.data);
    }
    return responses;
};