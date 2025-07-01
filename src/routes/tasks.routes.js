import express from "express";
import { verifyToken } from "../middlewares/authJwt.js";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = express.Router();

// Task Routes (Protected)
router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getAllTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;