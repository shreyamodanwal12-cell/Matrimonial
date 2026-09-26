import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function AdminChatPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ======================================================
  // GET ALL CONVERSATIONS
  // ======================================================
  const fetchConversations = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/chat/admin/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch conversations");
      }

      setConversations(data.conversations || []);
    } catch (error) {
      console.error("Admin chat fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // GET SELECTED CONVERSATION MESSAGES
  // ======================================================
  const fetchMessages = async (conversationId) => {
    try {
      setMessagesLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/chat/admin/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data.messages || []);
      console.log("ADMIN CHAT MESSAGES:", data.messages);
    } catch (error) {
      console.error("Admin messages fetch error:", error);
      setMessages([]);
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
  // SELECT CHAT
  // ======================================================
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
    fetchMessages(conversation.id);
  };

  const user1 = selectedConversation?.user1;
  const user2 = selectedConversation?.user2;

  return (
    <div className="min-h-screen bg-[#fffaf4] p-4 lg:p-6">

      {/* Header */}
      <div className="mb-5">
        <h1 className="font-serif text-[22px] font-semibold text-[#8c1d18]">
          User Chats
        </h1>

        <p className="mt-1 text-[11px] text-[#8b7565]">
          View conversations between registered members
        </p>
      </div>

      {/* Main Chat Area */}
      <div className="grid h-[calc(100vh-150px)] min-h-[550px] grid-cols-1 overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm lg:grid-cols-[320px_1fr]">

        {/* ==================================================
            CONVERSATION LIST
        ================================================== */}
       <div
  className={`border-r border-[#eadfce] bg-[#fffdf9] ${
    selectedConversation ? "hidden lg:block" : "block"
  }`}
>

          <div className="border-b border-[#eadfce] px-4 py-4">
            <p className="text-[12px] font-semibold text-[#563927]">
              Conversations
            </p>

            <p className="mt-1 text-[9px] text-[#a18b7b]">
              {conversations.length} total chats
            </p>
          </div>

          <div className="h-[calc(100%-70px)] overflow-y-auto">

            {loading ? (
              <div className="p-5 text-center text-[11px] text-[#9b8777]">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-5 text-center text-[11px] text-[#9b8777]">
                No conversations found.
              </div>
            ) : (
              conversations.map((conversation) => {

                const person1 = conversation.user1;
                const person2 = conversation.user2;

                const isSelected =
                  selectedConversation?.id === conversation.id;

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() =>
                      handleSelectConversation(conversation)
                    }
                    className={`w-full border-b border-[#f1e7db] px-4 py-4 text-left transition ${
                      isSelected
                        ? "bg-[#fff1e4]"
                        : "hover:bg-[#fff8f0]"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      {/* User 1 */}
                      <div className="flex -space-x-2">

                        <img
                          src={
                            person1?.profile_photo ||
                            "https://ui-avatars.com/api/?name=User"
                          }
                          alt=""
                          className="h-9 w-9 rounded-full border-2 border-white object-cover"
                        />

                        <img
                          src={
                            person2?.profile_photo ||
                            "https://ui-avatars.com/api/?name=User"
                          }
                          alt=""
                          className="h-9 w-9 rounded-full border-2 border-white object-cover"
                        />

                      </div>

                      {/* Names */}
                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[11px] font-semibold text-[#563927]">
                          {person1?.full_name || "User"} &{" "}
                          {person2?.full_name || "User"}
                        </p>

                        <p className="mt-1 truncate text-[9px] text-[#9b8777]">
                          {conversation.lastMessage?.message ||
                            (conversation.lastMessage?.image_url
                              ? "📷 Image"
                              : "No messages yet")}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })
            )}

          </div>
        </div>

        {/* ==================================================
            CHAT AREA
        ================================================== */}
        <div className="flex min-h-0 min-w-0 flex-col bg-[#fffaf5]">

          {!selectedConversation ? (
            <div className="flex flex-1 items-center justify-center">

              <div className="text-center">

                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0df] text-[28px]">
                  💬
                </div>

                <h2 className="font-serif text-[18px] font-semibold text-[#8c1d18]">
                  Select a Conversation
                </h2>

                <p className="mt-1 text-[10px] text-[#9b8777]">
                  Select a chat from the left to view messages
                </p>

              </div>

            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-[#eadfce] bg-white px-5 py-4">

  {/* Back Button - Mobile only */}
  <button
    type="button"
    onClick={() => {
      setSelectedConversation(null);
      setMessages([]);
    }}
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#eadfce] bg-[#fffaf4] text-[18px] text-[#8c1d18] lg:hidden"
    title="Back to conversations"
  >
    ←
  </button>

  {/* Both Users Profile Photos */}
  <div className="flex -space-x-2">
    <img
      src={
        user1?.profile_photo ||
        "https://ui-avatars.com/api/?name=User"
      }
      alt=""
      className="h-10 w-10 rounded-full border-2 border-white object-cover"
    />

    <img
      src={
        user2?.profile_photo ||
        "https://ui-avatars.com/api/?name=User"
      }
      alt=""
      className="h-10 w-10 rounded-full border-2 border-white object-cover"
    />
  </div>

  {/* Names */}
  <div className="min-w-0">
    <h2 className="truncate text-[13px] font-semibold text-[#563927]">
      {user1?.full_name || "User"} &{" "}
      {user2?.full_name || "User"}
    </h2>

    <p className="text-[9px] text-[#9b8777]">
      Conversation
    </p>
  </div>

</div>

              {/* Messages */}
              <div className="min-h-0 flex-1 overflow-y-auto p-5">

                {messagesLoading ? (
                  <div className="text-center text-[11px] text-[#9b8777]">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-[11px] text-[#9b8777]">
                    No messages in this conversation.
                  </div>
                ) : (
                  <div className="space-y-3">

                    {messages.map((message) => {

                      const isUser1 =
                        message.sender_id === user1?.id;
                       
                      const sender =
                        isUser1 ? user1 : user2;

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isUser1
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >

                          <div
                            className={`max-w-[75%] ${
                              isUser1
                                ? "items-start"
                                : "items-end"
                            } flex flex-col`}
                          >

                            <p className="mb-1 text-[8px] text-[#9b8777]">
                              {sender?.full_name || "User"}
                            </p>

                            <div
                              className={`rounded-2xl px-4 py-2.5 text-[11px] ${
                                isUser1
                                  ? "rounded-tl-sm bg-white text-[#563927] border border-[#eadfce]"
                                  : "rounded-tr-sm bg-[#8c1d18] text-white"
                              }`}
                            >

                              {message.deleted_for_everyone ? (
                                <span className="italic opacity-70">
                                  This message was deleted
                                </span>
                              ) : (
                                <>
                                  {message.message && (
                                    <p className="whitespace-pre-wrap break-words">
                                      {message.message}
                                    </p>
                                  )}

                                  {message.image_url && (
                                    <img
                                      src={message.image_url}
                                      alt="Chat"
                                      className="mt-2 max-h-60 max-w-full rounded-lg object-cover"
                                    />
                                  )}
                                </>
                              )}

                            </div>

                            <p className="mt-1 text-[8px] text-[#aa9686]">
                              {new Date(
                                message.created_at
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminChatPage;