import express from "express";

import {
  getMyMembership,
} from "../controllers/membershipController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", authMiddleware, getMyMembership);

export default router;