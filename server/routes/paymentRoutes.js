import express from "express";

import {
  createPayment,
  checkPaymentStatus,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPayment);

router.get(
  "/status/:orderId",
  authMiddleware,
  checkPaymentStatus
);

export default router;