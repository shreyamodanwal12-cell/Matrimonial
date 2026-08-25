import express from "express";
import { getPublicProfile } from "../controllers/profileController.js";

import {
  getAllProfiles,
  uploadProfilePhoto,
  uploadCertificate,
   updateProfileStatus,
    updateMyMatrimonialProfile,
    updateMyFamilyDetails,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:userId", getPublicProfile);
router.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  uploadProfilePhoto
);

router.post(
  "/certificate",
  authMiddleware,
  upload.single("certificate"),
  uploadCertificate
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateProfileStatus
);


router.put(
  "/matrimonial",
  authMiddleware,
  updateMyMatrimonialProfile
);

router.put(
  "/family",
  authMiddleware,
  updateMyFamilyDetails
);



export default router;
