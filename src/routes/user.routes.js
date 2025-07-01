import express from "express";
import {
  allAccess,
  userBoard,
  updateUser,
  changePassword,
  adminBoard,
  deleteUser,
} from "../controllers/user.controller.js";

import { verifyToken, isAdmin } from "../middlewares/authJwt.js";
import { validate } from "../middlewares/validate.js";
import {
  updateUserVschema,
  changePasswordVschema,
} from "../validation/user.validation.js";

const router = express.Router();

//  Public Route - Accessible by anyone
router.get("/all", allAccess);

// Authenticated User Routes
router.get("/me", verifyToken, userBoard); // Get user info & tasks
router.put("/me", verifyToken, validate(updateUserVschema), updateUser); // Update profile
router.delete("/me", verifyToken, deleteUser)
router.put("/me/password", verifyToken, validate(changePasswordVschema), changePassword); // Change password

// Admin Route
router.get("/admin", verifyToken, isAdmin, adminBoard);

export default router;