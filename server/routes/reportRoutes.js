import express from "express";

import {
  getAdminReports,
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


// Admin Reports
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  getAdminReports
);


export default router;