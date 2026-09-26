import express from "express";

import {
  sendInterest,
  getMyInterests,
  getReceivedInterests,
   getSentInterests,
  acceptInterest,
  rejectInterest,
  sendMarriageFinalizationRequest,
  finalizeMatch,
  getMatches,
getAllMatches,
getAllInterests,
getMarriageFinalizationRequests,
approveMarriageFinalizationRequest,
rejectMarriageFinalizationRequest,
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

router.post(
  "/:id/marriage-request",
  authMiddleware,
  sendMarriageFinalizationRequest
);

router.patch(
  "/:id/finalize",
  authMiddleware,
  adminMiddleware,
  finalizeMatch
);
// Get matches
router.get("/matches", authMiddleware, getMatches);


router.get(
  "/admin/matches",
  authMiddleware,
  adminMiddleware,
  getAllMatches
);
router.get(
  "/admin/marriage-requests",
  authMiddleware,
  adminMiddleware,
  getMarriageFinalizationRequests
);
router.patch(
  "/admin/marriage-requests/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveMarriageFinalizationRequest
);
router.patch(
  "/admin/marriage-requests/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectMarriageFinalizationRequest
);
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAllInterests
);

export default router;