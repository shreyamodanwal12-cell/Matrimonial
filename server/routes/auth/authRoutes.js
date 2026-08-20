import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
} from "../../controllers/authController.js";


import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.put("/profile", authMiddleware, updateProfile);

export default router;