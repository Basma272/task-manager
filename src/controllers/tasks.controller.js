import { asyncHandling } from "../utils/error-handling.js";
import { TaskModel } from "../models/tasks.model.js";
import { sucssesResponse } from "../utils/response-handling.js";
import { UserModel } from "../models/user.model.js";

//  Create Task
export const createTask = asyncHandling(async (req, res) => {
  const { title, description, status, priority } = req.body;
  const idUser = req.user._id;

  // Check for duplicate task title for the same user
  const existingTask = await TaskModel.findOne({ title, idUser });
  if (existingTask) {
    const error = new Error("This task already exists for you.");
    error.statusCode = 400;
    throw error;
  }

  const task = await TaskModel.create({
    title,
    description,
    status,
    priority,
    idUser,
  });

  // Increment user's taskCount
  await UserModel.findByIdAndUpdate(idUser, {
    $inc: { taskCount: 1 },
  });

  return sucssesResponse({
    res,
    status: 201,
    message: "Task created successfully",
    data: task,
  });
});

//  Get All Tasks for Current User
export const getAllTasks = asyncHandling(async (req, res) => {
  const tasks = await TaskModel.find({ idUser: req.user._id });

  return sucssesResponse({
    res,
    message: "All your tasks retrieved successfully",
    data: tasks,
  });
});

//  Update Task by ID
export const updateTask = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const task = await TaskModel.findOneAndUpdate(
    { _id: id, idUser: req.user._id },
    req.body,
    { new: true }
  );

  if (!task) {
    const err = new Error("Task not found or unauthorized");
    err.statusCode = 404;
    throw err;
  }

  return sucssesResponse({
    res,
    message: "Task updated successfully",
    data: task,
  });
});

//  Delete Task by ID
export const deleteTask = asyncHandling(async (req, res) => {
  const { id } = req.params;

  const task = await TaskModel.findOneAndDelete({
    _id: id,
    idUser: req.user._id,
  });

  if (!task) {
    const err = new Error("Task not found or unauthorized");
    err.statusCode = 404;
    throw err;
  }

  return sucssesResponse({
    res,
    message: "Deleted this task successfully",
  });
});