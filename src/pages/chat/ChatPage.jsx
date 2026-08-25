import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";
import frontendSupabase from "../../api/frontendSupabase";

function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
const [showMobileChat, setShowMobileChat] = useState(false);
  // ======================================================
  // GET MY CONVERSATIONS
  // ======================================================

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error("Fetch conversations error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // GET MESSAGES
  // ======================================================

  const fetchMessages = async (conversationId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
    }
  };
useEffect(() => {
  if (!selectedConversation) {
    return;
  }

  const channel = frontendSupabase
    .channel(`conversation-${selectedConversation.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${selectedConversation.id}`,
      },
      (payload) => {
        console.log("New message received:", payload.new);

        setMessages((previousMessages) => {
          const alreadyExists = previousMessages.some(
            (message) => message.id === payload.new.id
          );

          if (alreadyExists) {
            return previousMessages;
          }

          return [...previousMessages, payload.new];
        });
      }
    )
    .subscribe((status) => {
      console.log(
        `Realtime status for conversation ${selectedConversation.id}:`,
        status
      );
    });

  return () => {
    frontendSupabase.removeChannel(channel);
  };
}, [selectedConversation]);
  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat/${selectedConversation.id}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: messageText,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((previousMessages) => [
          ...previousMessages,
          data.data,
        ]);

        setMessageText("");
      }
    } catch (error) {
      console.error("Send message error:", error);
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

  const handleConversationClick = (conversation) => {
  setSelectedConversation(conversation);
  setShowMobileChat(true);
  fetchMessages(conversation.id);
};

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      {/* HEADER */}
      <header className="border-b border-[#ead8c8] bg-white px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">
            My Chats
          </h1>
        </div>
      </header>

      {/* CHAT AREA */}
      <main className="mx-auto flex h-[calc(100vh-81px)] max-w-7xl overflow-hidden bg-white">

        {/* ================= LEFT CHAT LIST ================= */}

        <aside
  className={`${
    showMobileChat ? "hidden" : "block"
  } w-full border-r border-[#ead8c8] md:block md:w-[330px]`}
>

          <div className="border-b border-[#ead8c8] p-4">
            <h2 className="font-semibold">
              Conversations
            </h2>
          </div>

          {loading ? (
            <div className="p-5 text-gray-500">
              Loading chats...
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-5 text-gray-500">
              No conversations yet.
            </div>
          ) : (
            <div>
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() =>
                    handleConversationClick(conversation)
                  }
                  className={`w-full border-b border-[#f0e2d6] p-4 text-left transition hover:bg-[#fff7ef] ${
                    selectedConversation?.id ===
                    conversation.id
                      ? "bg-[#fff3e5]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
  {conversation.otherUser?.profile_photo ? (
    <img
      src={conversation.otherUser.profile_photo}
      alt={conversation.otherUser.full_name}
      className="h-12 w-12 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ead8c8] text-lg font-semibold">
      {conversation.otherUser?.full_name
        ?.charAt(0)
        ?.toUpperCase()}
    </div>
  )}

  <div className="min-w-0">
    <div className="font-semibold">
      {conversation.otherUser?.full_name || "Unknown User"}
    </div>

    <div className="mt-1 truncate text-sm text-gray-500">
      Conversation started
    </div>
  </div>
</div>
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* ================= RIGHT CHAT WINDOW ================= */}

        <section
  className={`${
    showMobileChat ? "flex" : "hidden"
  } flex-1 flex-col md:flex`}
>

          {!selectedConversation ? (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          ) : (
            <>
              {/* CHAT HEADER */}

              <div className="border-b border-[#ead8c8] px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
  type="button"
  onClick={() => {
    setShowMobileChat(false);
    setSelectedConversation(null);
  }}
  className="mr-1 text-xl text-[#8b5e3c] md:hidden"
>
  ←
</button>
  {selectedConversation.otherUser?.profile_photo ? (
    <img
      src={selectedConversation.otherUser.profile_photo}
      alt={selectedConversation.otherUser.full_name}
      className="h-11 w-11 rounded-full object-cover"
    />
  ) : (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ead8c8] font-semibold">
      {selectedConversation.otherUser?.full_name
        ?.charAt(0)
        ?.toUpperCase()}
    </div>
  )}

  <div>
    <h2 className="font-semibold">
      {selectedConversation.otherUser?.full_name ||
        "Unknown User"}
    </h2>

    <p className="text-sm text-gray-500">
      Connected member
    </p>
  </div>
</div>
              </div>

              {/* MESSAGES */}

              <div className="flex-1 overflow-y-auto bg-[#fffaf4] p-5">

                {messages.length === 0 ? (
                  <div className="text-center text-gray-500">
                    No messages yet.
                  </div>
                ) : (
                  <div className="space-y-3">

                    {messages.map((msg) => {
                      const currentUser =
                        JSON.parse(
                          localStorage.getItem("user")
                        );

                      const isMine =
                        msg.sender_id === currentUser?.id;

                      return (
                        <div
                          key={msg.id}
                          className={`flex ${
                            isMine
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isMine
                                ? "bg-[#8b5e3c] text-white"
                                : "bg-white border border-[#ead8c8]"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      );
                    })}

                  </div>
                )}

              </div>

              {/* MESSAGE INPUT */}

              <div className="flex gap-3 border-t border-[#ead8c8] bg-white p-4">

                <input
                  type="text"
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-[#d8c2b2] px-5 py-3 outline-none focus:border-[#8b5e3c]"
                />

                <button
                  onClick={handleSendMessage}
                  className="rounded-full bg-[#8b5e3c] px-6 py-3 font-semibold text-white hover:bg-[#70482f]"
                >
                  Send
                </button>

              </div>
            </>
          )}

        </section>

      </main>
    </div>
  );
}

export default ChatPage;