import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  deleteSubscription // Import the deleteSubscription function
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/subscriptions", createSubscription);
router.get("/subscriptions", getAllSubscriptions);
router.get("/subscriptions/:id", getSubscriptionById);
router.delete("/subscriptions/:id", deleteSubscription); // Add this line

export default router;
