import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function RequestsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH ALL INTEREST REQUESTS
  // ======================================================

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
        `${API_BASE_URL}/api/interests/admin`,
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
          data.message || "Failed to fetch interest requests"
        );
      }

      setRequests(data.interests || []);
    } catch (error) {
      console.error("Fetch admin interests error:", error);

      setError(
        error.message || "Unable to load interest requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ======================================================
  // STATISTICS
  // ======================================================

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) =>
      request.status?.toLowerCase() === "pending"
  ).length;

  const acceptedRequests = requests.filter(
    (request) =>
      request.status?.toLowerCase() === "accepted"
  ).length;

  const rejectedRequests = requests.filter(
    (request) =>
      request.status?.toLowerCase() === "rejected"
  ).length;

  // ======================================================
  // GET PROFILE
  // ======================================================

  const getProfile = (user) => {
    if (!user) return {};

    if (Array.isArray(user.matrimonial_profiles)) {
      return user.matrimonial_profiles[0] || {};
    }

    return user.matrimonial_profiles || {};
  };

  // ======================================================
  // GET AGE
  // ======================================================

  const getAge = (birthDate) => {
    if (!birthDate) return "—";

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference =
      today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age > 0 ? age : "—";
  };

  // ======================================================
  // GET INITIAL
  // ======================================================

  const getInitial = (name) => {
    if (!name) return "?";

    return name.trim().charAt(0).toUpperCase();
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) return "—";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "—";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ======================================================
  // FILTER REQUESTS
  // ======================================================

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase().trim();

    const senderName =
      request.sender?.full_name?.toLowerCase() || "";

    const receiverName =
      request.receiver?.full_name?.toLowerCase() || "";

    const senderProfile = getProfile(request.sender);
    const receiverProfile = getProfile(request.receiver);

    const senderLocation =
      senderProfile.state?.toLowerCase() || "";

    const receiverLocation =
      receiverProfile.state?.toLowerCase() || "";

    const matchesSearch =
      senderName.includes(searchText) ||
      receiverName.includes(searchText) ||
      senderLocation.includes(searchText) ||
      receiverLocation.includes(searchText);

    const matchesStatus =
      status === "All" ||
      request.status?.toLowerCase() ===
        status.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusClass = (requestStatus) => {
    const currentStatus =
      requestStatus?.toLowerCase();

    if (currentStatus === "pending") {
      return "bg-[#fff1d8] text-[#b36b11]";
    }

    if (currentStatus === "accepted") {
      return "bg-[#e7f6ed] text-[#287b51]";
    }

    if (currentStatus === "rejected") {
      return "bg-[#f8e3e3] text-[#b63b3b]";
    }

    return "bg-[#f1eee9] text-[#806653]";
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#eadfce] border-t-[#8c1d18]" />

          <p className="mt-3 text-[11px] text-[#806653]">
            Loading interest requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ==================================================
          TOPBAR
      ================================================== */}

      <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 backdrop-blur sm:px-7">

        <div>
          <p className="text-[9px] uppercase tracking-[2px] text-[#a67c35]">
            Admin Workspace
          </p>

          <h1 className="font-serif text-[24px] font-semibold text-[#4a1712]">
            Requests & Interests
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


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Heading */}

        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Manage Interests
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Monitor connection requests sent between
            matrimonial members.
          </p>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-[#e6b4b4] bg-[#fff5f5] p-4">

            <p className="text-[10px] font-semibold text-[#b63b3b]">
              Unable to load requests
            </p>

            <p className="mt-1 text-[9px] text-[#806653]">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchRequests}
              className="mt-3 rounded-md bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#701510]"
            >
              Try Again
            </button>

          </div>
        )}


        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {/* Total */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Total Requests
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
              {totalRequests}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              All connection requests
            </p>

          </div>


          {/* Pending */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Pending
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b36b11]">
              {pendingRequests}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Waiting for response
            </p>

          </div>


          {/* Accepted */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Accepted
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#287b51]">
              {acceptedRequests}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Successful connections
            </p>

          </div>


          {/* Rejected */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Rejected
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b63b3b]">
              {rejectedRequests}
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Declined requests
            </p>

          </div>

        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

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
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search sender, receiver or location..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>


            {/* Status */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Accepted">
                Accepted
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

          </div>

        </div>


        {/* ==================================================
            REQUEST TABLE
        ================================================== */}

        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="border-b border-[#eadfce] px-5 py-4">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Connection Requests
            </h3>

            <p className="mt-0.5 text-[9px] text-[#9a806f]">
              Showing {filteredRequests.length} requests
            </p>

          </div>


          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>

                <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                  <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Sent By
                  </th>

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Interest
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Sent To
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Date
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

                {filteredRequests.map((request) => {

                  const senderProfile =
                    getProfile(request.sender);

                  const receiverProfile =
                    getProfile(request.receiver);

                  const senderName =
                    request.sender?.full_name ||
                    "Unknown User";

                  const receiverName =
                    request.receiver?.full_name ||
                    "Unknown User";

                  const senderAge =
                    getAge(senderProfile.birth_date);

                  const receiverAge =
                    getAge(receiverProfile.birth_date);

                  const senderLocation =
                    senderProfile.state || "—";

                  const receiverLocation =
                    receiverProfile.state || "—";

                  return (
                    <tr
                      key={request.id}
                      className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                    >

                      {/* Sender */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                            {getInitial(senderName)}
                          </div>

                          <div>

                            <p className="text-[10px] font-semibold text-[#4f3425]">
                              {senderName}
                            </p>

                            <p className="mt-0.5 text-[8px] text-[#9a806f]">
                              {senderAge} years •{" "}
                              {senderLocation}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Heart */}

                      <td className="px-4 py-4 text-center">

                        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#fff0f0] text-[14px] text-[#d92c2c]">
                          ♥
                        </div>

                      </td>


                      {/* Receiver */}

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[12px] font-semibold text-[#8c1d18]">
                            {getInitial(receiverName)}
                          </div>

                          <div>

                            <p className="text-[10px] font-semibold text-[#4f3425]">
                              {receiverName}
                            </p>

                            <p className="mt-0.5 text-[8px] text-[#9a806f]">
                              {receiverAge} years •{" "}
                              {receiverLocation}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Date */}

                      <td className="px-4 py-4 text-[10px] text-[#806653]">
                        {formatDate(request.created_at)}
                      </td>


                      {/* Status */}

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${getStatusClass(
                            request.status
                          )}`}
                        >
                          {request.status
                            ? request.status
                                .charAt(0)
                                .toUpperCase() +
                              request.status.slice(1)
                            : "Unknown"}
                        </span>

                      </td>


                      {/* Action */}

                      <td className="px-4 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRequest(request)
                          }
                          className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5e8]"
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>


          {/* ==================================================
              MOBILE
          ================================================== */}

          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredRequests.map((request) => {

              const senderProfile =
                getProfile(request.sender);

              const receiverProfile =
                getProfile(request.receiver);

              const senderName =
                request.sender?.full_name ||
                "Unknown User";

              const receiverName =
                request.receiver?.full_name ||
                "Unknown User";

              const senderAge =
                getAge(senderProfile.birth_date);

              const receiverAge =
                getAge(receiverProfile.birth_date);

              const senderLocation =
                senderProfile.state || "—";

              const receiverLocation =
                receiverProfile.state || "—";

              return (
                <div
                  key={request.id}
                  className="p-4"
                >

                  {/* Sender */}

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                      {getInitial(senderName)}
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        {senderName}
                      </p>

                      <p className="text-[8px] text-[#9a806f]">
                        {senderAge} years •{" "}
                        {senderLocation}
                      </p>

                    </div>

                  </div>


                  {/* Connection */}

                  <div className="my-3 flex items-center gap-2">

                    <div className="h-px flex-1 bg-[#eadfce]" />

                    <span className="text-[13px] text-[#d92c2c]">
                      ♥
                    </span>

                    <div className="h-px flex-1 bg-[#eadfce]" />

                  </div>


                  {/* Receiver */}

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[12px] font-semibold text-[#8c1d18]">
                      {getInitial(receiverName)}
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        {receiverName}
                      </p>

                      <p className="text-[8px] text-[#9a806f]">
                        {receiverAge} years •{" "}
                        {receiverLocation}
                      </p>

                    </div>

                  </div>


                  {/* Date + Status */}

                  <div className="mt-4 flex items-center justify-between">

                    <div>

                      <p className="text-[8px] text-[#9a806f]">
                        Sent on
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#806653]">
                        {formatDate(
                          request.created_at
                        )}
                      </p>

                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status
                        ? request.status
                            .charAt(0)
                            .toUpperCase() +
                          request.status.slice(1)
                        : "Unknown"}
                    </span>

                  </div>


                  {/* View */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRequest(request)
                    }
                    className="mt-3 w-full rounded-md border border-[#eadfce] py-2 text-[9px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5e8]"
                  >
                    View Request
                  </button>

                </div>
              );
            })}

          </div>


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {filteredRequests.length === 0 && !error && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                💌
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No requests found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                {requests.length === 0
                  ? "No interest requests have been sent yet."
                  : "Try changing your search or status filter."}
              </p>

            </div>
          )}

        </div>

      </main>


      {/* ==================================================
          REQUEST MODAL
      ================================================== */}

      {selectedRequest && (() => {

        const senderProfile =
          getProfile(selectedRequest.sender);

        const receiverProfile =
          getProfile(selectedRequest.receiver);

        const senderName =
          selectedRequest.sender?.full_name ||
          "Unknown User";

        const receiverName =
          selectedRequest.receiver?.full_name ||
          "Unknown User";

        const senderAge =
          getAge(senderProfile.birth_date);

        const receiverAge =
          getAge(receiverProfile.birth_date);

        const senderLocation =
          senderProfile.state || "—";

        const receiverLocation =
          receiverProfile.state || "—";

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() =>
              setSelectedRequest(null)
            }
          >

            <div
              className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white shadow-2xl"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* Modal Header */}

              <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

                <div>

                  <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                    Interest Request
                  </p>

                  <h3 className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                    Connection Details
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedRequest(null)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfce] text-[#806653] hover:bg-[#fff5e8]"
                >
                  ×
                </button>

              </div>


              {/* Modal Body */}

              <div className="p-5">

                {/* Connection */}

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

                  {/* Sender */}

                  <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[21px] font-semibold text-[#f5c45e]">
                      {getInitial(senderName)}
                    </div>

                    <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                      {senderName}
                    </h4>

                    <p className="mt-1 text-[9px] text-[#806653]">
                      {senderAge} years
                    </p>

                    <p className="mt-1 text-[9px] text-[#806653]">
                      📍 {senderLocation}
                    </p>

                  </div>


                  {/* Heart */}

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[#d92c2c]">
                    ♥
                  </div>


                  {/* Receiver */}

                  <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[21px] font-semibold text-[#8c1d18]">
                      {getInitial(receiverName)}
                    </div>

                    <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                      {receiverName}
                    </h4>

                    <p className="mt-1 text-[9px] text-[#806653]">
                      {receiverAge} years
                    </p>

                    <p className="mt-1 text-[9px] text-[#806653]">
                      📍 {receiverLocation}
                    </p>

                  </div>

                </div>


                {/* Request Info */}

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-lg border border-[#eadfce] p-3">

                    <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                      Request Date
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                      {formatDate(
                        selectedRequest.created_at
                      )}
                    </p>

                  </div>


                  <div className="rounded-lg border border-[#eadfce] p-3">

                    <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                      Current Status
                    </p>

                    <p
                      className={`mt-1 text-[10px] font-semibold ${
                        selectedRequest.status?.toLowerCase() ===
                        "pending"
                          ? "text-[#b36b11]"
                          : selectedRequest.status?.toLowerCase() ===
                            "accepted"
                          ? "text-[#287b51]"
                          : "text-[#b63b3b]"
                      }`}
                    >
                      {selectedRequest.status
                        ? selectedRequest.status
                            .charAt(0)
                            .toUpperCase() +
                          selectedRequest.status.slice(1)
                        : "Unknown"}
                    </p>

                  </div>

                </div>


                {/* User IDs */}

                <div className="mt-3 rounded-lg border border-[#eadfce] p-3">

                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Request ID
                  </p>

                  <p className="mt-1 break-all text-[9px] text-[#806653]">
                    {selectedRequest.id}
                  </p>

                </div>


                {/* Admin Info */}

                <div className="mt-4 rounded-lg bg-[#fffaf5] p-3">

                  <p className="text-[9px] font-semibold text-[#4a1712]">
                    Admin Information
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#806653]">
                    This page is for monitoring interest
                    requests between members. The receiver
                    accepts or rejects the interest request.
                  </p>

                </div>


                {/* Actions */}

                <div className="mt-5">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedRequest(null)
                    }
                    className="w-full rounded-lg border border-[#eadfce] py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-[#fffaf5]"
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </div>
        );
      })()}

    </div>
  );
}

export default RequestsPage;