import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function MyInterestsPage() {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyInterests();
  }, []);

  const fetchMyInterests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/interests/sent`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load your interests"
        );
      }

      setInterests(data.interests || []);
    } catch (error) {
      console.error("Fetch my interests error:", error);

      setError(
        error.message || "Unable to load your interests"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const normalizedStatus =
      String(status || "").toLowerCase();

    if (normalizedStatus === "accepted") {
      return "bg-green-100 text-green-700 border-green-200";
    }

    if (normalizedStatus === "rejected") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  };

  const getStatusText = (status) => {
    const normalizedStatus =
      String(status || "").toLowerCase();

    if (normalizedStatus === "accepted") {
      return "✓ Accepted";
    }

    if (normalizedStatus === "rejected") {
      return "✕ Rejected";
    }

    return "⏳ Pending";
  };

  const handleChat = async (interest) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const receiver =
        interest.receiver ||
        interest.recipient ||
        interest.to_user;

      const receiverId =
        receiver?.id ||
        interest.receiver_id ||
        interest.recipient_id;

      if (!receiverId) {
        alert("Unable to find receiver.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/chat/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            otherUserId: receiverId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to start conversation."
        );
        return;
      }

      window.location.href =
        `/chat/${data.conversation.id}`;
    } catch (error) {
      console.error("Start chat error:", error);

      alert(
        "Something went wrong while starting chat."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center">
        <p className="text-sm text-[#806653]">
          Loading your interests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#563927]">

      {/* HEADER */}
      <header className="border-b border-[#ead8bd] bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">

          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-[#a67c35]">
              Matrimonial
            </p>

            <h1 className="font-serif text-2xl font-semibold text-[#751b17]">
              My Interests
            </h1>
          </div>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-md border border-[#8c1d18] px-4 py-2 text-xs font-semibold text-[#8c1d18] hover:bg-[#fff5ed]"
          >
            ← Back
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1000px] px-4 py-8 sm:py-12">

        <div className="mb-6">
          <h2 className="font-serif text-3xl font-semibold text-[#751b17]">
            Interests Sent
          </h2>

          <p className="mt-1 text-sm text-[#806653]">
            Profiles to whom you have sent an interest request.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* INTERESTS */}
        {interests.length > 0 ? (
          <div className="space-y-4">

            {interests.map((interest) => {

              const receiver =
                interest.receiver ||
                interest.recipient ||
                interest.to_user;

              const receiverName =
                receiver?.full_name ||
                interest.receiver_name ||
                "Unknown User";

              const receiverPhoto =
                receiver?.profile_photo ||
                interest.receiver_photo ||
                null;

              const status =
                interest.status || "pending";

              const normalizedStatus =
                String(status).toLowerCase();

              const isAccepted =
                normalizedStatus === "accepted";

              return (
                <div
                  key={interest.id}
                  className="rounded-2xl border border-[#ead8bd] bg-white p-5 shadow-[0_5px_20px_rgba(73,38,20,0.06)]"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {/* PHOTO */}
                    <div className="shrink-0">

                      {receiverPhoto ? (
                        <img
                          src={receiverPhoto}
                          alt={receiverName}
                          className="h-24 w-24 rounded-full object-cover border-2 border-[#ead8bd]"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f3e6d4] font-serif text-3xl font-semibold text-[#8c1d18]">
                          {receiverName
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      <p className="text-[10px] uppercase tracking-[2px] text-[#a67c35]">
                        Interest Sent
                      </p>

                      <h3 className="mt-1 font-serif text-2xl font-semibold text-[#751b17]">
                        {receiverName}
                      </h3>

                      <p className="mt-2 text-sm text-[#806653]">
                        You have sent an interest request
                        to this profile.
                      </p>

                      <div className="mt-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            status
                          )}`}
                        >
                          {getStatusText(status)}
                        </span>
                      </div>

                    </div>

                    {/* ACTION */}
                    <div className="shrink-0">

                      {isAccepted ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleChat(interest)
                          }
                          className="w-full rounded-md bg-[#8c1d18] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#751712] sm:w-[130px]"
                        >
                          💬 Chat
                        </button>
                      ) : normalizedStatus ===
                        "rejected" ? (
                        <span className="text-xs text-[#806653]">
                          Request rejected
                        </span>
                      ) : (
                        <span className="text-xs text-[#806653]">
                          Waiting for response
                        </span>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        ) : (
          /* EMPTY */
          <div className="rounded-2xl border border-[#ead8bd] bg-white px-5 py-16 text-center shadow-[0_5px_20px_rgba(73,38,20,0.05)]">

            <div className="text-5xl">
              ❤️
            </div>

            <h3 className="mt-4 font-serif text-2xl font-semibold text-[#751b17]">
              No Interests Sent
            </h3>

            <p className="mt-2 text-sm text-[#806653]">
              You haven't sent any interest requests yet.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-6 rounded-md bg-[#8c1d18] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#751712]"
            >
              Browse Profiles
            </button>

          </div>
        )}

      </main>
    </div>
  );
}

export default MyInterestsPage;