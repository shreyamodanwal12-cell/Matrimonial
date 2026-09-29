import express from "express";

import {
  getMyMembership,
  activateFreeMembership,
} from "../controllers/membershipController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/my",
  authMiddleware,
  getMyMembership
);

router.post(
  "/free",
  authMiddleware,
  activateFreeMembership
);

export default router;