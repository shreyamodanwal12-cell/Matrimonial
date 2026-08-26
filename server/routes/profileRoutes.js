import express from "express";

import {
  getPublicProfile,
  getAllProfiles,
  uploadProfilePhoto,
  uploadCertificate,
  updateProfileStatus,
  updateMyMatrimonialProfile,
  updateMyFamilyDetails,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import membershipMiddleware from "../middleware/membershipMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ========================================
// GET ALL PROFILES
// ========================================

router.get(
  "/",
  authMiddleware,
  membershipMiddleware,
  getAllProfiles
);


// ========================================
// GET SINGLE PUBLIC PROFILE
// ========================================

router.get(
  "/:userId",
  authMiddleware,
  membershipMiddleware,
  getPublicProfile
);


// ========================================
// UPLOAD PROFILE PHOTO
// ========================================

router.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  uploadProfilePhoto
);


// ========================================
// UPLOAD CERTIFICATE
// ========================================

router.post(
  "/certificate",
  authMiddleware,
  upload.single("certificate"),
  uploadCertificate
);


// ========================================
// UPDATE PROFILE STATUS
// ========================================

router.patch(
  "/:id/status",
  authMiddleware,
  updateProfileStatus
);


// ========================================
// UPDATE MATRIMONIAL PROFILE
// ========================================

router.put(
  "/matrimonial",
  authMiddleware,
  updateMyMatrimonialProfile
);


// ========================================
// UPDATE FAMILY DETAILS
// ========================================

router.put(
  "/family",
  authMiddleware,
  updateMyFamilyDetails
);


export default router;