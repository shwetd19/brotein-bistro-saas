// advertisement.route.js

import express from "express";
import {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  deleteAdvertisement,
  getLatestAdvertisement,
} from "../controllers/advertisement.controller.js";

const router = express.Router();

router.post("/advertisements", createAdvertisement);
router.get("/advertisements", getAllAdvertisements);
router.get("/advertisements/latest", getLatestAdvertisement);
router.get("/advertisements/:id", getAdvertisementById);
router.delete("/advertisements/:id", deleteAdvertisement);

export default router;
