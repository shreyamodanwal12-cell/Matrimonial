import { useEffect, useState, useRef } from "react";
import API_BASE_URL from "../../api/api";
import frontendSupabase from "../../api/frontendSupabase";

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

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [error, setError] = useState("");

  const [showMobileChat, setShowMobileChat] =
    useState(false);

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
  // SUPABASE REALTIME
  // ======================================================

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    const channel =
      frontendSupabase
        .channel(
          `conversation-${selectedConversation.id}`
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation.id}`,
          },
          (payload) => {
            console.log(
              "New message received:",
              payload.new
            );

            setMessages(
              (previousMessages) => {
                const alreadyExists =
                  previousMessages.some(
                    (message) =>
                      message.id ===
                      payload.new.id
                  );

                if (alreadyExists) {
                  return previousMessages;
                }

                return [
                  ...previousMessages,
                  payload.new,
                ];
              }
            );

            scrollToBottom();

            // Update conversation preview
            setConversations(
              (previousConversations) =>
                previousConversations.map(
                  (conversation) => {
                    if (
                      conversation.id ===
                      selectedConversation.id
                    ) {
                      return {
                        ...conversation,
                        lastMessage:
                          payload.new,
                      };
                    }

                    return conversation;
                  }
                )
            );
          }
        )
        .subscribe((status) => {
          console.log(
            `Realtime status for conversation ${selectedConversation.id}:`,
            status
          );
        });

    return () => {
      frontendSupabase.removeChannel(
        channel
      );
    };
  }, [selectedConversation]);

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
    fetchConversations();

  } catch (error) {
    console.error(
      "Send message error:",
      error
    );

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

                  const preview =
                    lastMessage?.image_url
                      ? lastMessage.message
                        ? `📷 ${lastMessage.message}`
                        : "📷 Photo"
                      : lastMessage?.message ||
                        "Conversation started";

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() =>
                        handleConversationClick(
                          conversation
                        )
                      }
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

                          <div className="mt-1 truncate text-sm text-gray-500">
                            {preview}
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
                      Connected member
                    </p>
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
                              className={`flex ${
                                isMine
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                            >

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
                                    src={
                                      msg.image_url
                                    }
                                    alt="Shared"
                                    className="mb-1 max-h-[320px] w-auto max-w-full rounded-xl object-cover"
                                  />
                                )}

                                {/* TEXT */}

                                {msg.message && (
                                  <p className="whitespace-pre-wrap break-words text-sm leading-5">
                                    {
                                      msg.message
                                    }
                                  </p>
                                )}

                                {/* TIME */}

                                <div
                                  className={`mt-1 text-right text-[10px] ${
                                    isMine
                                      ? "text-white/70"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {formatTime(
                                    msg.created_at
                                  )}
                                </div>

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

              <div className="border-t border-[#ead8c8] bg-white p-3 sm:p-4">

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
                    onChange={(event) =>
                      setMessageText(
                        event.target.value
                      )
                    }
                    onKeyDown={
                      handleKeyDown
                    }
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
    </div>
  );
}

export default ChatPage;