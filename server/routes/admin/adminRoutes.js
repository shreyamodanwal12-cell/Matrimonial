import express from "express";

import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";

import {
  getMemberForAdmin,
  updateMember,
  getCastes,
  addCaste,
  getSubCastes,
  addSubCaste,
} from "../../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Admin dashboard API accessed successfully",
      user: req.user,
    });
  }
);

// Get single member for admin edit
router.get(
  "/members/:id",
  authMiddleware,
  adminMiddleware,
  getMemberForAdmin
);

// Update member
router.put(
  "/members/:id",
  authMiddleware,
  adminMiddleware,
  updateMember
);

// ==========================================
// CASTE MANAGEMENT
// ==========================================

// Get all castes
router.get(
  "/castes",
  authMiddleware,
  adminMiddleware,
  getCastes
);

// Add caste
router.post(
  "/castes",
  authMiddleware,
  adminMiddleware,
  addCaste
);

// Get sub-castes
router.get(
  "/sub-castes",
  authMiddleware,
  adminMiddleware,
  getSubCastes
);

// Add sub-caste
router.post(
  "/sub-castes",
  authMiddleware,
  adminMiddleware,
  addSubCaste
);

export default router;