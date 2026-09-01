import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function InterestRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/interests/received`,
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
          data.message || "Failed to load interest requests"
        );
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error("Fetch interest requests error:", error);
      setError(
        error.message || "Unable to load interest requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (interestId) => {
    try {
      setProcessingId(interestId);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/interests/${interestId}/accept`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to accept interest"
        );
      }

      alert("Interest accepted successfully ❤️");

      // Remove accepted request from pending list
      setRequests((prev) =>
        prev.filter((request) => request.id !== interestId)
      );
    } catch (error) {
      console.error("Accept interest error:", error);
      alert(
        error.message || "Unable to accept interest"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (interestId) => {
    try {
      setProcessingId(interestId);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/interests/${interestId}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to reject interest"
        );
      }

      alert("Interest request rejected.");

      // Remove rejected request from pending list
      setRequests((prev) =>
        prev.filter((request) => request.id !== interestId)
      );
    } catch (error) {
      console.error("Reject interest error:", error);
      alert(
        error.message || "Unable to reject interest"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";

    const today = new Date();
    const birth = new Date(birthDate);

    let age =
      today.getFullYear() -
      birth.getFullYear();

    const monthDifference =
      today.getMonth() -
      birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center">
        <p className="text-sm text-[#806653]">
          Loading interest requests...
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
              Interest Requests
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
            Requests Received
          </h2>

          <p className="mt-1 text-sm text-[#806653]">
            People who have shown interest in your profile.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* REQUESTS */}
        {requests.length > 0 ? (
          <div className="space-y-4">

            {requests.map((request) => {
              const sender = request.sender;
              const matrimonial =
                sender?.matrimonial_profiles;

              const age = calculateAge(
                matrimonial?.birth_date
              );

              const isProcessing =
                processingId === request.id;

              return (
                <div
                  key={request.id}
                  className="rounded-2xl border border-[#ead8bd] bg-white p-5 shadow-[0_5px_20px_rgba(73,38,20,0.06)]"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                    {/* PROFILE PHOTO */}
                    <div className="shrink-0">

                      {sender?.profile_photo ? (
                        <img
                          src={sender.profile_photo}
                          alt={sender?.full_name || "Profile"}
                          className="h-24 w-24 rounded-full object-cover border-2 border-[#ead8bd]"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#f3e6d4] font-serif text-3xl font-semibold text-[#8c1d18]">
                          {(sender?.full_name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">

                      <p className="text-[10px] uppercase tracking-[2px] text-[#a67c35]">
                        Interest Request
                      </p>

                      <h3 className="mt-1 font-serif text-2xl font-semibold text-[#751b17]">
                        {sender?.full_name || "Unknown User"}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#806653]">

                        {age && (
                          <span>
                            {age} years
                          </span>
                        )}

                        {matrimonial?.gender && (
                          <span>
                            {matrimonial.gender}
                          </span>
                        )}

                        {matrimonial?.state && (
                          <span>
                            📍 {matrimonial.state}
                          </span>
                        )}

                        {matrimonial?.education && (
                          <span>
                            🎓 {matrimonial.education}
                          </span>
                        )}

                        {matrimonial?.profession && (
                          <span>
                            💼 {matrimonial.profession}
                          </span>
                        )}

                      </div>

                      <p className="mt-3 text-sm text-[#563927]">
                        <span className="font-semibold">
                          {sender?.full_name}
                        </span>{" "}
                        has sent you an interest request.
                      </p>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex shrink-0 flex-col gap-2 sm:w-[130px]">

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          handleAccept(request.id)
                        }
                        className="rounded-md bg-[#8c1d18] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#751712] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isProcessing
                          ? "Please wait..."
                          : "✓ Accept"}
                      </button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          handleReject(request.id)
                        }
                        className="rounded-md border border-[#8c1d18] px-4 py-2.5 text-xs font-semibold text-[#8c1d18] transition hover:bg-[#fff5ed] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isProcessing
                          ? "Please wait..."
                          : "✕ Reject"}
                      </button>

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
              💌
            </div>

            <h3 className="mt-4 font-serif text-2xl font-semibold text-[#751b17]">
              No Interest Requests
            </h3>

            <p className="mt-2 text-sm text-[#806653]">
              You don't have any pending interest requests.
            </p>

          </div>
        )}

      </main>
    </div>
  );
}

export default InterestRequestsPage;