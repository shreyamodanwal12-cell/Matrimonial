import { useState } from "react";

function MembersPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  const members = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 27,
      gender: "Female",
      location: "Bangalore",
      profession: "Software Engineer",
      date: "12 Aug 2026",
      status: "Approved",
      initial: "P",
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 29,
      gender: "Male",
      location: "Delhi",
      profession: "Business Owner",
      date: "11 Aug 2026",
      status: "Pending",
      initial: "R",
    },
    {
      id: 3,
      name: "Anjali Patil",
      age: 26,
      gender: "Female",
      location: "Mumbai",
      profession: "Doctor",
      date: "10 Aug 2026",
      status: "Approved",
      initial: "A",
    },
    {
      id: 4,
      name: "Karthik Rao",
      age: 30,
      gender: "Male",
      location: "Hyderabad",
      profession: "Architect",
      date: "09 Aug 2026",
      status: "Pending",
      initial: "K",
    },
    {
      id: 5,
      name: "Neha Kulkarni",
      age: 28,
      gender: "Female",
      location: "Pune",
      profession: "HR Manager",
      date: "08 Aug 2026",
      status: "Approved",
      initial: "N",
    },
    {
      id: 6,
      name: "Amit Mehta",
      age: 31,
      gender: "Male",
      location: "Jaipur",
      profession: "Chartered Accountant",
      date: "07 Aug 2026",
      status: "Suspended",
      initial: "A",
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.location.toLowerCase().includes(search.toLowerCase()) ||
      member.profession.toLowerCase().includes(search.toLowerCase());

    const matchesGender =
      gender === "All" || member.gender === gender;

    const matchesStatus =
      status === "All" || member.status === status;

    return matchesSearch && matchesGender && matchesStatus;
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
            Members
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


      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Page Heading */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
              Manage Members
            </h2>

            <p className="mt-1 text-[11px] text-[#8c7566]">
              View and manage all registered matrimonial profiles.
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#701510]"
          >
            + Add Member
          </button>

        </div>


        {/* ================= SUMMARY ================= */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Total Members
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#4a1712]">
              12,540
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Active
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#287b51]">
              11,920
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Pending
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#b36b11]">
              128
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Suspended
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#b63b3b]">
              492
            </p>
          </div>

        </div>


        {/* ================= FILTER CARD ================= */}
        <div className="rounded-xl border border-[#eadfce] bg-white p-4 shadow-[0_4px_18px_rgba(73,38,20,0.04)] sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="flex flex-1 items-center rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3">

              <span className="text-[15px] text-[#a67c35]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, location or profession..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>


            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>


            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>

          </div>

        </div>


        {/* ================= MEMBERS TABLE ================= */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

            <div>
              <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                Registered Members
              </h3>

              <p className="mt-0.5 text-[9px] text-[#9a806f]">
                Showing {filteredMembers.length} members
              </p>
            </div>

          </div>


          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                  <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Member
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Age
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Gender
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Profession
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

                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-[#f0e7dc] last:border-0 transition hover:bg-[#fffaf5]"
                  >

                    {/* Member */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                          {member.initial}
                        </div>

                        <div>
                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {member.name}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#a28c7c]">
                            Joined {member.date}
                          </p>
                        </div>

                      </div>

                    </td>


                    {/* Age */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.age}
                    </td>


                    {/* Gender */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.gender}
                    </td>


                    {/* Location */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.location}
                    </td>


                    {/* Profession */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.profession}
                    </td>


                    {/* Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[8px] font-semibold
                          ${
                            member.status === "Approved"
                              ? "bg-[#e7f6ed] text-[#287b51]"
                              : member.status === "Pending"
                                ? "bg-[#fff1d8] text-[#b36b11]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                          }
                        `}
                      >
                        {member.status}
                      </span>

                    </td>


                    {/* Action */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          className="rounded-md border border-[#eadfce] px-2.5 py-1.5 text-[9px] font-medium text-[#8c1d18] transition hover:bg-[#fff5e8]"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="rounded-md border border-[#eadfce] px-2.5 py-1.5 text-[9px] font-medium text-[#806653] transition hover:bg-[#fff5e8]"
                        >
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>


          {/* ================= MOBILE CARDS ================= */}
          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
                      {member.initial}
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        {member.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {member.age} • {member.gender}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {member.location}
                      </p>

                    </div>

                  </div>


                  <span
                    className={`
                      rounded-full px-2 py-1 text-[8px] font-semibold
                      ${
                        member.status === "Approved"
                          ? "bg-[#e7f6ed] text-[#287b51]"
                          : member.status === "Pending"
                            ? "bg-[#fff1d8] text-[#b36b11]"
                            : "bg-[#f8e3e3] text-[#b63b3b]"
                      }
                    `}
                  >
                    {member.status}
                  </span>

                </div>


                <div className="mt-3 flex items-center justify-between">

                  <p className="text-[9px] text-[#806653]">
                    {member.profession}
                  </p>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] text-[#8c1d18]"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] text-[#806653]"
                    >
                      Edit
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>


          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                🔍
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No members found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>


        {/* ================= PAGINATION ================= */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">

          <p className="text-[9px] text-[#9a806f]">
            Showing 1–6 of 12,540 members
          </p>

          <div className="flex items-center gap-1">

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#eadfce] bg-white text-[10px] text-[#9a806f]"
            >
              ‹
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-[#8c1d18] text-[10px] font-semibold text-white"
            >
              1
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#eadfce] bg-white text-[10px] text-[#806653]"
            >
              2
            </button>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#eadfce] bg-white text-[10px] text-[#806653]"
            >
              3
            </button>

            <span className="px-1 text-[10px] text-[#9a806f]">
              ...
            </span>

            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#eadfce] bg-white text-[10px] text-[#806653]"
            >
              ›
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default MembersPage;