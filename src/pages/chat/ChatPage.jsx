import { useEffect, useState, useRef } from "react";
import API_BASE_URL from "../../api/api";
import frontendSupabase from "../../api/frontendSupabase";
import EmojiPicker from "emoji-picker-react";
function ChatPage() {
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState(null);

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] =
    useState(false);

  const [sending, setSending] = useState(false);
const [sendingConversations, setSendingConversations] = useState({});
  const [selectedImage, setSelectedImage] =
    useState(null);
const [onlineUsers, setOnlineUsers] = useState({});
const [typingUsers, setTypingUsers] = useState({});
const [seenMessages, setSeenMessages] = useState({});
  const [imagePreview, setImagePreview] =
    useState(null);

  const [error, setError] = useState("");

  const [showMobileChat, setShowMobileChat] =
    useState(false);
const [messageMenu, setMessageMenu] = useState(null);
const [showChatMenu, setShowChatMenu] = useState(false);
const [showReportModal, setShowReportModal] = useState(false);
const [reportReason, setReportReason] = useState("");
const [reportExplanation, setReportExplanation] = useState("");
const [reporting, setReporting] = useState(false);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // ======================================================
  // FORMAT TIME
  // ======================================================

  const formatTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDateSeparator = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const isSameDay = (date1, date2) =>
      date1.getFullYear() ===
        date2.getFullYear() &&
      date1.getMonth() ===
        date2.getMonth() &&
      date1.getDate() ===
        date2.getDate();

    if (isSameDay(date, today)) {
      return "Today";
    }

    if (isSameDay(date, yesterday)) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ======================================================
  // CHECK SAME DATE
  // ======================================================

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;

    const first = new Date(date1);
    const second = new Date(date2);

    return (
      first.getFullYear() ===
        second.getFullYear() &&
      first.getMonth() ===
        second.getMonth() &&
      first.getDate() ===
        second.getDate()
    );
  };

  // ======================================================
  // SCROLL TO BOTTOM
  // ======================================================

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // ======================================================
  // GET MY CONVERSATIONS
  // ======================================================

  const fetchConversations = async () => {
    try {
      if (!token) {
        window.location.href = "/login";
        return;
      }

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/chat/conversations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load conversations"
        );
      }

      setConversations(
        data.conversations || []
      );
    } catch (error) {
      console.error(
        "Fetch conversations error:",
        error
      );

      setError(
        error.message ||
          "Unable to load conversations"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // GET MESSAGES
  // ======================================================

  const fetchMessages = async (
    conversationId
  ) => {
    try {
      setMessagesLoading(true);
      setMessages([]);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/chat/${conversationId}/messages`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load messages"
        );
      }


      setMessages(data.messages || []);

console.log("All messages:", data.messages);
console.log("Current user:", currentUser?.id);

const unreadMessages = (data.messages || []).filter(
  (message) =>
    message.receiver_id === currentUser?.id &&
    !message.is_read
);

console.log("Unread messages:", unreadMessages);
unreadMessages.forEach(async (message) => {
  await fetch(
    `${API_BASE_URL}/api/chat/messages/${message.id}/read`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
});
      scrollToBottom();
    } catch (error) {
      console.error(
        "Fetch messages error:",
        error
      );

      setError(
        error.message ||
          "Unable to load messages"
      );
    } finally {
      setMessagesLoading(false);
    }
  };

  // ======================================================
  // INITIAL LOAD
  // ======================================================
// ======================================================
// ONLINE / OFFLINE STATUS
// ======================================================

useEffect(() => {
  if (!currentUser?.id) return;

  const channel = frontendSupabase.channel("chat-presence", {
    config: {
      presence: {
        key: currentUser.id,
      },
    },
  });

  const updateOnlineStatus = () => {
    const state = channel.presenceState();

    const online = {};

    Object.values(state).forEach((users) => {
      users.forEach((user) => {
        if (user.user_id) {
          online[user.user_id] = true;
        }
      });
    });

    setOnlineUsers(online);
  };

  channel
    .on("presence", { event: "sync" }, updateOnlineStatus)
    .on("presence", { event: "join" }, updateOnlineStatus)
    .on("presence", { event: "leave" }, updateOnlineStatus)
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          user_id: currentUser.id,
          online_at: new Date().toISOString(),
        });
      }
    });

  return () => {
    frontendSupabase.removeChannel(channel);
  };
}, [currentUser?.id]);

// ======================================================
// TYPING INDICATOR
// ======================================================

useEffect(() => {
  if (!selectedConversation?.id || !currentUser?.id) return;

  const channel = frontendSupabase.channel(
    `typing-${selectedConversation.id}`
  );

  channel
    .on(
      "broadcast",
      { event: "typing" },
      ({ payload }) => {
        if (payload.user_id === currentUser.id) return;

        setTypingUsers((previous) => ({
          ...previous,
          [payload.user_id]: payload.typing,
        }));

        if (payload.typing) {
          setTimeout(() => {
            setTypingUsers((previous) => ({
              ...previous,
              [payload.user_id]: false,
            }));
          }, 2000);
        }
      }
    )
    .subscribe();

  return () => {
    frontendSupabase.removeChannel(channel);
  };
}, [selectedConversation?.id, currentUser?.id]);


  useEffect(() => {
    fetchConversations();
  }, []);

  // ======================================================
  // SELECT CONVERSATION
  // ======================================================

  const handleConversationClick = (
    conversation
  ) => {
    setSelectedConversation(
      conversation
    );

    setShowMobileChat(true);

    fetchMessages(conversation.id);
  };


// ======================================================
// REALTIME CHAT LIST - NEW MESSAGE
// ======================================================

useEffect(() => {
  if (!currentUser?.id) return;

  const channel = frontendSupabase
    .channel(`chat-list-${currentUser.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        const newMessage = payload.new;

        console.log(
          "REALTIME NEW MESSAGE:",
          newMessage
        );

        // ------------------------------------------
        // Message sent by me
        // ------------------------------------------

        if (
          newMessage.sender_id === currentUser.id
        ) {
          setConversations((previousConversations) =>
            previousConversations
              .map((conversation) => {
                if (
                  conversation.id !==
                  newMessage.conversation_id
                ) {
                  return conversation;
                }

                return {
                  ...conversation,
                  lastMessage: newMessage,
                  unreadCount: 0,
                };
              })
              .sort((a, b) => {
                const dateA = new Date(
                  a.lastMessage?.created_at || 0
                );

                const dateB = new Date(
                  b.lastMessage?.created_at || 0
                );

                return dateB - dateA;
              })
          );

          return;
        }

        // ------------------------------------------
        // Message received from other user
        // ------------------------------------------

        if (
          newMessage.receiver_id === currentUser.id
        ) {
          setConversations((previousConversations) =>
            previousConversations
              .map((conversation) => {
                if (
                  conversation.id !==
                  newMessage.conversation_id
                ) {
                  return conversation;
                }

                // If this conversation is currently open,
                // don't show unread count.
                const isCurrentConversation =
                  selectedConversation?.id ===
                  newMessage.conversation_id;

                return {
                  ...conversation,
                  lastMessage: newMessage,
                  unreadCount: isCurrentConversation
                    ? 0
                    : (conversation.unreadCount || 0) + 1,
                };
              })
              .sort((a, b) => {
                const dateA = new Date(
                  a.lastMessage?.created_at || 0
                );

                const dateB = new Date(
                  b.lastMessage?.created_at || 0
                );

                return dateB - dateA;
              })
          );
        }
      }
    )
    .subscribe((status) => {
      console.log(
        "Chat list realtime status:",
        status
      );
    });

  return () => {
    frontendSupabase.removeChannel(channel);
  };
}, [currentUser?.id, selectedConversation?.id]);



  // ======================================================
  // SUPABASE REALTIME
  // ======================================================

useEffect(() => {
  if (!selectedConversation) {
    return;
  }

  const channel = frontendSupabase
    .channel(`conversation-test-${selectedConversation.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        console.log(
          "🔥 REALTIME EVENT RECEIVED:",
          payload
        );
      }
    )
    .subscribe((status) => {
      console.log(
        "🔥 TEST REALTIME STATUS:",
        status
      );
    });

  return () => {
    frontendSupabase.removeChannel(channel);
  };
}, [selectedConversation?.id]);
  // ======================================================
  // IMAGE SELECT
  // ======================================================

  const handleImageSelect = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }
 // Remove previous preview if any
  if (imagePreview) {
    URL.revokeObjectURL(imagePreview);
  }
    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ======================================================
  // REMOVE SELECTED IMAGE
  // ======================================================

  const removeSelectedImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

// ======================================================
// DELETE MESSAGE FOR ME
// ======================================================

const handleDeleteForMe = async (messageId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/chat/messages/${messageId}/me`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to delete message"
      );
    }

    // Remove message from my current chat immediately
    setMessages((previousMessages) =>
      previousMessages.filter(
        (message) => message.id !== messageId
      )
    );

    // Close menu
    setMessageMenu(null);

  } catch (error) {
    console.error(
      "Delete for me error:",
      error
    );

    alert(
      error.message ||
        "Unable to delete message"
    );
  }
};


