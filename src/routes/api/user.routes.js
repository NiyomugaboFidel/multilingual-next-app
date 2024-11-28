// src/routes/user.routes.js
import express from "express";
import {
  changePassword,
  createUser,
  deleteUser,
  editUserProfile,
  forgetPasswordToken,
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  resetPassword,
  verifyEmail,
} from "../../controllers/user.controller";
import { authMiddleware, checkRole } from "../../middlewares/authMiddleware";
import isAdmin from "../../middlewares/Admin.Middleware";
import validate from "../../middlewares/validationMiddleware";
import {
  UpdatedPasswordSchema,
  restPasswordSchema,
  signUpSchema,
  userProfileSchema,
} from "../../validation/validateSchemas";
import { authenticateJwt } from "../../middlewares/passport.Middleware";
import {
  assignUserRole,
  updateUserStatus,
} from "../../controllers/admin.controllers";
import isSeller from "../../middlewares/seller.Middleware";
import { createOtp, verifyOpt } from "../../controllers/2fa.controller";
import { editUserProfileValidation } from "../../validation/user.validation";

const router = express.Router();

// Public routes
router.post(
    "/create", 
    validate(signUpSchema), 
    createUser
); // Create a new user
router.post(
    "/login",
     loginUser);
     // User login

// Authenticated routes
router.put(
    "/edit-profile",
     authMiddleware, 
     editUserProfileValidation,
     editUserProfile
    ); 

router.put(
  "/update-password",
  validate(UpdatedPasswordSchema),
  authMiddleware,
  checkRole(["admin", "buyer"]),
  changePassword
); // Update user password

// Admin routes (require admin role)
router.put("/change-status/:id", authenticateJwt, isAdmin, updateUserStatus); // Change user status
router.put("/change-role/:id", authenticateJwt, isAdmin, assignUserRole); // Change user role

// Public routes for password management
router.post("/forget-password", forgetPasswordToken); // Request reset password token
router.put(
      "/reset-password",
     validate(restPasswordSchema), 
     resetPassword
    ); // Reset user password

// Admin routes (require admin role)
router.delete(
    "/delete-user/:id", 
    authMiddleware,
     isAdmin, 
     deleteUser
    ); // Delete a user

// Verification routes
router.get("/verify-email", verifyEmail); // Verify user email
router.get(
  "/generate-otp",
  authMiddleware,
  checkRole(["admin", "seller"]),
  createOtp
); // generate otp
router.get(
  "/dashboard",
  authMiddleware,
  checkRole(["admin", "seller"]),
  verifyOpt,
  (req, res) => {
    res.send("Dashboard, Welcame");
  }
); // Verify otp

// Admin routes (require admin role)
router.get("/all-users", authMiddleware,isAdmin, getAllUsers); // Get all users
router.get("/:id", authMiddleware,checkRole(['admin','seller', 'buyer']), getUser); // Get a user

// Logout route
router.post("/logout", authMiddleware, logoutUser); // Logout user

export default router;
