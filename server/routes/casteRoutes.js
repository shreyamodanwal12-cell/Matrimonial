import express from "express";
import {
  getCastes,
  getSubCastes,
} from "../controllers/adminController.js";

const router = express.Router();

// Public - Get all castes
router.get("/castes", getCastes);

// Public - Get sub-castes by caste
router.get("/sub-castes", getSubCastes);

export default router;