import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import taskRoutes from "./src/routes/tasks.routes.js";

import { GlobalErrorHandler } from "./src/utils/error-handling.js";

dotenv.config();
ConnectDB();

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//  Test Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Rabbit Task Manager API!");
});

//  Global Error Handler
app.use(GlobalErrorHandler);

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});