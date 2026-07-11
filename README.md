# Inventory Management System (FIFO) - Real Time Inventory Dashboard

A real-time inventory management system built to track product purchases, sales, stock levels, and FIFO-based inventory costing.

The system processes inventory events using Kafka, applies FIFO (First In First Out) logic during sales, stores data in PostgreSQL, and displays inventory information through a React dashboard.

---

# Features

- Real-time inventory updates using Kafka events
- Purchase and sales transaction tracking
- FIFO cost calculation for sales
- Current stock monitoring
- Total inventory value calculation
- Average product cost calculation
- Complete transaction ledger
- JWT authentication
- Dashboard auto-refresh
- Inventory reset functionality

---

# FIFO Logic

FIFO means **First In First Out**.

The oldest purchased inventory is used first when a product is sold.

Example:

```
Purchase 1:
10 units @ ₹100

Purchase 2:
20 units @ ₹120
```

Customer buys:

```
15 units
```

FIFO calculation:

```
10 × 100 = ₹1000

5 × 120 = ₹600

Total FIFO Cost = ₹1600
```

The application automatically calculates this cost during sales.

---

# Application Flow

```
React Dashboard

        ↓

Backend API

        ↓

Kafka Producer

        ↓

Kafka Topic

inventory-events

        ↓

Kafka Consumer

        ↓

FIFO Processing

        ↓

PostgreSQL Database

        ↓

Dashboard Update
```

---

# Technology Stack

## Frontend

- React
- Tailwind CSS
- Axios
- React Router


## Backend

- Node.js
- Express.js
- JWT Authentication


## Database

- PostgreSQL


## Messaging

- Apache Kafka

---

# Kafka Implementation

Kafka is used to handle inventory events.

Instead of directly updating the database, inventory activities are sent as events.

Example:

```
Product PRD001 purchased
Quantity: 50
Price: ₹100
```

Kafka Flow:

```
Producer

↓

inventory-events Topic

↓

Consumer

↓

FIFO Logic

↓

Database Update
```

Kafka provides:

- Event processing
- Scalability
- Separation between services
- Real-time updates

---

# Database Design

The application uses PostgreSQL.

Main tables:

```
products
inventory_batches
sales
sale_batch_allocations
```

## Products

Stores product information.

Example:

```
product_id:
PRD001
```

---

## Inventory Batches

Stores every purchase separately.

Example:

```
Product:
PRD001

Quantity:
50

Purchase Price:
₹100
```

Batches are stored separately because FIFO requires knowing:

- Which stock arrived first
- Purchase cost of each batch

---

## Sales

Stores sales transactions.

Contains:

- Product sold
- Quantity
- FIFO calculated cost
- Sale time

---

## Sale Batch Allocations

Stores which inventory batches were consumed during a sale.

Example:

Available inventory:

```
Batch 1:
10 units @ ₹100

Batch 2:
20 units @ ₹120
```

Customer buys:

```
15 units
```

Allocation:

```
10 units from Batch 1

5 units from Batch 2
```

---

# Backend Architecture

```
backend

├── controllers
├── services
├── repositories
├── routes
├── middleware
├── kafka
└── config
```

## Controllers

Handles API requests and responses.

## Services

Contains business logic:

- FIFO calculation
- Inventory processing
- Dashboard logic

## Repositories

Handles database operations and SQL queries.

## Middleware

Handles:

- Authentication
- Request validation

## Kafka

Contains:

- Producer
- Consumer
- Event processing

---

# API Documentation

All protected APIs require JWT authentication.

---

# Authentication

## Login

```
POST /api/auth/login
```

Purpose:

Login user and generate JWT token.

Example request:

```json
{
 "username":"admin",
 "password":"admin123"
}
```

---

# Dashboard APIs

## Get Inventory

```
GET /api/dashboard/inventory
```

Returns:

- Product ID
- Available quantity
- Inventory value
- Average cost


---

## Get Transaction Ledger

```
GET /api/dashboard/ledger
```

Returns:

- Purchase transactions
- Sales transactions
- Transaction time
- FIFO cost


---

## Reset Inventory

```
POST /api/dashboard/reset
```

Clears:

- Products
- Inventory batches
- Sales
- FIFO allocations

---

# Kafka Simulation API

## Generate Inventory Event

```
POST /api/kafka/simulate
```

Used to simulate inventory events.

Purchase example:

```json
{
 "product_id":"PRD001",
 "event_type":"purchase",
 "quantity":50,
 "unit_price":100,
 "timestamp":"2025-07-12T10:00:00Z"
}
```

Sale example:

```json
{
 "product_id":"PRD001",
 "event_type":"sale",
 "quantity":20,
 "timestamp":"2025-07-12T10:00:00Z"
}
```

---

# Local Setup

## Requirements

Install:

- Node.js
- PostgreSQL
- Apache Kafka

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```
DATABASE_URL=
JWT_SECRET=
KAFKA_BROKER=
```

Run backend:

```bash
npm run dev
```

Backend:

```
https://inventory-system-1-rt5b.onrender.com/
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```
VITE_API_URL=https://inventory-system-1-rt5b.onrender.com/api
```

Run frontend:

```bash
npm run dev
```

Frontend:

```
https://inventory-system-1-rt5b.onrender.com/api
```

---

# Producer Setup

Kafka producer sends inventory events.

Install dependencies:

```bash
npm install
```

Configure:

```
KAFKA_BROKER=
KAFKA_TOPIC=inventory-events
```

Run:

```bash
node producer.js
```

---

# Project Highlights

This project demonstrates:

- Event-driven architecture using Kafka
- FIFO inventory management
- PostgreSQL transactions
- Clean backend architecture
- JWT authentication
- Real-time dashboard updates

---

# Future Improvements

- WebSocket live updates
- Inventory alerts
- Product search and filters
- Charts and analytics
- Multiple user roles
- Report generation
- Cloud deployment

---

# Conclusion

This project demonstrates a complete real-time inventory management system.

Inventory events are processed through Kafka, FIFO logic calculates accurate product costs, PostgreSQL maintains inventory records, and the React dashboard provides real-time monitoring of stock and transactions.