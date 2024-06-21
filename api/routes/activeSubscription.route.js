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
  getCountOfActiveSubscriptions,
} from "../controllers/activeSubscription.controller.js";

const router = express.Router();

router.put("/approve/:id", approveAndMoveToActive);
// Endpoint for getting all active subscriptions
router.get("/getAllActiveSubs", getAllActiveSubscriptions);

// Endpoint for GET operation
router.get("/:id", getActiveSubscriptionById);

// Assuming PATCH for partial updates
router.patch("/:id", updateActiveSubscription);

// Endpoint for DELETE operation
router.delete("/:id", deleteActiveSubscription);

// Endpoint for recording meal consumption
router.post("/recordMeal", recordMeal); // Endpoint for recording meal consumption

// Endpoint for fetching meal records by subscription ID
router.get("/:id/meals", getMealRecordsBySubscriptionId);

// Endpoint for fetching meal records by user ID
router.get("/users/:userId/meals", getMealRecordsByUserId);

// New route for getting count of all active subscriptions
router.get("/getAllActiveSubs/count", getCountOfActiveSubscriptions);
export default router;
