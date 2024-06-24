import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/give/feedback", createFeedback);
router.get("/readAll/feedback", getAllFeedback);
router.get("/read/feedback/:id", getFeedbackById);
router.put("/update/feedback/:id", updateFeedback);
router.delete("/delete/feedback/:id", deleteFeedback);

export default router;
