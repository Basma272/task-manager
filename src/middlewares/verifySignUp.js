import { UserModel } from "../models/user.model.js";
import { asyncHandling } from "../utils/error-handling.js";

// Checks if username or email already exists
export const checkDuplicateUsernameOrEmail = asyncHandling(async (req, res, next) => {
  const { username, email } = req.body;

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    let msg = "User already exists";

    if (existingUser.email === email) msg = "Email is already in use";
    else if (existingUser.username === username) msg = "Username is already taken";

    const error = new Error(msg);
    error.statusCode = 400;
    throw error;
  }

  next();
});