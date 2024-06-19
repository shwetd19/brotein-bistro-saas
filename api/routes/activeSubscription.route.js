import express from "express";
import {
  approveAndMoveToActive,
  getActiveSubscriptionById,
  updateActiveSubscription,
  deleteActiveSubscription,
  getAllActiveSubscriptions,
} from "../controllers/activeSubscription.controller.js";

const router = express.Router();

router.put("/approve/:id", approveAndMoveToActive);
router.get("/getAllActiveSubs", getAllActiveSubscriptions); //Endpoint for getting all active subscriptions
router.get("/:id", getActiveSubscriptionById); // Endpoint for GET operation
router.patch("/:id", updateActiveSubscription); // Assuming PATCH for partial updates
router.delete("/:id", deleteActiveSubscription); // Endpoint for DELETE operation

export default router;
