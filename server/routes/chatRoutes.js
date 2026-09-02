import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createConversation,
  getMyConversations,
  getMessages,
  sendMessage,
  uploadChatImage,
  markMessageAsRead,
  deleteMessageForMe,
deleteMessageForEveryone,
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

router.patch(
  "/messages/:messageId/read",
  authMiddleware,
  markMessageAsRead
);
// ======================================================
// SEND MESSAGE
// ======================================================

router.post(
  "/:conversationId/message",
  authMiddleware,
  uploadChatImage,
  sendMessage
);

router.delete(
  "/messages/:messageId/me",
  authMiddleware,
  deleteMessageForMe
);

router.delete(
  "/messages/:messageId/everyone",
  authMiddleware,
  deleteMessageForEveryone
);
export default router;