import express from "express";

import {
 registerUser,
loginUser,
getCurrentUser,
updateProfile,
updateEducationDetails,
checkMobileNumber,
} from "../../controllers/authController.js";


import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/check-mobile", checkMobileNumber);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.put("/profile", authMiddleware, updateProfile);

router.put(
  "/education",
  authMiddleware,
  updateEducationDetails
);

export default router;