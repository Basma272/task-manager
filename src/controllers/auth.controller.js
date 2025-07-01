import { UserModel } from "../models/user.model.js";
import { asyncHandling } from "../utils/error-handling.js";
import { sucssesResponse } from "../utils/response-handling.js";
import { sendOtpEmail } from "../utils/sendOtpmail.js";
import { generateToken } from "../utils/generateToken.js";

// Helper function to generate 6-digit OTP
const generateOtp = () => `${Math.floor(100000 + Math.random() * 900000)}`;

//  Signup
export const signup = asyncHandling(async (req, res) => {
  const { username, email, password, phone, role } = req.body;

  const user = new UserModel({ username, email, password, phone, role });
  user.otp = generateOtp();
  user.otpExpires = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendOtpEmail(email, user.otp);

  return sucssesResponse({
    res,
    status: 201,
    message: "User registered! OTP sent to email.",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

//  Re-Send OTP if not confirmed
export const ReConfirmEmail = asyncHandling(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.isVerified)
    return sucssesResponse({ res, message: "Email already verified" });

  user.otp = generateOtp();
  user.otpExpires = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendOtpEmail(email, user.otp);

  return sucssesResponse({
    res,
    status: 201,
    message: "New OTP sent to your email",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

//  Confirm Email with OTP
export const ConfirmEmail = asyncHandling(async (req, res) => {
  const { email, otp } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.isVerified)
    return sucssesResponse({ res, message: "Email already verified" });

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    const err = new Error("Invalid or expired OTP");
    err.statusCode = 400;
    throw err;
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user);

  return sucssesResponse({
    res,
    message: "Email verified, you're logged in",
    data: {
      accessToken: token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    },
  });
});

//  Login
export const login = asyncHandling(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.isVerified) {
    const error = new Error("Please confirm your email");
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return sucssesResponse({
    res,
    message: "Signin successful",
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    },
  });
});