import express from "express";
import { approveAndMoveToActive } from "../controllers/activeSubscription.controller.js";

const router = express.Router();

router.put("/approve/:id", approveAndMoveToActive);

export default router;
