import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import UserRoutes from "./Route/UserRoute.js";
import EventRoutes from "./Route/EventRoute.js";
import ChatbotRouter from "./Route/ChatbotRoute.js";
import dbconnection from "./config/dbconnection.js";

const app = express();
dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://ecomerce-store-plum.vercel.app"
];

// CORS setup
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/event", EventRoutes);
app.use("/api/v1/chatbot", ChatbotRouter);

// Static files
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => {
  res.send("Hello ....");
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Database connection
dbconnection();
