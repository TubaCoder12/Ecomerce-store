import express from "express";

import dotenv from "dotenv";
import UserRoutes from "./Route/UserRoute.js";
import dbconnection from "./config/dbconnection.js";
import cors from "cors";
import ProductRoutes from "./Route/ProductRoute.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = 4000;
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("heelo   ....");
});
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
dbconnection();