// ======================================================
// DELETE MESSAGE FOR EVERYONE
// ======================================================

const handleDeleteForEveryone = async (messageId) => {
  try {
    const confirmDelete = window.confirm(
      "Delete this message for everyone?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/chat/messages/${messageId}/everyone`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to delete message for everyone"
      );
    }

    // Remove message from current chat immediately
    setMessages((previousMessages) =>
      previousMessages.filter(
        (message) => message.id !== messageId
      )
    );

    // Close menu
    setMessageMenu(null);

  } catch (error) {
    console.error(
      "Delete for everyone error:",
      error
    );

    alert(
      error.message ||
        "Unable to delete message for everyone"
    );
  }
};

const handleHideProfile = async () => {
  try {
    const hiddenUserId = selectedConversation?.otherUser?.id;

    if (!hiddenUserId) {
      alert("Profile not found");
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/profiles/hide/${hiddenUserId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to hide profile"
      );
    }

    // Menu close
    setShowChatMenu(false);

    // Current chat close
    setSelectedConversation(null);

    // Chat screen se bahar
    setShowMobileChat(false);

    // Chat list se profile immediately remove
    setConversations((previousConversations) =>
      previousConversations.filter(
        (conversation) =>
          conversation.otherUser?.id !== hiddenUserId
      )
    );

  } catch (error) {
    console.error("Hide profile error:", error);
    alert(error.message || "Unable to hide profile");
  }
};
const handleReportProfile = async () => {
  try {
    const reportedUserId = selectedConversation?.otherUser?.id;

    if (!reportedUserId) {
      alert("Profile not found");
      return;
    }

    if (!reportReason) {
      alert("Please select a reason");
      return;
    }

    setReporting(true);

    const response = await fetch(
      `${API_BASE_URL}/api/profiles/report/${reportedUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: reportReason,
          explanation: reportExplanation,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to submit report");
    }

    alert("Profile reported successfully");

    setReportReason("");
    setReportExplanation("");
    setShowReportModal(false);
  } catch (error) {
    console.error("Report profile error:", error);
    alert(error.message || "Unable to submit report");
  } finally {
    setReporting(false);
  }
};
  // ======================================================
  // SEND MESSAGE
  // ======================================================
const handleSendMessage = async () => {
  if (
    (!messageText.trim() && !selectedImage) ||
    !selectedConversation
  ) {
    return;
  }

  try {
  setSending(true);
  setError("");

  // Immediately show "Sending..." in conversation list
  setSendingConversations((previous) => ({
    ...previous,
    [selectedConversation.id]: true,
  }));

    const formData = new FormData();

    if (messageText.trim()) {
      formData.append(
        "message",
        messageText.trim()
      );
    }

    if (selectedImage) {
      formData.append(
        "image",
        selectedImage
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/chat/${selectedConversation.id}/message`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Failed to send message"
      );
    }

    // Add sent message immediately
    setMessages((previousMessages) => {
      const alreadyExists =
        previousMessages.some(
          (msg) =>
            msg.id === data.data.id
        );

      if (alreadyExists) {
        return previousMessages;
      }

      return [
        ...previousMessages,
        data.data,
      ];
    });

    // Clear text
    setMessageText("");
setShowEmojiPicker(false);
    // Clear selected image
    setSelectedImage(null);

    // IMPORTANT:
    // Remove image preview after successful send
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);

    // Clear actual file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    scrollToBottom();

    // Refresh conversation preview
    // Update conversation preview immediately
