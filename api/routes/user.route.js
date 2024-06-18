import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test); // Test route remains unchanged
router.post("/update/:id", verifyToken, updateUser); // Update route remains unchanged
router.delete("/delete/:id", verifyToken, deleteUser); // Delete route remains unchanged

// New routes
router.get("/allusers", verifyToken, isAdmin, getAllUsers); // Route to get all users
router.get("/:id", verifyToken, getUserById); // Route to get a single user by ID

export default router;
