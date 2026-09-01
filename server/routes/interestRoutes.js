import express from "express";

import {
  sendInterest,
  getMyInterests,
  getReceivedInterests,
   getSentInterests,
  acceptInterest,
  rejectInterest,
  getMatches,
getAllMatches,
getAllInterests,
} from "../controllers/interestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

// Send interest
router.post("/", authMiddleware, sendInterest);

// Get my interests
router.get("/my", authMiddleware, getMyInterests);

router.get("/sent", authMiddleware, getSentInterests);

router.get("/received", authMiddleware, getReceivedInterests);

// Accept interest
router.patch("/:id/accept", authMiddleware, acceptInterest);

// Reject interest
router.patch("/:id/reject", authMiddleware, rejectInterest);

// Get matches
router.get("/matches", authMiddleware, getMatches);


router.get(
  "/admin/matches",
  authMiddleware,
  adminMiddleware,
  getAllMatches
);

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllInterests
);

export default router;