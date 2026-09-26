import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  createConversation,
  getMyConversations,
  getMessages,
  sendMessage,
  uploadChatImage,
  markMessageAsRead,
  deleteMessageForMe,
deleteMessageForEveryone,
getAllConversationsForAdmin,
getConversationMessagesForAdmin,
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
// ADMIN - GET ALL CONVERSATIONS
// ======================================================

router.get(
  "/admin/conversations",
  authMiddleware,
  adminMiddleware,
  getAllConversationsForAdmin
);

// ======================================================
// ADMIN - GET CONVERSATION MESSAGES
// ======================================================

router.get(
  "/admin/conversations/:conversationId/messages",
  authMiddleware,
  adminMiddleware,
  getConversationMessagesForAdmin
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