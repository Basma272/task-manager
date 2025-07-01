import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { asyncHandling } from "../utils/error-handling.js";

//  Verify JWT Token
export const verifyToken = asyncHandling(async (req, res, next) => {
  let token =
    req.headers["authorization"] || req.headers["x-access-token"];

  if (!token) {
    const error = new Error("No token provided");
    error.statusCode = 403;
    throw error;
  }

  // Remove "Bearer " if exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  req.user = user; // Attach user to request
  next();
});

//  Check Admin Role
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Require Admin Role");
    error.statusCode = 403;
    throw error;
  }

  next();
};