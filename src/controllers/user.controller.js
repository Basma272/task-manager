import { asyncHandling } from "../utils/error-handling.js";
import { sucssesResponse } from "../utils/response-handling.js";
import { TaskModel } from "../models/tasks.model.js";
import { UserModel } from "../models/user.model.js";

//  Public content
export const allAccess = (req, res) => {
  return sucssesResponse({
    res,
    message: "🌍 Public Content – Available to everyone",
  });
};

//  User dashboard (gets user's tasks)
export const userBoard = asyncHandling(async (req, res) => {
  const tasks = await TaskModel.find({ idUser: req.user._id });

  return sucssesResponse({
    res,
    message: ` Welcome ${req.user.username} – here’s your dashboard`,
    data: {
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      taskCount: req.user.taskCount,
      tasks, // lowercase property for consistency
    },
  });
});

//  Update user profile
export const updateUser = asyncHandling(async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return sucssesResponse({
    res,
    message: "User updated successfully",
    data: user,
  });
});

//  Change user password
export const changePassword = asyncHandling(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  const { currentPassword, newPassword } = req.body;

  if (!user) throw new Error("User not found");

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    const err = new Error("Current password is incorrect");
    err.statusCode = 403;
    throw err;
  }

  user.password = newPassword;
  await user.save();

  return sucssesResponse({
    res,
    message: "Password changed successfully",
  });
});

//  Delete user and associated tasks
export const deleteUser = asyncHandling(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  await user.deleteOne(); // triggers cascade delete for tasks

  return sucssesResponse({
    res,
    message: "User and related tasks deleted successfully",
  });
});

//  Admin dashboard: all users with tasks
export const adminBoard = asyncHandling(async (req, res) => {
  const results = await UserModel.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "idUser",
        as: "tasks",
      },
    },
    {
      $project: {
        username: 1,
        email: 1,
        role: 1,
        taskCount: 1,
        tasks: {
          title: 1,
          status: 1,
          dueDate: 1,
        },
      },
    },
  ]);

  return sucssesResponse({
    res,
    message: "All users with their tasks",
    data: results,
  });
});