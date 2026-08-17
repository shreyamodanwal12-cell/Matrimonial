import { useState } from "react";

function MatchesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    {
      id: 1,
      personOne: "Rahul Verma",
      personOneAge: 29,
      personOneLocation: "Delhi",
      personOneProfession: "Software Engineer",
      personTwo: "Priya Sharma",
      personTwoAge: 27,
      personTwoLocation: "Bangalore",
      personTwoProfession: "Doctor",
      matchDate: "12 Aug 2026",
      status: "Mutual",
      compatibility: "94%",
      oneInitial: "R",
      twoInitial: "P",
    },
    {
      id: 2,
      personOne: "Amit Mehta",
      personOneAge: 30,
      personOneLocation: "Mumbai",
      personOneProfession: "Business Owner",
      personTwo: "Neha Kulkarni",
      personTwoAge: 28,
      personTwoLocation: "Pune",
      personTwoProfession: "HR Manager",
      matchDate: "11 Aug 2026",
      status: "Mutual",
      compatibility: "91%",
      oneInitial: "A",
      twoInitial: "N",
    },
    {
      id: 3,
      personOne: "Karan Singh",
      personOneAge: 31,
      personOneLocation: "Jaipur",
      personOneProfession: "Architect",
      personTwo: "Riya Sharma",
      personTwoAge: 26,
      personTwoLocation: "Delhi",
      personTwoProfession: "Software Engineer",
      matchDate: "10 Aug 2026",
      status: "New",
      compatibility: "88%",
      oneInitial: "K",
      twoInitial: "R",
    },
    {
      id: 4,
      personOne: "Arjun Rao",
      personOneAge: 30,
      personOneLocation: "Hyderabad",
      personOneProfession: "Product Manager",
      personTwo: "Sneha Patel",
      personTwoAge: 25,
      personTwoLocation: "Ahmedabad",
      personTwoProfession: "Doctor",
      matchDate: "09 Aug 2026",
      status: "Mutual",
      compatibility: "89%",
      oneInitial: "A",
      twoInitial: "S",
    },
    {
      id: 5,
      personOne: "Rohit Malhotra",
      personOneAge: 29,
      personOneLocation: "Chandigarh",
      personOneProfession: "CA",
      personTwo: "Pooja Mehta",
      personTwoAge: 27,
      personTwoLocation: "Gurgaon",
      personTwoProfession: "Teacher",
      matchDate: "08 Aug 2026",
      status: "New",
      compatibility: "86%",
      oneInitial: "R",
      twoInitial: "P",
    },
    {
      id: 6,
      personOne: "Vikas Gupta",
      personOneAge: 32,
      personOneLocation: "Noida",
      personOneProfession: "Marketing Manager",
      personTwo: "Anjali Patil",
      personTwoAge: 28,
      personTwoLocation: "Mumbai",
      personTwoProfession: "Designer",
      matchDate: "07 Aug 2026",
      status: "Closed",
      compatibility: "79%",
      oneInitial: "V",
      twoInitial: "A",
    },
  ];

  const filteredMatches = matches.filter((match) => {
    const query = search.toLowerCase();

    const matchesSearch =
      match.personOne.toLowerCase().includes(query) ||
      match.personTwo.toLowerCase().includes(query) ||
      match.personOneLocation.toLowerCase().includes(query) ||
      match.personTwoLocation.toLowerCase().includes(query);

    const matchesStatus =
      status === "All" || match.status === status;

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


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Heading */}
        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Match Management
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Monitor successful connections and compatibility between members.
          </p>

        </div>


        {/* ================= STATS ================= */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Total Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
              2,486
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Successful connections
            </p>
          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              New Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#b36b11]">
              84
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Created this month
            </p>
          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Mutual Matches
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#287b51]">
              1,932
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Both members interested
            </p>
          </div>


          <div className="rounded-xl border border-[#eadfce] bg-white p-5">
            <p className="text-[9px] text-[#9a806f]">
              Success Rate
            </p>

            <p className="mt-1 font-serif text-[27px] font-semibold text-[#8c1d18]">
              78.4%
            </p>

            <p className="mt-1 text-[8px] text-[#9a806f]">
              Overall match success
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
                placeholder="Search member name or location..."
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
              <option value="New">New</option>
              <option value="Mutual">Mutual</option>
              <option value="Closed">Closed</option>
            </select>

          </div>

        </div>


        {/* ================= MATCH LIST ================= */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="border-b border-[#eadfce] px-5 py-4">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Successful Matches
            </h3>

            <p className="mt-0.5 text-[9px] text-[#9a806f]">
              Showing {filteredMatches.length} matches
            </p>

          </div>


          {/* Desktop */}
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

                  <th className="px-4 py-3 text-center text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                    Compatibility
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

                {filteredMatches.map((match) => (

                  <tr
                    key={match.id}
                    className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                  >

                    {/* Members */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                          {match.oneInitial}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {match.personOne}
                          </p>

                          <p className="text-[8px] text-[#9a806f]">
                            {match.personOneAge} yrs • {match.personOneProfession}
                          </p>

                        </div>

                        <span className="mx-1 text-[12px] text-[#d92c2c]">
                          ♥
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[12px] font-semibold text-[#8c1d18]">
                          {match.twoInitial}
                        </div>

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {match.personTwo}
                          </p>

                          <p className="text-[8px] text-[#9a806f]">
                            {match.personTwoAge} yrs • {match.personTwoProfession}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Locations */}
                    <td className="px-4 py-4">

                      <p className="text-[9px] text-[#806653]">
                        📍 {match.personOneLocation}
                      </p>

                      <p className="mt-1 text-[9px] text-[#806653]">
                        📍 {match.personTwoLocation}
                      </p>

                    </td>


                    {/* Compatibility */}
                    <td className="px-4 py-4 text-center">

                      <span className="rounded-full bg-[#e7f6ed] px-3 py-1 text-[9px] font-semibold text-[#287b51]">
                        {match.compatibility}
                      </span>

                    </td>


                    {/* Date */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {match.matchDate}
                    </td>


                    {/* Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[8px] font-semibold
                          ${
                            match.status === "New"
                              ? "bg-[#fff1d8] text-[#b36b11]"
                              : match.status === "Mutual"
                                ? "bg-[#e7f6ed] text-[#287b51]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                          }
                        `}
                      >
                        {match.status}
                      </span>

                    </td>


                    {/* Action */}
                    <td className="px-4 py-4">

                      <button
                        type="button"
                        onClick={() => setSelectedMatch(match)}
                        className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] font-semibold text-[#8c1d18] transition hover:bg-[#fff5e8]"
                      >
                        View Match
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* ================= MOBILE ================= */}
          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredMatches.map((match) => (

              <div
                key={match.id}
                className="p-4"
              >

                <div className="flex items-center justify-center gap-3">

                  <div className="text-center">

                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
                      {match.oneInitial}
                    </div>

                    <p className="mt-1 text-[9px] font-semibold text-[#4f3425]">
                      {match.personOne}
                    </p>

                  </div>


                  <div className="text-center">

                    <div className="text-[15px] text-[#d92c2c]">
                      ♥
                    </div>

                    <p className="text-[8px] text-[#287b51]">
                      {match.compatibility}
                    </p>

                  </div>


                  <div className="text-center">

                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[13px] font-semibold text-[#8c1d18]">
                      {match.twoInitial}
                    </div>

                    <p className="mt-1 text-[9px] font-semibold text-[#4f3425]">
                      {match.personTwo}
                    </p>

                  </div>

                </div>


                <div className="mt-4 flex items-center justify-between">

                  <div>

                    <p className="text-[8px] text-[#9a806f]">
                      Match Date
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#806653]">
                      {match.matchDate}
                    </p>

                  </div>

                  <span
                    className={`
                      rounded-full px-2.5 py-1 text-[8px] font-semibold
                      ${
                        match.status === "New"
                          ? "bg-[#fff1d8] text-[#b36b11]"
                          : match.status === "Mutual"
                            ? "bg-[#e7f6ed] text-[#287b51]"
                            : "bg-[#f8e3e3] text-[#b63b3b]"
                      }
                    `}
                  >
                    {match.status}
                  </span>

                </div>


                <button
                  type="button"
                  onClick={() => setSelectedMatch(match)}
                  className="mt-3 w-full rounded-md border border-[#eadfce] py-2 text-[9px] font-semibold text-[#8c1d18]"
                >
                  View Match
                </button>

              </div>

            ))}

          </div>


          {/* Empty */}
          {filteredMatches.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                💞
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No matches found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Try changing your search or match status.
              </p>

            </div>
          )}

        </div>

      </main>


      {/* ================= MODAL ================= */}
      {selectedMatch && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

              <div>

                <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                  Match Details
                </p>

                <h3 className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  Successful Connection
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


            {/* Body */}
            <div className="p-5">

              {/* Members */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">

                {/* Person One */}
                <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[21px] font-semibold text-[#f5c45e]">
                    {selectedMatch.oneInitial}
                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedMatch.personOne}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.personOneAge} years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.personOneProfession}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍 {selectedMatch.personOneLocation}
                  </p>

                </div>


                {/* Heart */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff0f0] text-[18px] text-[#d92c2c]">
                  ♥
                </div>


                {/* Person Two */}
                <div className="w-full rounded-xl bg-[#fffaf5] p-5 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4e2c2] font-serif text-[21px] font-semibold text-[#8c1d18]">
                    {selectedMatch.twoInitial}
                  </div>

                  <h4 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                    {selectedMatch.personTwo}
                  </h4>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.personTwoAge} years
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    {selectedMatch.personTwoProfession}
                  </p>

                  <p className="mt-1 text-[9px] text-[#806653]">
                    📍 {selectedMatch.personTwoLocation}
                  </p>

                </div>

              </div>


              {/* Compatibility */}
              <div className="mt-5 rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5 text-center">

                <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                  Compatibility Score
                </p>

                <p className="mt-2 font-serif text-[36px] font-semibold text-[#8c1d18]">
                  {selectedMatch.compatibility}
                </p>

                <div className="mx-auto mt-2 h-2 max-w-[300px] overflow-hidden rounded-full bg-[#eadfce]">

                  <div
                    className="h-full rounded-full bg-[#8c1d18]"
                    style={{
                      width: selectedMatch.compatibility,
                    }}
                  />

                </div>

                <p className="mt-2 text-[9px] text-[#806653]">
                  Based on profile preferences and mutual interests.
                </p>

              </div>


              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Match Date
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {selectedMatch.matchDate}
                  </p>
                </div>


                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Status
                  </p>

                  <p className="mt-1 text-[10px] font-medium text-[#287b51]">
                    {selectedMatch.status}
                  </p>
                </div>

              </div>


              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="mt-5 w-full rounded-lg bg-[#8c1d18] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#701510]"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MatchesPage;