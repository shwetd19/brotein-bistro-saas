// routes/event.routes.js
import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/createevent", createEvent);
router.get("/getAllevents", getAllEvents);
router.get("/events/:id", getEventById);
router.delete("/events/:id", deleteEvent);

export default router;
