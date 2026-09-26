import express from "express";

import {
  getPublicProfile,
  getAllProfiles,
  getFeaturedProfiles,
  uploadProfilePhoto,
  uploadCertificate,
  uploadAadharCard,
   uploadDocumentPhoto,
   checkAadharVerification,
  updateProfileStatus,
  updateAadharVerification,
  updateMyMatrimonialProfile,
  updateMyFamilyDetails,
   hideProfile,
   unhideProfile,
   getHiddenProfiles,
    reportProfile,
    getMyReports,
    getAllProfileReports,
    getMyNotificationCount,
    getMyNotifications,
   markProfileViewNotificationAsRead,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import membershipMiddleware from "../middleware/membershipMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ========================================
// GET ALL PROFILES
// ========================================


router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllProfiles
);
router.get(
  "/featured",
  authMiddleware,
  getFeaturedProfiles
);

// ========================================
// CHECK AADHAAR VERIFICATION
// ========================================

router.get(
  "/verification/aadhaar",
  authMiddleware,
  checkAadharVerification
);
// ========================================
// GET SINGLE PUBLIC PROFILE
// ========================================




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
// UPLOAD AADHAAR CARD
// ========================================

router.post(
  "/documents/aadhaar",
  authMiddleware,
  upload.single("aadhaarFile"),
  uploadAadharCard
);


router.post(
  "/documents/photo/:photoNumber",
  authMiddleware,
  upload.single("photo"),
  uploadDocumentPhoto
);
// ========================================
// UPDATE PROFILE STATUS
// ========================================

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateProfileStatus
);
// ========================================
// UPDATE AADHAAR VERIFICATION STATUS
// ========================================

router.patch(
  "/:id/aadhaar-verification",
  authMiddleware,
  adminMiddleware,
  updateAadharVerification
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
router.post(
  "/hide/:hiddenUserId",
  authMiddleware,
  hideProfile
);

router.delete(
  "/hide/:hiddenUserId",
  authMiddleware,
  unhideProfile
);
router.get("/hidden", authMiddleware, getHiddenProfiles);

router.post("/report/:reportedUserId", authMiddleware, reportProfile);
router.get("/reports", authMiddleware, getMyReports);
router.get(
  "/reports/admin",
  authMiddleware,
  adminMiddleware,
  getAllProfileReports
);
router.get(
  "/notifications/count",
  authMiddleware,
  getMyNotificationCount
);
router.get(
  "/notifications",
  authMiddleware,
  getMyNotifications
);
router.patch(
  "/notifications/:id/read",
  authMiddleware,
  markProfileViewNotificationAsRead
);
router.get("/:userId", authMiddleware, membershipMiddleware, getPublicProfile);
export default router;