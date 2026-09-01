import crypto from "crypto";
import path from "path";
import multer from "multer";
import supabase from "../config/supabase.js";

// ======================================================
// MULTER CONFIGURATION
// ======================================================

const storage = multer.memoryStorage();

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        )
      );
    }

    cb(null, true);
  },
});

export const uploadChatImage = imageUpload.single("image");

// ======================================================
// CHECK ACCEPTED INTEREST
// ======================================================

const checkAcceptedInterest = async (
  userId,
  otherUserId
) => {
  const { data, error } = await supabase
    .from("interests")
    .select("id, sender_id, receiver_id, status")
    .eq("status", "accepted")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`
    )
    .limit(1);

  if (error) {
    console.error(
      "Check accepted interest error:",
      error
    );

    throw new Error(
      "Unable to verify accepted interest"
    );
  }

  return (data || []).length > 0;
};

// ======================================================
// CREATE / GET CONVERSATION
// ======================================================

export const createConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.body;

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: "Other user ID is required",
      });
    }

    if (userId === otherUserId) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot start a chat with yourself",
      });
    }

    // ==================================================
    // IMPORTANT:
    // CHAT ONLY AFTER INTEREST IS ACCEPTED
    // ==================================================

    const accepted = await checkAcceptedInterest(
      userId,
      otherUserId
    );

    if (!accepted) {
      return res.status(403).json({
        success: false,
        message:
          "Chat is available only after the interest request is accepted",
      });
    }

    // ==================================================
    // CHECK EXISTING CONVERSATION
    // ==================================================

    const {
      data: existingConversation,
      error: existingError,
    } = await supabase
      .from("conversations")
      .select("*")
      .or(
        `and(user1_id.eq.${userId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${userId})`
      )
      .maybeSingle();

    if (existingError) {
      console.error(
        "Check conversation error:",
        existingError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to check conversation",
      });
    }

    // ==================================================
    // EXISTING CONVERSATION
    // ==================================================

    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: "Conversation already exists",
        conversation: existingConversation,
      });
    }

    // ==================================================
    // CREATE NEW CONVERSATION
    // ==================================================

    const {
      data: conversation,
      error: createError,
    } = await supabase
      .from("conversations")
      .insert({
        user1_id: userId,
        user2_id: otherUserId,
      })
      .select()
      .single();

    if (createError) {
      console.error(
        "Create conversation error:",
        createError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to create conversation",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error(
      "Create conversation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message || "Internal server error",
    });
  }
};

// ======================================================
// GET MY CONVERSATIONS
// ======================================================

export const getMyConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // ==================================================
    // GET ONLY ACCEPTED INTERESTS
    // ==================================================

    const {
      data: acceptedInterests,
      error: interestsError,
    } = await supabase
      .from("interests")
      .select(
        "id, sender_id, receiver_id, status"
      )
      .eq("status", "accepted")
      .or(
        `sender_id.eq.${userId},receiver_id.eq.${userId}`
      );

    if (interestsError) {
      console.error(
        "Get accepted interests error:",
        interestsError
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to verify accepted interests",
      });
    }

    // ==================================================
    // CREATE SET OF USERS WITH ACCEPTED INTEREST
    // ==================================================

    const acceptedUserIds = new Set();

    (acceptedInterests || []).forEach((interest) => {
      if (interest.sender_id === userId) {
        acceptedUserIds.add(interest.receiver_id);
      }

      if (interest.receiver_id === userId) {
        acceptedUserIds.add(interest.sender_id);
      }
    });

    // ==================================================
    // GET CONVERSATIONS
    // ==================================================

    const {
      data: conversations,
      error,
    } = await supabase
      .from("conversations")
      .select(`
        id,
        user1_id,
        user2_id,
        created_at
      `)
      .or(
        `user1_id.eq.${userId},user2_id.eq.${userId}`
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Get conversations error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Unable to fetch conversations",
      });
    }

    // ==================================================
    // ONLY KEEP CONVERSATIONS WITH ACCEPTED USERS
    // ==================================================

    const allowedConversations =
      (conversations || []).filter((conversation) => {
        const otherUserId =
          conversation.user1_id === userId
            ? conversation.user2_id
            : conversation.user1_id;

        return acceptedUserIds.has(otherUserId);
      });

    // ==================================================
    // GET OTHER USER + LAST MESSAGE
    // ==================================================

    const formattedConversations =
      await Promise.all(
        allowedConversations.map(
          async (conversation) => {
            const otherUserId =
              conversation.user1_id === userId
                ? conversation.user2_id
                : conversation.user1_id;

            const {
              data: otherUser,
              error: userError,
            } = await supabase
              .from("users")
              .select(`
                id,
                full_name,
                profile_photo
              `)
              .eq("id", otherUserId)
              .single();

            if (userError) {
              console.error(
                "Get chat user error:",
                userError
              );
            }

            // ------------------------------------------
            // LAST MESSAGE
            // ------------------------------------------

            const {
              data: lastMessages,
              error: lastMessageError,
            } = await supabase
              .from("messages")
              .select(`
                id,
                message,
                image_url,
                sender_id,
                receiver_id,
                created_at,
                is_read
              `)
              .eq(
                "conversation_id",
                conversation.id
              )
              .order("created_at", {
                ascending: false,
              })
              .limit(1);

            if (lastMessageError) {
              console.error(
                "Get last message error:",
                lastMessageError
              );
            }

            const lastMessage =
              lastMessages?.[0] || null;

            return {
              id: conversation.id,
              created_at:
                conversation.created_at,

              otherUser:
                otherUser || {
                  id: otherUserId,
                  full_name: "Unknown User",
                  profile_photo: null,
                },

              lastMessage,
            };
          }
        )
      );

    return res.status(200).json({
      success: true,
      conversations:
        formattedConversations,
    });
  } catch (error) {
    console.error(
      "Get conversations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message || "Internal server error",
    });
  }
};

// ======================================================
// GET MESSAGES
// ======================================================

export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message:
          "Conversation ID is required",
      });
    }

    // ==================================================
    // CHECK CONVERSATION
    // ==================================================

    const {
      data: conversation,
      error: conversationError,
    } = await supabase
      .from("conversations")
      .select(
        "id, user1_id, user2_id"
      )
      .eq("id", conversationId)
      .maybeSingle();

    if (conversationError) {
      console.error(
        "Conversation check error:",
        conversationError
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to verify conversation",
      });
    }

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // ==================================================
    // CHECK USER IS PART OF CONVERSATION
    // ==================================================

    if (
      conversation.user1_id !== userId &&
      conversation.user2_id !== userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not part of this conversation",
      });
    }

    const otherUserId =
      conversation.user1_id === userId
        ? conversation.user2_id
        : conversation.user1_id;

    // ==================================================
    // ACCEPTED INTEREST SECURITY
    // ==================================================

    const accepted =
      await checkAcceptedInterest(
        userId,
        otherUserId
      );

    if (!accepted) {
      return res.status(403).json({
        success: false,
        message:
          "Chat is unavailable because the interest request is not accepted",
      });
    }

    // ==================================================
    // FETCH MESSAGES
    // ==================================================

    const {
      data: messages,
      error: messagesError,
    } = await supabase
      .from("messages")
      .select(`
        id,
        conversation_id,
        sender_id,
        receiver_id,
        message,
        image_url,
        is_read,
        created_at
      `)
      .eq(
        "conversation_id",
        conversationId
      )
      .order("created_at", {
        ascending: true,
      });

    if (messagesError) {
      console.error(
        "Get messages error:",
        messagesError
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to fetch messages",
      });
    }

    return res.status(200).json({
      success: true,
      messages: messages || [],
    });
  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message || "Internal server error",
    });
  }
};

// ======================================================
// SEND MESSAGE
// ======================================================

export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;

    const message =
      typeof req.body.message === "string"
        ? req.body.message.trim()
        : "";

    const imageFile = req.file;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message:
          "Conversation ID is required",
      });
    }

    // ==================================================
    // MESSAGE OR IMAGE REQUIRED
    // ==================================================

    if (!message && !imageFile) {
      return res.status(400).json({
        success: false,
        message:
          "Message or image is required",
      });
    }

    // ==================================================
    // CHECK CONVERSATION
    // ==================================================

    const {
      data: conversation,
      error: conversationError,
    } = await supabase
      .from("conversations")
      .select(
        "id, user1_id, user2_id"
      )
      .eq("id", conversationId)
      .maybeSingle();

    if (conversationError) {
      console.error(
        "Conversation check error:",
        conversationError
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to verify conversation",
      });
    }

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message:
          "Conversation not found",
      });
    }

    // ==================================================
    // USER MUST BELONG TO CONVERSATION
    // ==================================================

    if (
      conversation.user1_id !== userId &&
      conversation.user2_id !== userId
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not part of this conversation",
      });
    }

    const receiverId =
      conversation.user1_id === userId
        ? conversation.user2_id
        : conversation.user1_id;

    // ==================================================
    // ACCEPTED INTEREST SECURITY
    // ==================================================

    const accepted =
      await checkAcceptedInterest(
        userId,
        receiverId
      );

    if (!accepted) {
      return res.status(403).json({
        success: false,
        message:
          "You can chat only after the interest request is accepted",
      });
    }

    // ==================================================
    // UPLOAD IMAGE IF PROVIDED
    // ==================================================

    let imageUrl = null;
    let uploadedStoragePath = null;

    if (imageFile) {
      const extension =
        path.extname(
          imageFile.originalname
        ) ||
        (imageFile.mimetype ===
        "image/png"
          ? ".png"
          : ".jpg");

      uploadedStoragePath =
        `chat-images/${userId}/${crypto.randomUUID()}${extension}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("profile-photos")
        .upload(
          uploadedStoragePath,
          imageFile.buffer,
          {
            contentType:
              imageFile.mimetype,
            upsert: false,
          }
        );

      if (uploadError) {
        console.error(
          "Chat image upload error:",
          uploadError
        );

        return res.status(500).json({
          success: false,
          message:
            "Unable to upload chat image",
        });
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(
          uploadedStoragePath
        );

      imageUrl =
        publicUrlData?.publicUrl || null;
    }

    // ==================================================
    // INSERT MESSAGE
    // ==================================================

    const {
      data: newMessage,
      error: messageError,
    } = await supabase
      .from("messages")
      .insert({
        conversation_id:
          conversationId,
        sender_id: userId,
        receiver_id: receiverId,
        message: message || null,
        image_url: imageUrl,
        is_read: false,
      })
      .select()
      .single();

    if (messageError) {
      console.error(
        "Send message error:",
        messageError
      );

      // Remove uploaded image if database insert fails
      if (uploadedStoragePath) {
        await supabase.storage
          .from("profile-photos")
          .remove([
            uploadedStoragePath,
          ]);
      }

      return res.status(500).json({
        success: false,
        message:
          "Unable to send message",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(
      "Send message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
};