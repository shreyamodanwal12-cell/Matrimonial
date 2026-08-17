import { useState } from "react";

function RequestsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const requests = [
    {
      id: 1,
      sender: "Rahul Verma",
      senderAge: 29,
      senderLocation: "Delhi",
      receiver: "Priya Sharma",
      receiverAge: 27,
      receiverLocation: "Bangalore",
      date: "12 Aug 2026",
      status: "Pending",
      senderInitial: "R",
      receiverInitial: "P",
    },
    {
      id: 2,
      sender: "Amit Mehta",
      senderAge: 30,
      senderLocation: "Mumbai",
      receiver: "Neha Kulkarni",
      receiverAge: 28,
      receiverLocation: "Pune",
      date: "11 Aug 2026",
      status: "Accepted",
      senderInitial: "A",
      receiverInitial: "N",
    },
    {
      id: 3,
      sender: "Karan Singh",
      senderAge: 31,
      senderLocation: "Jaipur",
      receiver: "Riya Sharma",
      receiverAge: 26,
      receiverLocation: "Delhi",
      date: "10 Aug 2026",
      status: "Pending",
      senderInitial: "K",
      receiverInitial: "R",
    },
    {
      id: 4,
      sender: "Vikas Gupta",
      senderAge: 28,
      senderLocation: "Noida",
      receiver: "Anjali Patil",
      receiverAge: 26,
      receiverLocation: "Mumbai",
      date: "09 Aug 2026",
      status: "Rejected",
      senderInitial: "V",
      receiverInitial: "A",
    },
    {
      id: 5,
      sender: "Arjun Rao",
      senderAge: 30,
      senderLocation: "Hyderabad",
      receiver: "Sneha Patel",
      receiverAge: 25,
      receiverLocation: "Ahmedabad",
      date: "08 Aug 2026",
      status: "Accepted",
      senderInitial: "A",
      receiverInitial: "S",
    },
    {
      id: 6,
      sender: "Rohit Malhotra",
      senderAge: 29,
      senderLocation: "Chandigarh",
      receiver: "Pooja Mehta",
      receiverAge: 27,
      receiverLocation: "Gurgaon",
      date: "07 Aug 2026",
      status: "Pending",
      senderInitial: "R",
      receiverInitial: "P",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      request.sender.toLowerCase().includes(searchText) ||
      request.receiver.toLowerCase().includes(searchText) ||
      request.senderLocation.toLowerCase().includes(searchText) ||
      request.receiverLocation.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "All" || request.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ================= TOPBAR ================= */}
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


      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Heading */}
        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Manage Interests
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Monitor connection requests sent between matrimonial members.
          </p>

        </div>


        {/* ================= STATISTICS ================= */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Total Requests
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
              4,286
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              All connection requests
            </p>

          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Pending
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b36b11]">
              384
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Waiting for response
            </p>

          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Accepted
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#287b51]">
              3,214
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Successful connections
            </p>

          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">

            <p className="text-[9px] text-[#9a806f]">
              Rejected
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b63b3b]">
              688
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Declined requests
            </p>

          </div>

        </div>


        {/* ================= FILTERS ================= */}
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
                placeholder="Search sender, receiver or location..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>


            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

        </div>


        {/* ================= REQUEST TABLE ================= */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="border-b border-[#eadfce] px-5 py-4">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Connection Requests
            </h3>

            <p className="mt-0.5 text-[9px] text-[#9a806f]">
              Showing {filteredRequests.length} requests
            </p>

          </div>


          {/* Desktop Table */}
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

                {filteredRequests.map((request) => (

                  <tr
                    key={request.id}
                    className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                  >

                    {/* Sender */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                          {request.senderInitial}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {request.sender}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#9a806f]">
                            {request.senderAge} years • {request.senderLocation}
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

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[12px] font-semibold text-[#8c1d18]">
                          {request.receiverInitial}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {request.receiver}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#9a806f]">
                            {request.receiverAge} years • {request.receiverLocation}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Date */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {request.date}
                    </td>


                    {/* Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[8px] font-semibold
                          ${
                            request.status === "Pending"
                              ? "bg-[#fff1d8] text-[#b36b11]"
                              : request.status === "Accepted"
                                ? "bg-[#e7f6ed] text-[#287b51]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                          }
                        `}
                      >
                        {request.status}
                      </span>

                    </td>


                    {/* Action */}
                    <td className="px-4 py-4">

                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5e8]"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= MOBILE ================= */}
          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredRequests.map((request) => (

              <div
                key={request.id}
                className="p-4"
              >

                {/* Sender */}
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                    {request.senderInitial}
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#4f3425]">
                      {request.sender}
                    </p>

                    <p className="text-[8px] text-[#9a806f]">
                      {request.senderAge} years • {request.senderLocation}
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

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[12px] font-semibold text-[#8c1d18]">
                    {request.receiverInitial}
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#4f3425]">
                      {request.receiver}
                    </p>

                    <p className="text-[8px] text-[#9a806f]">
                      {request.receiverAge} years • {request.receiverLocation}
                    </p>
                  </div>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <div>

                    <p className="text-[8px] text-[#9a806f]">
                      Sent on
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#806653]">
                      {request.date}
                    </p>

                  </div>

                  <span
                    className={`
                      rounded-full px-2.5 py-1 text-[8px] font-semibold
                      ${
                        request.status === "Pending"
                          ? "bg-[#fff1d8] text-[#b36b11]"
                          : request.status === "Accepted"
                            ? "bg-[#e7f6ed] text-[#287b51]"
                            : "bg-[#f8e3e3] text-[#b63b3b]"
                      }
                    `}
                  >
                    {request.status}
                  </span>

                </div>


                <button
                  type="button"
                  onClick={() => setSelectedRequest(request)}
                  className="mt-3 w-full rounded-md border border-[#eadfce] py-2 text-[9px] font-semibold text-[#8c1d18]"
                >
                  View Request
                </button>

              </div>

            ))}

          </div>


          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                💌
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No requests found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Try changing your search or status filter.
              </p>

            </div>
          )}

        </div>

      </main>


      {/* ================= REQUEST MODAL ================= */}
      {selectedRequest && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-[560px] rounded-2xl bg-white shadow-2xl">

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
                onClick={() => setSelectedRequest(null)}
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
                    {selectedRequest.senderInitial}
                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedRequest.sender}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedRequest.senderAge} years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍 {selectedRequest.senderLocation}
                  </p>

                </div>


                {/* Heart */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[#d92c2c]">
                  ♥
                </div>


                {/* Receiver */}
                <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[21px] font-semibold text-[#8c1d18]">
                    {selectedRequest.receiverInitial}
                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedRequest.receiver}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedRequest.receiverAge} years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍 {selectedRequest.receiverLocation}
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
                    {selectedRequest.date}
                  </p>

                </div>


                <div className="rounded-lg border border-[#eadfce] p-3">

                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Current Status
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-[#b36b11]">
                    {selectedRequest.status}
                  </p>

                </div>

              </div>


              {/* Actions */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="flex-1 rounded-lg border border-[#eadfce] py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-[#fffaf5]"
                >
                  Close
                </button>

                {selectedRequest.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(null)}
                      className="flex-1 rounded-lg border border-[#d9a0a0] bg-[#fff5f5] py-2.5 text-[10px] font-semibold text-[#b63b3b] hover:bg-[#fceaea]"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRequest(null)}
                      className="flex-1 rounded-lg bg-[#8c1d18] py-2.5 text-[10px] font-semibold text-white hover:bg-[#701510]"
                    >
                      ✓ Approve
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default RequestsPage;