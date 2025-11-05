import express from "express";

import dotenv from "dotenv";
import UserRoutes from "./Route/UserRoute.js";
import dbconnection from "./config/dbconnection.js";
import cors from "cors";

import cookieParser from "cookie-parser";
import EventRoutes from "./Route/EventRoute.js";
import ChatbotRouter from "./Route/ChatbotRoute.js";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.Client_Url,
    credentials: true,
  
   
  })
);
const allowedOrigins = [
  "http://localhost:3000",
  "https://ecomerce-store-plum.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin || allowedOrigins.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const port =process.env.PORT||  5000;
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/event", EventRoutes);
app.use("/api/v1/chatbot", ChatbotRouter);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("heelo   ....");
});
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
dbconnection();
