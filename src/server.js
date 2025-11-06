// Dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnect } from "./config/database.js";
import customerRoutes from "./routes/customerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Config
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/payments", paymentRoutes);

// Connections
dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server connected on port:", PORT);
      console.log(`http://localhost:${PORT}/api/customers`);
      console.log(`http://localhost:${PORT}/api/services`);
      console.log(`http://localhost:${PORT}/api/orders`);
      console.log(`http://localhost:${PORT}/api/order-items`);
      console.log(`http://localhost:${PORT}/api/payments`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB. Server not started:", err);
  });
