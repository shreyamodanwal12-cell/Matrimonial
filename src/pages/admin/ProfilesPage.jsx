import { useState } from "react";

function ProfilesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Pending");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    {
      id: 1,
      name: "Riya Sharma",
      age: 26,
      gender: "Female",
      location: "Delhi",
      profession: "Software Engineer",
      education: "B.Tech",
      registered: "12 Aug 2026",
      status: "Pending",
      initial: "R",
      about:
        "A simple, family-oriented person looking for a compatible life partner.",
    },
    {
      id: 2,
      name: "Amit Mehta",
      age: 29,
      gender: "Male",
      location: "Mumbai",
      profession: "Business Owner",
      education: "MBA",
      registered: "11 Aug 2026",
      status: "Pending",
      initial: "A",
      about:
        "Ambitious and caring individual who values family, honesty and mutual respect.",
    },
    {
      id: 3,
      name: "Neha Kulkarni",
      age: 27,
      gender: "Female",
      location: "Pune",
      profession: "HR Manager",
      education: "MBA HR",
      registered: "10 Aug 2026",
      status: "Pending",
      initial: "N",
      about:
        "Independent and warm-hearted person with a strong connection to family values.",
    },
    {
      id: 4,
      name: "Karan Singh",
      age: 30,
      gender: "Male",
      location: "Jaipur",
      profession: "Architect",
      education: "B.Arch",
      registered: "09 Aug 2026",
      status: "Approved",
      initial: "K",
      about:
        "Creative professional looking for a meaningful and respectful relationship.",
    },
    {
      id: 5,
      name: "Sneha Patel",
      age: 25,
      gender: "Female",
      location: "Ahmedabad",
      profession: "Doctor",
      education: "MBBS",
      registered: "08 Aug 2026",
      status: "Rejected",
      initial: "S",
      about:
        "Medical professional who enjoys travelling, reading and spending time with family.",
    },
  ];

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      profile.location.toLowerCase().includes(search.toLowerCase()) ||
      profile.profession.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || profile.status === status;

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
            Profile Approvals
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfce] text-[14px]"
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


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Heading */}
        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Review Profiles
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Review newly registered profiles before making them visible to
            other members.
          </p>

        </div>


        {/* ================= STATS ================= */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Pending Review
            </p>

            <p className="mt-1 font-serif text-[28px] font-semibold text-[#b36b11]">
              128
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Profiles waiting for approval
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Approved Today
            </p>

            <p className="mt-1 font-serif text-[28px] font-semibold text-[#287b51]">
              46
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Profiles approved today
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Rejected
            </p>

            <p className="mt-1 font-serif text-[28px] font-semibold text-[#b63b3b]">
              12
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Profiles rejected today
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
                placeholder="Search by name, location or profession..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>


            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
            >
              <option value="Pending">Pending</option>
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

        </div>


        {/* ================= PROFILE LIST ================= */}
        <div className="mt-5 rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="border-b border-[#eadfce] px-5 py-4">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Profiles Awaiting Review
            </h3>

            <p className="mt-0.5 text-[9px] text-[#9a806f]">
              Showing {filteredProfiles.length} profiles
            </p>

          </div>


          {/* Desktop */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                  <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Profile
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Details
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Registered
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

                {filteredProfiles.map((profile) => (

                  <tr
                    key={profile.id}
                    className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                  >

                    {/* Profile */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
                          {profile.initial}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {profile.name}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#9a806f]">
                            {profile.gender} • {profile.age} years
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Details */}
                    <td className="px-4 py-4">

                      <p className="text-[10px] font-medium text-[#563927]">
                        {profile.profession}
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        {profile.education}
                      </p>

                    </td>


                    {/* Location */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {profile.location}
                    </td>


                    {/* Date */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {profile.registered}
                    </td>


                    {/* Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[8px] font-semibold
                          ${
                            profile.status === "Pending"
                              ? "bg-[#fff1d8] text-[#b36b11]"
                              : profile.status === "Approved"
                                ? "bg-[#e7f6ed] text-[#287b51]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                          }
                        `}
                      >
                        {profile.status}
                      </span>

                    </td>


                    {/* Action */}
                    <td className="px-4 py-4">

                      <button
                        type="button"
                        onClick={() => setSelectedProfile(profile)}
                        className="rounded-md bg-[#8c1d18] px-3 py-1.5 text-[9px] font-semibold text-white transition hover:bg-[#701510]"
                      >
                        Review
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= MOBILE ================= */}
          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredProfiles.map((profile) => (

              <div
                key={profile.id}
                className="p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
                      {profile.initial}
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        {profile.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {profile.age} • {profile.gender}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {profile.location}
                      </p>

                    </div>

                  </div>

                  <span className="rounded-full bg-[#fff1d8] px-2 py-1 text-[8px] font-semibold text-[#b36b11]">
                    {profile.status}
                  </span>

                </div>


                <div className="mt-3">

                  <p className="text-[9px] text-[#806653]">
                    {profile.profession}
                  </p>

                  <p className="mt-1 text-[8px] text-[#9a806f]">
                    {profile.education}
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() => setSelectedProfile(profile)}
                  className="mt-3 w-full rounded-md bg-[#8c1d18] py-2 text-[9px] font-semibold text-white"
                >
                  Review Profile
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>


      {/* ================= REVIEW MODAL ================= */}
      {selectedProfile && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

              <div>

                <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                  Profile Review
                </p>

                <h3 className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  Review {selectedProfile.name}
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setSelectedProfile(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfce] text-[#806653] hover:bg-[#fff5e8]"
              >
                ×
              </button>

            </div>


            {/* Modal Body */}
            <div className="p-5">

              {/* Profile Intro */}
              <div className="flex items-center gap-4 rounded-xl bg-[#fffaf5] p-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[21px] font-semibold text-[#f5c45e]">
                  {selectedProfile.initial}
                </div>

                <div>

                  <h4 className="font-serif text-[20px] font-semibold text-[#4a1712]">
                    {selectedProfile.name}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedProfile.age} years • {selectedProfile.gender}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍 {selectedProfile.location}
                  </p>

                </div>

              </div>


              {/* Information */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Profession
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {selectedProfile.profession}
                  </p>
                </div>

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Education
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {selectedProfile.education}
                  </p>
                </div>

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Registered
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {selectedProfile.registered}
                  </p>
                </div>

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Current Status
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#b36b11]">
                    {selectedProfile.status}
                  </p>
                </div>

              </div>


              {/* About */}
              <div className="mt-4 rounded-lg border border-[#eadfce] p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                  About Profile
                </p>

                <p className="mt-2 text-[10px] leading-6 text-[#806653]">
                  {selectedProfile.about}
                </p>

              </div>


              {/* Actions */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="flex-1 rounded-lg border border-[#eadfce] py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-[#fffaf5]"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="flex-1 rounded-lg border border-[#d9a0a0] bg-[#fff5f5] py-2.5 text-[10px] font-semibold text-[#b63b3b] hover:bg-[#fceaea]"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="flex-1 rounded-lg bg-[#8c1d18] py-2.5 text-[10px] font-semibold text-white hover:bg-[#701510]"
                >
                  ✓ Approve Profile
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProfilesPage;