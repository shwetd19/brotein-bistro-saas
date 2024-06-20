import express from "express";
import {
  approveAndMoveToActive,
  getActiveSubscriptionById,
  updateActiveSubscription,
  deleteActiveSubscription,
  getAllActiveSubscriptions,
  recordMeal,
  getMealRecordsBySubscriptionId,
  getMealRecordsByUserId,
} from "../controllers/activeSubscription.controller.js";

const router = express.Router();

router.put("/approve/:id", approveAndMoveToActive);
router.get("/getAllActiveSubs", getAllActiveSubscriptions); // Endpoint for getting all active subscriptions
router.get("/:id", getActiveSubscriptionById); // Endpoint for GET operation
router.patch("/:id", updateActiveSubscription); // Assuming PATCH for partial updates
router.delete("/:id", deleteActiveSubscription); // Endpoint for DELETE operation
router.post("/recordMeal", recordMeal); // Endpoint for recording meal consumption
router.get("/:id/meals", getMealRecordsBySubscriptionId); // Endpoint for fetching meal records by subscription ID
router.get("/users/:userId/meals", getMealRecordsByUserId); // Endpoint for fetching meal records by user ID

export default router;
