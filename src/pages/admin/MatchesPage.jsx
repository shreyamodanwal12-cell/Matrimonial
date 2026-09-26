import { useEffect, useMemo, useState } from "react";

function MatchesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedMatch, setSelectedMatch] = useState(null);
const [finalizingMatch, setFinalizingMatch] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

 // ============================
// FETCH MARRIAGE REQUESTS
// ============================
useEffect(() => {
  const fetchMarriageRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login token not found.");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/interests/admin/marriage-requests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch marriage requests"
        );
      }

      setMatches(data.requests || []);
    } catch (err) {
      console.error("Fetch marriage requests error:", err);
      setError(err.message || "Failed to load marriage requests");
    } finally {
      setLoading(false);
    }
  };

  fetchMarriageRequests();
}, [API_BASE_URL]);
// ============================
// FINALIZE MARRIAGE
// ============================
const finalizeMarriage = async (matchId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Admin login token not found.");
    }

    setFinalizingMatch(true);

    const response = await fetch(
      `${API_BASE_URL}/api/interests/${matchId}/finalize`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to finalize marriage"
      );
    }

    alert("Marriage finalized successfully.");

    // Modal close
    setSelectedMatch(null);

    // Match list refresh
    setMatches((prev) =>
      prev.filter((match) => match.id !== matchId)
    );
  } catch (err) {
    console.error("Finalize marriage error:", err);

    alert(
      err.message || "Failed to finalize marriage"
    );
  } finally {
    setFinalizingMatch(false);
  }
};
const approveMarriageRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Admin login token not found.");
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/interests/admin/marriage-requests/${requestId}/approve`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to approve marriage request"
      );
    }

    alert("Marriage finalized successfully.");

    setSelectedMatch(null);

    // List refresh
    window.location.reload();
  } catch (error) {
    console.error("Approve marriage request error:", error);
    alert(error.message || "Failed to approve marriage request");
  }
};
const rejectMarriageRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Admin login token not found.");
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/interests/admin/marriage-requests/${requestId}/reject`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to reject marriage request"
      );
    }

    alert("Marriage request rejected successfully.");

    setSelectedMatch(null);

    window.location.reload();
  } catch (error) {
    console.error("Reject marriage request error:", error);

    alert(
      error.message || "Failed to reject marriage request"
    );
  }
};
  // ============================
  // AGE CALCULATOR
  // ============================
  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";

    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age : "N/A";
  };

  // ============================
  // FORMAT DATE
  // ============================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ============================
  // INITIALS
  // ============================
  const getInitial = (name) => {
    if (!name) return "?";

    return name.trim().charAt(0).toUpperCase();
  };

  // ============================
  // FILTER MATCHES
  // ============================
  const filteredMatches = useMemo(() => {
    const query = search.trim().toLowerCase();

    return matches.filter((match) => {
      const sender = match.user1;
      const receiver = match.user2;

      const senderProfile = sender?.matrimonial_profiles;
      const receiverProfile = receiver?.matrimonial_profiles;

      const searchableValues = [
        sender?.full_name,
        receiver?.full_name,

        senderProfile?.state,
        receiverProfile?.state,

        senderProfile?.address,
        receiverProfile?.address,

        senderProfile?.profession,
        receiverProfile?.profession,

        senderProfile?.education,
        receiverProfile?.education,
      ];

      const matchesSearch =
        query === "" ||
        searchableValues.some((value) =>
          value?.toString().toLowerCase().includes(query)
        );

      const matchesStatus =
  status === "All" ||
  match.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [matches, search, status]);

  // ============================
  // REAL STATS
  // ============================
  const totalMatches = matches.length;
const pendingMatches = matches.filter(
  (match) => match.status?.toLowerCase() === "pending"
).length;

const approvedMatches = matches.filter(
  (match) => match.status?.toLowerCase() === "approved"
).length;

const cancelledMatches = matches.filter((match) =>
  ["cancelled", "rejected"].includes(
    match.status?.toLowerCase()
  )
).length;

const rejectedMatches = matches.filter(
  (match) => match.status?.toLowerCase() === "rejected"
).length;

  const successRate =
    totalMatches > 0
      ? ((approvedMatches / totalMatches) * 100).toFixed(1)
      : "0.0";

  // ============================
  // STATUS LABEL
  // ============================
const getStatusLabel = (matchStatus) => {
  if (!matchStatus) return "Unknown";

  switch (matchStatus.toLowerCase()) {
    case "accepted":
      return "Accepted";

    case "pending":
      return "Pending";

    case "rejected":
      return "Rejected";

    case "cancelled":
      return "Cancelled";

    case "closed":
      return "Closed";

    case "approved":
      return "Approved";

    default:
      return matchStatus.charAt(0).toUpperCase() + matchStatus.slice(1);
  }
};

  // ============================
  // STATUS STYLE
  // ============================
const getStatusClass = (matchStatus) => {
  switch (matchStatus?.toLowerCase()) {
    case "accepted":
      return "bg-[#e7f6ed] text-[#287b51]";

    case "pending":
      return "bg-[#fff1d8] text-[#b36b11]";

    case "rejected":
      return "bg-[#f8e3e3] text-[#b63b3b]";

    case "cancelled":
      return "bg-[#eeeeee] text-[#666666]";

    case "closed":
      return "bg-[#eeeeee] text-[#666666]";

    case "approved":
      return "bg-[#e7f6ed] text-[#287b51]";

    default:
      return "bg-[#f4e8dc] text-[#806653]";
  }
};

  // ============================
  // PROFILE PHOTO
  // ============================
  const ProfileAvatar = ({
    person,
    type = "sender",
    large = false,
  }) => {
    const name = person?.full_name || "Unknown";
    const photo = person?.profile_photo;

    const sizeClass = large ? "h-16 w-16 text-[21px]" : "h-10 w-10 text-[12px]";

    if (photo) {
      return (
        <img
          src={photo}
          alt={name}
          className={`${sizeClass} rounded-full object-cover ring-2 ring-[#eadfce]`}
        />
      );
    }

    return (
      <div
        className={`${sizeClass} flex items-center justify-center rounded-full font-serif font-semibold ${
          type === "sender"
            ? "bg-[#8c1d18] text-[#f5c45e]"
            : "bg-[#f4e2c2] text-[#8c1d18]"
        }`}
      >
        {getInitial(name)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ===================================================== */}
      {/* TOPBAR */}
      {/* ===================================================== */}

      <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 backdrop-blur sm:px-7">

        <div>
          <p className="text-[9px] uppercase tracking-[2px] text-[#a67c35]">
            Admin Workspace
          </p>

          <h1 className="font-serif text-[24px] font-semibold text-[#4a1712]">
            Matches
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfce] text-[14px] text-[#6d5142]"
          >
            🔔

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d92c2c]" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold text-[#4a1712]">
              Administrator
            </p>

            <p className="text-[8px] text-[#9a806f]">
              Super Admin
            </p>
          </div>

        </div>
      </header>


      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Heading */}

        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Match Management
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Monitor successful connections between members.
          </p>

        </div>


        {/* ===================================================== */}
        {/* ERROR */}
        {/* ===================================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-[#f0caca] bg-[#fff1f1] px-4 py-3">

            <p className="text-[10px] font-semibold text-[#b63b3b]">
              {error}
            </p>

          </div>
        )}


        {/* ===================================================== */}
        {/* STATS */}
        {/* ===================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-5">

          {/* Total */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Total Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
              {loading ? "..." : totalMatches}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Total connections
            </p>

          </div>


          {/* Accepted */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Accepted Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#287b51]">
              {loading ? "..." : approvedMatches}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Successfully accepted
            </p>

          </div>


          {/* Pending */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Pending Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b36b11]">
              {loading ? "..." : pendingMatches}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Awaiting response
            </p>

          </div>

{/* Cancelled */}

<div className="rounded-xl border border-[#eadfce] bg-white p-5">

  <p className="text-[9px] text-[#9a806f]">
  Cancelled / Rejected
</p>

  <p className="mt-1 font-serif text-[27px] font-semibold text-[#666666]">
    {loading ? "..." : cancelledMatches}
  </p>

  <p className="mt-1 text-[8px] text-[#9a806f]">
  Cancelled or rejected requests
</p>

</div>
          {/* Success */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Success Rate
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#8c1d18]">
              {loading ? "..." : `${successRate}%`}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Accepted / total matches
            </p>

          </div>

        </div>


        {/* ===================================================== */}
        {/* FILTERS */}
        {/* ===================================================== */}

        <div className="rounded-xl border border-[#eadfce] bg-white p-4 shadow-[0_4px_18px_rgba(73,38,20,0.04)] sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}

            <div className="flex flex-1 items-center rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3">

              <span className="text-[15px] text-[#a67c35]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member name, location, profession..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>


            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >

              <option value="All">All Matches</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="cancelled">Cancelled</option>
<option value="rejected">Rejected</option>

            </select>

          </div>

        </div>


        {/* ===================================================== */}
        {/* MATCH LIST */}
        {/* ===================================================== */}

        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="border-b border-[#eadfce] px-5 py-4">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Member Matches
            </h3>

            <p className="mt-0.5 text-[9px] text-[#9a806f]">
              Showing {filteredMatches.length} matches
            </p>

          </div>


          {/* ===================================================== */}
          {/* LOADING */}
          {/* ===================================================== */}

          {loading && (
            <div className="px-5 py-16 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#eadfce] border-t-[#8c1d18]" />

              <p className="mt-3 text-[10px] text-[#9a806f]">
                Loading matches...
              </p>

            </div>
          )}


          {/* ===================================================== */}
          {/* DESKTOP */}
          {/* ===================================================== */}

          {!loading && filteredMatches.length > 0 && (
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                    <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Members
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Locations
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Details
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Match Date
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredMatches.map((match) => {

                    const sender = match.user1;
                    const receiver = match.user2;

                    const senderProfile =
                      sender?.matrimonial_profiles;

                    const receiverProfile =
                      receiver?.matrimonial_profiles;

                    return (
                      <tr
                        key={match.id}
                        className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                      >

                        {/* Members */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2">

                            <ProfileAvatar
                              person={sender}
                              type="sender"
                            />

                            <div className="min-w-[110px]">

                              <p className="text-[10px] font-semibold text-[#4f3425]">
                                {sender?.full_name || "Unknown"}
                              </p>

                              <p className="text-[8px] text-[#9a806f]">
                                {calculateAge(
                                  senderProfile?.birth_date
                                )}{" "}
                                yrs •{" "}
                                {senderProfile?.profession ||
                                  "Profession N/A"}
                              </p>

                            </div>


                            <span className="mx-1 text-[12px] text-[#d92c2c]">
                              ♥
                            </span>


                            <ProfileAvatar
                              person={receiver}
                              type="receiver"
                            />

                            <div className="min-w-[110px]">

                              <p className="text-[10px] font-semibold text-[#4f3425]">
                                {receiver?.full_name || "Unknown"}
                              </p>

                              <p className="text-[8px] text-[#9a806f]">
                                {calculateAge(
                                  receiverProfile?.birth_date
                                )}{" "}
                                yrs •{" "}
                                {receiverProfile?.profession ||
                                  "Profession N/A"}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Locations */}

                        <td className="px-4 py-4">

                          <p className="text-[9px] text-[#806653]">
                            📍{" "}
                            {senderProfile?.state ||
                              senderProfile?.address ||
                              "N/A"}
                          </p>

                          <p className="mt-1 text-[9px] text-[#806653]">
                            📍{" "}
                            {receiverProfile?.state ||
                              receiverProfile?.address ||
                              "N/A"}
                          </p>

                        </td>


                        {/* Details */}

                        <td className="px-4 py-4">

                          <p className="text-[9px] text-[#806653]">
                            {senderProfile?.education ||
                              "Education N/A"}
                          </p>

                          <p className="mt-1 text-[9px] text-[#806653]">
                            {receiverProfile?.education ||
                              "Education N/A"}
                          </p>

                        </td>


                        {/* Match Date */}

                       <td className="px-4 py-4 text-[10px] text-[#806653]">
  {formatDate(match.requested_at || match.created_at)}
</td>

                        {/* Status */}

                        <td className="px-4 py-4">

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${getStatusClass(
                              match.status
                            )}`}
                          >
                            {getStatusLabel(match.status)}
                          </span>

                        </td>


                        {/* Action */}

                        <td className="px-4 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedMatch(match)
                            }
                            className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5e8]"
                          >
                            View Match
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}


          {/* ===================================================== */}
          {/* MOBILE */}
          {/* ===================================================== */}

          {!loading && filteredMatches.length > 0 && (
            <div className="divide-y divide-[#eadfce] md:hidden">

              {filteredMatches.map((match) => {

                const sender = match.user1;
                const receiver = match.user2;

                const senderProfile =
                  sender?.matrimonial_profiles;

                const receiverProfile =
                  receiver?.matrimonial_profiles;

                return (
                  <div
                    key={match.id}
                    className="p-4"
                  >

                    {/* Members */}

                    <div className="flex items-center justify-center gap-3">

                      <div className="max-w-[110px] text-center">

                        <div className="flex justify-center">

                          <ProfileAvatar
                            person={sender}
                            type="sender"
                          />

                        </div>

                        <p className="mt-1 truncate text-[9px] font-semibold text-[#4f3425]">
                          {sender?.full_name || "Unknown"}
                        </p>

                        <p className="text-[8px] text-[#9a806f]">
                          {calculateAge(
                            senderProfile?.birth_date
                          )}{" "}
                          yrs
                        </p>

                      </div>


                      <div className="text-center">

                        <div className="text-[15px] text-[#d92c2c]">
                          ♥
                        </div>

                        <p
                          className={`rounded-full px-2 py-1 text-[7px] font-semibold ${getStatusClass(
                            match.status
                          )}`}
                        >
                          {getStatusLabel(match.status)}
                        </p>

                      </div>


                      <div className="max-w-[110px] text-center">

                        <div className="flex justify-center">

                          <ProfileAvatar
                            person={receiver}
                            type="receiver"
                          />

                        </div>

                        <p className="mt-1 truncate text-[9px] font-semibold text-[#4f3425]">
                          {receiver?.full_name || "Unknown"}
                        </p>

                        <p className="text-[8px] text-[#9a806f]">
                          {calculateAge(
                            receiverProfile?.birth_date
                          )}{" "}
                          yrs
                        </p>

                      </div>

                    </div>


                    {/* Information */}

                    <div className="mt-4 rounded-lg bg-[#fffaf5] p-3">

                      <div className="grid grid-cols-2 gap-3">

                        <div>

                          <p className="text-[8px] text-[#9a806f]">
                            Location
                          </p>

                          <p className="mt-0.5 text-[9px] text-[#806653]">
                            📍{" "}
                            {senderProfile?.state ||
                              senderProfile?.address ||
                              "N/A"}
                          </p>

                        </div>


                        <div>

                          <p className="text-[8px] text-[#9a806f]">
                            Location
                          </p>

                          <p className="mt-0.5 text-[9px] text-[#806653]">
                            📍{" "}
                            {receiverProfile?.state ||
                              receiverProfile?.address ||
                              "N/A"}
                          </p>

                        </div>


                        <div>

                          <p className="text-[8px] text-[#9a806f]">
                            Match Date
                          </p>

                         <p className="mt-0.5 text-[9px] text-[#806653]">
  {formatDate(match.requested_at || match.created_at)}
</p>

                        </div>


                        <div>

  <p className="text-[8px] text-[#9a806f]">
    Status
  </p>

  <p
    className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${getStatusClass(
      match.status
    )}`}
  >
    {getStatusLabel(match.status)}
  </p>

</div>

                      </div>

                    </div>


                    {/* View */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMatch(match)
                      }
                      className="mt-3 w-full rounded-md border border-[#eadfce] py-2 text-[9px] font-semibold text-[#8c1d18] hover:bg-[#fff5e8]"
                    >
                      View Match
                    </button>

                  </div>
                );
              })}

            </div>
          )}


          {/* ===================================================== */}
          {/* EMPTY */}
          {/* ===================================================== */}

          {!loading && filteredMatches.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                💞
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No matches found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                {matches.length === 0
                  ? "There are no matches available yet."
                  : "Try changing your search or match status."}
              </p>

            </div>
          )}

        </div>

      </main>


      {/* ===================================================== */}
      {/* MODAL */}
      {/* ===================================================== */}

      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

              <div>

                <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                  Match Details
                </p>

                <h3 className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  Member Connection
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfce] text-[#806653] hover:bg-[#fff5e8]"
              >
                ×
              </button>

            </div>


            {/* Modal Body */}

            <div className="p-5">

              <div className="flex flex-col items-center gap-4 sm:flex-row">

                {/* Sender */}

                <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                  <div className="flex justify-center">

                    <ProfileAvatar
                      person={selectedMatch.user1}
                      type="sender"
                      large
                    />

                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedMatch.user1?.full_name ||
                      "Unknown"}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {calculateAge(
                      selectedMatch.user1?.matrimonial_profiles
                        ?.birth_date
                    )}{" "}
                    years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.user1?.matrimonial_profiles
                      ?.profession || "Profession N/A"}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍{" "}
                    {selectedMatch.user1?.matrimonial_profiles
                      ?.state ||
                      selectedMatch.user1?.matrimonial_profiles
                        ?.address ||
                      "Location N/A"}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    🎓{" "}
                    {selectedMatch.user1?.matrimonial_profiles
                      ?.education || "Education N/A"}
                  </p>

                </div>


                {/* Heart */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[18px] text-[#d92c2c]">
                  ♥
                </div>


                {/* Receiver */}

                <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                  <div className="flex justify-center">

                    <ProfileAvatar
                      person={selectedMatch.user2}
                      type="receiver"
                      large
                    />

                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedMatch.user2?.full_name ||
                      "Unknown"}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {calculateAge(
                      selectedMatch.user2?.matrimonial_profiles
                        ?.birth_date
                    )}{" "}
                    years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.user2?.matrimonial_profiles
                      ?.profession || "Profession N/A"}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍{" "}
                    {selectedMatch.user2?.matrimonial_profiles
                      ?.state ||
                      selectedMatch.user2?.matrimonial_profiles
                        ?.address ||
                      "Location N/A"}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    🎓{" "}
                    {selectedMatch.user2?.matrimonial_profiles
                      ?.education || "Education N/A"}
                  </p>

                </div>

              </div>


              {/* Status + Date */}

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-lg border border-[#eadfce] p-4">

                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Match Date
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {formatDate(
  selectedMatch.requested_at
)}
                  </p>

                </div>


                <div className="rounded-lg border border-[#eadfce] p-4">

                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Status
                  </p>

                  <p className="mt-1">

                    <span
                      className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${getStatusClass(
                        selectedMatch.status
                      )}`}
                    >
                      {getStatusLabel(
                        selectedMatch.status
                      )}
                    </span>

                  </p>

                </div>

              </div>


              {/* Match ID */}

              <div className="mt-3 rounded-lg border border-[#eadfce] p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                  Match ID
                </p>

                <p className="mt-1 break-all text-[9px] text-[#806653]">
                  {selectedMatch.id}
                </p>

              </div>


              {/* Approve + Close Buttons */}

<div className="mt-5 flex gap-3">
{selectedMatch.status === "Pending" && (
  <button
    type="button"
    onClick={() => {
      const confirmed = window.confirm(
        "Are you sure you want to reject this marriage request?"
      );

      if (confirmed) {
        rejectMarriageRequest(selectedMatch.id);
      }
    }}
    className="flex-1 rounded-lg bg-[#b63b3b] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#963030]"
  >
    ✕ Reject Marriage
  </button>
)}
  {/* Approve Marriage */}
  {selectedMatch.status === "Pending" && (
    <button
      type="button"
      onClick={() => {
        const confirmed = window.confirm(
          "Are you sure you want to finalize this marriage? Both profiles will be hidden from public listings."
        );

        if (confirmed) {
          approveMarriageRequest(selectedMatch.id);
        }
      }}
      className="flex-1 rounded-lg bg-[#2f7d32] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#256628]"
    >
      ✓ Approve Marriage
    </button>
  )}

  {/* Close */}
  <button
    type="button"
    onClick={() => setSelectedMatch(null)}
    className={`rounded-lg bg-[#8c1d18] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#701510] ${
      selectedMatch.status === "Pending"
        ? "flex-1"
        : "w-full"
    }`}
  >
    Close
  </button>

</div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MatchesPage;