setConversations((previousConversations) =>
  previousConversations
    .map((conversation) => {
      if (conversation.id !== selectedConversation.id) {
        return conversation;
      }

      return {
        ...conversation,
        lastMessage: data.data,
        unreadCount: 0,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(
        a.lastMessage?.created_at || 0
      );

      const dateB = new Date(
        b.lastMessage?.created_at || 0
      );

      return dateB - dateA;
    })
);

// Sending completed
setSendingConversations((previous) => ({
  ...previous,
  [selectedConversation.id]: false,
}));

  } catch (error) {
    console.error(
      "Send message error:",
      error
    );
setSendingConversations((previous) => ({
    ...previous,
    [selectedConversation?.id]: false,
  }));
    alert(
      error.message ||
        "Unable to send message"
    );
  } finally {
    setSending(false);
  }
};

  // ======================================================
  // ENTER KEY
  // ======================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSendMessage();
    }
  };

  // ======================================================
  // BACK ON MOBILE
  // ======================================================

  const handleMobileBack = () => {
    setShowMobileChat(false);
    setSelectedConversation(null);
    setMessages([]);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-[#ead8c8] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-[#a67c35]">
              Matrimonial
            </p>

            <h1 className="font-serif text-2xl font-bold text-[#751b17]">
              My Chats
            </h1>
          </div>

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/")
            }
            className="rounded-md border border-[#8b5e3c] px-4 py-2 text-xs font-semibold text-[#8b5e3c] hover:bg-[#fff5ed]"
          >
            Home
          </button>
        </div>
      </header>

      {/* =================================================
          CHAT AREA
      ================================================= */}

      <main className="mx-auto flex h-[calc(100vh-90px)] max-w-7xl overflow-hidden bg-white">

        {/* =================================================
            LEFT CONVERSATION LIST
        ================================================= */}

        <aside
          className={`${
            showMobileChat
              ? "hidden"
              : "block"
          } w-full border-r border-[#ead8c8] md:block md:w-[340px]`}
        >

          <div className="border-b border-[#ead8c8] p-4">
            <h2 className="font-semibold text-[#563927]">
              Conversations
            </h2>
          </div>

          {loading ? (
            <div className="p-5 text-sm text-gray-500">
              Loading chats...
            </div>
          ) : conversations.length ===
            0 ? (
            <div className="p-8 text-center">

              <div className="text-5xl">
                💬
              </div>

              <h3 className="mt-4 font-serif text-xl font-semibold text-[#751b17]">
                No Chats Yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Chat will become available
                after an interest request
                is accepted.
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto">
              {conversations.map(
                (conversation) => {
                 const lastMessage =
  conversation.lastMessage;

const isLastMessageMine =
  lastMessage?.sender_id === currentUser?.id;

const isSending =
  sendingConversations[conversation.id];

let preview = "Conversation started";

if (isSending) {
  preview = "Sending...";
} else if (lastMessage) {
  // My last message
  if (isLastMessageMine) {
    if (lastMessage.is_read) {
      preview = "Seen";
    } else {
      preview = "Sent";
    }
  }

  // Other person's last message
  else {
    if (lastMessage.image_url) {
      preview = lastMessage.message
        ? `📷 ${lastMessage.message}`
        : "📷 Photo";
    } else {
      preview =
        lastMessage.message ||
        "Conversation started";
    }
  }
}

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => {
  handleConversationClick(conversation);

  setConversations((previousConversations) =>
    previousConversations.map((item) =>
      item.id === conversation.id
        ? {
            ...item,
            unreadCount: 0,
          }
        : item
    )
  );
}}
                      className={`w-full border-b border-[#f0e2d6] p-4 text-left transition hover:bg-[#fff7ef] ${
                        selectedConversation?.id ===
                        conversation.id
                          ? "bg-[#fff3e5]"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">

                        {/* PHOTO */}

                        {conversation
                          .otherUser
                          ?.profile_photo ? (
                          <img
                            src={
                              conversation
                                .otherUser
                                .profile_photo
                            }
                            alt={
                              conversation
                                .otherUser
                                .full_name
                            }
                            className="h-12 w-12 shrink-0 rounded-full border border-[#ead8c8] object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ead8c8] text-lg font-semibold text-[#8b5e3c]">
                            {conversation
                              .otherUser
                              ?.full_name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        )}

                        {/* DETAILS */}

                        <div className="min-w-0 flex-1">

                          <div className="flex items-center justify-between gap-2">
                            <div className="truncate font-semibold text-[#563927]">
                              {conversation
                                .otherUser
                                ?.full_name ||
                                "Unknown User"}
                            </div>

                            {lastMessage && (
                              <span className="shrink-0 text-[10px] text-gray-400">
                                {formatTime(
                                  lastMessage.created_at
                                )}
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex items-center gap-2">
  <div
    className={`min-w-0 flex-1 truncate text-sm ${
      conversation.unreadCount > 0
        ? "font-semibold text-[#563927]"
        : "text-gray-500"
    }`}
  >
    {conversation.unreadCount > 0
      ? `${conversation.unreadCount} new ${
          conversation.unreadCount === 1
            ? "message"
            : "messages"
        }`
      : preview}
  </div>

  {conversation.unreadCount > 0 && (
    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
  )}
</div>

                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          )}
        </aside>

        {/* =================================================
            RIGHT CHAT
        ================================================= */}

        <section
          className={`${
            showMobileChat
              ? "flex"
              : "hidden"
          } min-w-0 flex-1 flex-col md:flex`}
        >

          {!selectedConversation ? (
            <div className="flex flex-1 items-center justify-center text-center text-gray-500">
              <div>
                <div className="text-6xl">
                  💬
                </div>

                <p className="mt-4">
                  Select a conversation
                  to start chatting
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* =================================================
                  CHAT HEADER
              ================================================= */}

              <div className="border-b border-[#ead8c8] bg-white px-4 py-3">
                <div className="flex items-center gap-3">

                  {/* MOBILE BACK */}

                  <button
                    type="button"
                    onClick={
                      handleMobileBack
                    }
                    className="mr-1 text-xl text-[#8b5e3c] md:hidden"
                  >
                    ←
                  </button>

                  {/* PROFILE PHOTO */}

                  {selectedConversation
                    .otherUser
                    ?.profile_photo ? (
                    <img
                      src={
                        selectedConversation
                          .otherUser
                          .profile_photo
                      }
                      alt={
                        selectedConversation
                          .otherUser
                          .full_name
                      }
                      className="h-11 w-11 rounded-full border border-[#ead8c8] object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ead8c8] font-semibold text-[#8b5e3c]">
                      {selectedConversation
                        .otherUser
                        ?.full_name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold text-[#563927]">
                      {selectedConversation
                        .otherUser
                        ?.full_name ||
                        "Unknown User"}
                    </h2>

                    <p className="text-xs text-gray-500">
                     {selectedConversation?.otherUser?.id &&
  onlineUsers[selectedConversation.otherUser.id] ? (
    <span className="text-[11px] text-green-500">
      ● Online
    </span>
  ) : (
    <span className="text-[11px] text-gray-400">
      ● Offline
    </span>
  )}
  {selectedConversation?.otherUser?.id &&
  typingUsers[selectedConversation.otherUser.id] && (
    <span className="text-[11px] text-[#8b5e3c]">
      Typing...
    </span>
  )}
                    </p>
                  </div>
<div className="relative">
  <button
    type="button"
    onClick={() =>
      setShowChatMenu((previous) => !previous)
    }
    className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-[#563927] hover:bg-[#fff5ed]"
    title="More"
  >
    ⋮
  </button>

  {showChatMenu && (
    <div className="absolute right-0 top-11 z-50 w-52 rounded-xl border border-[#ead8c8] bg-white py-2 shadow-lg">

      

      <button
  type="button"
  onClick={handleHideProfile}
  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#563927] hover:bg-[#fff5ed]"
>
  👁️ Hide Profile
</button>

     

      <button
        type="button"
        onClick={() => {
          setShowChatMenu(false);
          setShowReportModal(true);
        }}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
      >
        🚩 Report Profile
      </button>

    </div>
  )}
</div>
                </div>
              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* =================================================
                  MESSAGES
              ================================================= */}

              <div className="flex-1 overflow-y-auto bg-[#fffaf4] p-4 sm:p-5">

                {messagesLoading ? (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Loading messages...
                  </div>
                ) : messages.length ===
                  0 ? (
                  <div className="flex h-full items-center justify-center text-center text-gray-500">
                    <div>
                      <div className="text-5xl">
                        ❤️
                      </div>

                      <p className="mt-3 text-sm">
                        Start your conversation
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">

                    {messages.map(
                      (msg, index) => {
                        const isMine =
                          msg.sender_id ===
                          currentUser?.id;

                        const previousMessage =
                          messages[index - 1];

                        const showDate =
                          !previousMessage ||
                          !isSameDate(
                            previousMessage.created_at,
                            msg.created_at
                          );

                        return (
                          <div
                            key={msg.id}
                          >

                            {/* DATE SEPARATOR */}

                            {showDate && (
                              <div className="my-5 flex justify-center">
                                <span className="rounded-full bg-[#ead8c8] px-4 py-1 text-[11px] font-medium text-[#70482f]">
                                  {formatDateSeparator(
                                    msg.created_at
                                  )}
                                </span>
                              </div>
                            )}

                           {/* MESSAGE */}

<div
  className={`flex items-end gap-2 ${
    isMine
      ? "justify-end"
      : "justify-start"
  }`}
>

  {/* OTHER USER PROFILE PHOTO */}

  {!isMine && (
    <>
      {selectedConversation?.otherUser?.profile_photo ? (
        <img
          src={
            selectedConversation.otherUser.profile_photo
          }
          alt={
            selectedConversation.otherUser.full_name
          }
          className="h-7 w-7 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ead8c8] text-[10px] font-semibold text-[#8b5e3c]">
          {selectedConversation?.otherUser?.full_name
            ?.charAt(0)
            ?.toUpperCase()}
        </div>
      )}
    </>
  )}

  {/* MESSAGE + MENU */}

  <div className="group relative flex items-start gap-1">

    {/* 3 DOT MENU */}

    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();

        setMessageMenu(
          messageMenu === msg.id
            ? null
            : msg.id
        );
      }}
      className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600"
      title="Message options"
    >
      ⋯
    </button>

    {/* MESSAGE BUBBLE */}

    <div
      className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm sm:max-w-[65%] ${
        isMine
          ? "rounded-br-md bg-[#8b5e3c] text-white"
          : "rounded-bl-md border border-[#ead8c8] bg-white text-[#3c2415]"
      }`}
    >

      {/* IMAGE */}

      {msg.image_url && (
        <img
          src={msg.image_url}
          alt="Shared"
          className="mb-1 max-h-[320px] w-auto max-w-full rounded-xl object-cover"
        />
      )}

      {/* TEXT */}

      {msg.message && (
        <p className="whitespace-pre-wrap break-words text-sm leading-5">
          {msg.message}
        </p>
      )}

      {/* TIME + SENT / SEEN */}

      <div
        className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
          isMine
            ? "text-white/70"
            : "text-gray-400"
        }`}
      >
        <span>
          {formatTime(msg.created_at)}
        </span>

        {isMine && (
          <span
            className={
              msg.is_read
                ? "font-medium"
                : ""
            }
          >
            {msg.is_read ? "✓✓" : "✓"}
          </span>
        )}
      </div>

    </div>

    {/* MESSAGE OPTIONS MENU */}

    {messageMenu === msg.id && (
      <div
        className={`absolute top-0 z-[100] w-44 rounded-lg border border-[#ead8c8] bg-white py-1 shadow-lg ${
          isMine
            ? "right-full mr-2"
            : "left-full ml-2"
        }`}
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          onClick={() =>
            handleDeleteForMe(msg.id)
          }
          className="block w-full px-4 py-2.5 text-left text-xs text-[#563927] hover:bg-[#fff7ef]"
        >
          🗑️ Delete for me
        </button>

        {isMine && (
          <button
            type="button"
            onClick={() =>
              handleDeleteForEveryone(msg.id)
            }
            className="block w-full px-4 py-2.5 text-left text-xs text-red-500 hover:bg-red-50"
          >
            🗑️ Delete for everyone
          </button>
        )}

      </div>
    )}

  </div>

</div>
                          </div>

                        );
                      }
                    )}

                    <div
                      ref={
                        messagesEndRef
                      }
                    />

                  </div>
                )}
              </div>

              {/* =================================================
                  IMAGE PREVIEW
              ================================================= */}

              {imagePreview && (
                <div className="border-t border-[#ead8c8] bg-white px-4 pt-3">

                  <div className="relative inline-block">

                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="h-24 w-24 rounded-xl border border-[#ead8c8] object-cover"
                    />

                    <button
                      type="button"
                      onClick={
                        removeSelectedImage
                      }
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8c1d18] text-xs text-white"
                    >
                      ✕
                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  MESSAGE INPUT
              ================================================= */}

             <div className="relative border-t border-[#ead8c8] bg-white p-3 sm:p-4">

                <div className="flex items-end gap-2">

                  {/* IMAGE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={sending}
                    title="Send image"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d8c2b2] text-xl text-[#8b5e3c] transition hover:bg-[#fff5ed] disabled:opacity-50"
                  >
                    📷
                  </button>
{/* EMOJI BUTTON */}
<button
  type="button"
  onClick={() => setShowEmojiPicker((previous) => !previous)}
  disabled={sending}
  title="Add emoji"
  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d8c2b2] text-xl transition hover:bg-[#fff5ed] disabled:opacity-50"
>
  😊
</button>
{showEmojiPicker && (
  <div className="absolute bottom-16 left-3 z-50">
    <EmojiPicker
      onEmojiClick={(emojiObject) => {
        setMessageText((previous) => previous + emojiObject.emoji);
      }}
    />
  </div>
)}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={
                      handleImageSelect
                    }
                    className="hidden"
                  />

                  {/* TEXT */}

                  <textarea
  value={messageText}
  onChange={(event) => {
    const value = event.target.value;

    setMessageText(value);

    if (!selectedConversation?.id) return;

    const channel = frontendSupabase.channel(
      `typing-${selectedConversation.id}`
    );

    channel.send({
      type: "broadcast",
      event: "typing",
      payload: {
        user_id: currentUser.id,
        typing: value.length > 0,
      },
    });
  }}
  onKeyDown={handleKeyDown}
  rows={1}
  placeholder="Type a message..."
  disabled={sending}
  className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-[#d8c2b2] px-4 py-3 text-sm outline-none focus:border-[#8b5e3c] disabled:bg-gray-50"
/>

                  {/* SEND */}

                  <button
                    type="button"
                    onClick={
                      handleSendMessage
                    }
                    disabled={
                      sending ||
                      (!messageText.trim() &&
                        !selectedImage)
                    }
                    className="h-11 shrink-0 rounded-full bg-[#8b5e3c] px-5 text-sm font-semibold text-white transition hover:bg-[#70482f] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending
                      ? "..."
                      : "Send"}
                  </button>

                </div>

                <p className="mt-2 text-center text-[10px] text-gray-400">
                  Images up to 5 MB • JPG,
                  PNG or WEBP
                </p>

              </div>
            </>
          )}
        </section>
      </main>
      {showReportModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#563927]">
          🚩 Report Profile
        </h2>

        <button
          onClick={() => {
            setShowReportModal(false);
            setReportReason("");
            setReportExplanation("");
          }}
          className="text-xl text-gray-500"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        Please tell us why you are reporting this profile.
      </p>

      <select
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
        className="w-full h-10 rounded-lg border border-[#e5d5c5] px-3 text-sm outline-none"
      >
        <option value="">Select a reason</option>
        <option value="Fake Profile">Fake Profile</option>
        <option value="Inappropriate Behaviour">
          Inappropriate Behaviour
        </option>
        <option value="Harassment">Harassment</option>
        <option value="Fraud or Scam">Fraud or Scam</option>
        <option value="Wrong Information">Wrong Information</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        value={reportExplanation}
        onChange={(e) => setReportExplanation(e.target.value)}
        placeholder="Explain the issue (optional)"
        rows={4}
        className="w-full mt-3 rounded-lg border border-[#e5d5c5] px-3 py-2 text-sm outline-none resize-none"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => {
            setShowReportModal(false);
            setReportReason("");
            setReportExplanation("");
          }}
          className="px-4 py-2 rounded-lg border border-[#e5d5c5] text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleReportProfile}
          disabled={reporting}
          className="px-4 py-2 rounded-lg bg-[#d9272e] text-white text-sm"
        >
          {reporting ? "Submitting..." : "Submit Report"}
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default ChatPage;