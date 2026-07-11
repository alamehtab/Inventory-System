const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const pool = require("./src/config/db");
const { startConsumer } = require("./src/kafka/consumer");
const {
    connectProducer,
    disconnectProducer,
} = require("./src/kafka/producer");

const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const kafkaRoutes = require("./src/routes/kafka.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Inventory Management API is running.",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/kafka", kafkaRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL Connected");
        await connectProducer();
        await startConsumer();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed");
        console.error(error);
        process.exit(1);
    }
}
startServer();

process.on("SIGINT", async () => {
    console.log("\nShutting down server...");
    await disconnectProducer();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("\nShutting down server...");
    await disconnectProducer();
    process.exit(0);
});