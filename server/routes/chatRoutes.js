import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createConversation,
  getMyConversations,
  getMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();


// ======================================================
// CREATE / GET CONVERSATION
// ======================================================

router.post(
  "/conversation",
  authMiddleware,
  createConversation
);


// ======================================================
// GET MY CONVERSATIONS
// ======================================================

router.get(
  "/conversations",
  authMiddleware,
  getMyConversations
);


// ======================================================
// GET MESSAGES
// ======================================================

router.get(
  "/:conversationId/messages",
  authMiddleware,
  getMessages
);


// ======================================================
// SEND MESSAGE
// ======================================================

router.post(
  "/:conversationId/message",
  authMiddleware,
  sendMessage
);


export default router;