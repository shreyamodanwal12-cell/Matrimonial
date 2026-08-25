import supabase from "../config/supabase.js";

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
        message: "You cannot start a chat with yourself",
      });
    }

    // Check whether conversation already exists
    const { data: existingConversation, error: existingError } =
      await supabase
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

    // If conversation already exists
    if (existingConversation) {
      return res.status(200).json({
        success: true,
        message: "Conversation already exists",
        conversation: existingConversation,
      });
    }

    // Create new conversation
    const { data: conversation, error: createError } =
      await supabase
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
    console.error("Create conversation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ======================================================
// GET MY CONVERSATIONS
// ======================================================

export const getMyConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: conversations, error } = await supabase
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
      .order("created_at", { ascending: false });

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

    // Get other user's details
    const formattedConversations = await Promise.all(
      (conversations || []).map(async (conversation) => {

        const otherUserId =
          conversation.user1_id === userId
            ? conversation.user2_id
            : conversation.user1_id;

        const { data: otherUser, error: userError } =
          await supabase
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

        return {
          id: conversation.id,
          created_at: conversation.created_at,

          otherUser: otherUser || {
            id: otherUserId,
            full_name: "Unknown User",
            profile_photo: null,
          },
        };
      })
    );

    return res.status(200).json({
      success: true,
      conversations: formattedConversations,
    });

  } catch (error) {

    console.error(
      "Get conversations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
        message: "Conversation ID is required",
      });
    }

    // Check that current user belongs to conversation
    const { data: conversation, error: conversationError } =
      await supabase
        .from("conversations")
        .select("id, user1_id, user2_id")
        .eq("id", conversationId)
        .maybeSingle();

    if (conversationError) {
      console.error(
        "Conversation check error:",
        conversationError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to verify conversation",
      });
    }

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    if (
      conversation.user1_id !== userId &&
      conversation.user2_id !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not part of this conversation",
      });
    }

    // Fetch messages
    const { data: messages, error: messagesError } =
      await supabase
        .from("messages")
        .select(`
          id,
          conversation_id,
          sender_id,
          receiver_id,
          message,
          is_read,
          created_at
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

    if (messagesError) {
      console.error(
        "Get messages error:",
        messagesError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to fetch messages",
      });
    }

    return res.status(200).json({
      success: true,
      messages: messages || [],
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
    const { message } = req.body;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // Check conversation
    const { data: conversation, error: conversationError } =
      await supabase
        .from("conversations")
        .select("id, user1_id, user2_id")
        .eq("id", conversationId)
        .maybeSingle();

    if (conversationError) {
      console.error(
        "Conversation check error:",
        conversationError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to verify conversation",
      });
    }

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Current user must belong to conversation
    if (
      conversation.user1_id !== userId &&
      conversation.user2_id !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not part of this conversation",
      });
    }

    // Determine receiver
    const receiverId =
      conversation.user1_id === userId
        ? conversation.user2_id
        : conversation.user1_id;

    // Insert message
    const { data: newMessage, error: messageError } =
      await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          receiver_id: receiverId,
          message: message.trim(),
          is_read: false,
        })
        .select()
        .single();

    if (messageError) {
      console.error(
        "Send message error:",
        messageError
      );

      return res.status(500).json({
        success: false,
        message: "Unable to send message",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};