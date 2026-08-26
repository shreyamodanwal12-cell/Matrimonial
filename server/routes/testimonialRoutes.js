import express from "express";

import {
  getApprovedTestimonials,
  createTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getApprovedTestimonials);

router.post("/", createTestimonial);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteTestimonial
);

export default router;