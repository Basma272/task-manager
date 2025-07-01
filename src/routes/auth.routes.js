import express from "express";
import {
  login,
  signup,
  ConfirmEmail,
  ReConfirmEmail,
} from "../controllers/auth.controller.js";

import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignUp.js";
import { validate } from "../middlewares/validate.js";

import {
  signupVschema,
  ConfirmEmailVschema,
  ReConfirmEmailVschema,
  loginVschema,
} from "../validation/user.validation.js";

const router = express.Router();

//  Auth Routes
router.post("/signup", checkDuplicateUsernameOrEmail, validate(signupVschema), signup);
router.post("/confirm-email", validate(ConfirmEmailVschema), ConfirmEmail);
router.post("/resend-otp", validate(ReConfirmEmailVschema), ReConfirmEmail);
router.post("/login", validate(loginVschema), login);

export default router;