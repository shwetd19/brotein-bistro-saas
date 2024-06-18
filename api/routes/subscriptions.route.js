import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
} from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/subscriptions", createSubscription);
router.get("/subscriptions", getAllSubscriptions);
router.get("/subscriptions/:id", getSubscriptionById);

export default router;
