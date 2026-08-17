function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "12,540",
      change: "+12.5%",
      icon: "👥",
    },
    {
      title: "Male Members",
      value: "6,230",
      change: "+8.2%",
      icon: "👨",
    },
    {
      title: "Female Members",
      value: "6,310",
      change: "+10.4%",
      icon: "👩",
    },
    {
      title: "Pending Profiles",
      value: "128",
      change: "Needs Review",
      icon: "⏳",
    },
  ];

  const registrations = [
    {
      name: "Priya Sharma",
      age: 27,
      location: "Bangalore",
      status: "Approved",
      initial: "P",
    },
    {
      name: "Rahul Verma",
      age: 29,
      location: "Delhi",
      status: "Pending",
      initial: "R",
    },
    {
      name: "Anjali Patil",
      age: 26,
      location: "Mumbai",
      status: "Approved",
      initial: "A",
    },
    {
      name: "Karthik Rao",
      age: 30,
      location: "Hyderabad",
      status: "Pending",
      initial: "K",
    },
  ];

  const pendingApprovals = [
    ["RS", "Riya Sharma", "Female • 26"],
    ["AM", "Amit Mehta", "Male • 29"],
    ["NK", "Neha Kulkarni", "Female • 27"],
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ================= TOPBAR ================= */}
      <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 backdrop-blur sm:px-7">

        {/* Left */}
        <div className="flex items-center gap-3">

          <div>
            <p className="text-[9px] uppercase tracking-[2px] text-[#a67c35]">
              Admin Workspace
            </p>

            <h2 className="font-serif text-[22px] font-semibold text-[#4a1712]">
              Dashboard
            </h2>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search */}
          <div className="hidden items-center rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 sm:flex">

            <span className="text-[#a67c35]">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-[130px] bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
            />

          </div>

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfce] text-[15px] text-[#6d5142] transition hover:bg-[#fff5e8]"
          >
            🔔

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d92c2c]" />
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
              A
            </div>

            <div className="hidden sm:block">

              <p className="text-[11px] font-semibold text-[#4a1712]">
                Administrator
              </p>

              <p className="text-[9px] text-[#9a806f]">
                Super Admin
              </p>

            </div>

          </div>

        </div>

      </header>


      {/* ================= DASHBOARD CONTENT ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* Welcome */}
        <div className="mb-7">

          <h1 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Welcome back, Admin 👋
          </h1>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Here's what's happening with your matrimonial platform today.
          </p>

        </div>


        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (

            <div
              key={stat.title}
              className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(73,38,20,0.08)]"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] text-[#8c7566]">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 font-serif text-[28px] font-semibold text-[#4a1712]">
                    {stat.value}
                  </h3>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff2dc] text-[19px]">
                  {stat.icon}
                </div>

              </div>

              <div className="mt-4">

                <span
                  className={
                    stat.title === "Pending Profiles"
                      ? "text-[9px] font-medium text-[#d17b16]"
                      : "text-[9px] font-medium text-[#26805b]"
                  }
                >
                  {stat.change}
                </span>

                {stat.title !== "Pending Profiles" && (
                  <span className="ml-1 text-[9px] text-[#a28c7c]">
                    from last month
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>


        {/* ================= CONTENT GRID ================= */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">

          {/* ================= RECENT REGISTRATIONS ================= */}
          <section className="rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.05)]">

            <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

              <div>

                <h2 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                  Recent Registrations
                </h2>

                <p className="mt-0.5 text-[9px] text-[#9a806f]">
                  Latest members who joined the platform
                </p>

              </div>

              <a
                href="/admin/members"
                className="text-[10px] font-semibold text-[#a67c35] hover:text-[#8c1d18]"
              >
                View All →
              </a>

            </div>


            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                    <th className="px-5 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Member
                    </th>

                    <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Age
                    </th>

                    <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Location
                    </th>

                    <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Status
                    </th>

                    <th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {registrations.map((member) => (

                    <tr
                      key={member.name}
                      className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                    >

                      {/* Member */}
                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8c1d18] text-[11px] font-semibold text-[#f5c45e]">
                            {member.initial}
                          </div>

                          <span className="text-[11px] font-medium text-[#4f3425]">
                            {member.name}
                          </span>

                        </div>

                      </td>


                      {/* Age */}
                      <td className="px-4 py-3.5 text-[10px] text-[#806653]">
                        {member.age}
                      </td>


                      {/* Location */}
                      <td className="px-4 py-3.5 text-[10px] text-[#806653]">
                        {member.location}
                      </td>


                      {/* Status */}
                      <td className="px-4 py-3.5">

                        <span
                          className={`
                            rounded-full px-2.5 py-1 text-[8px] font-semibold
                            ${
                              member.status === "Approved"
                                ? "bg-[#e7f6ed] text-[#287b51]"
                                : "bg-[#fff1d8] text-[#b36b11]"
                            }
                          `}
                        >
                          {member.status}
                        </span>

                      </td>


                      {/* Action */}
                      <td className="px-4 py-3.5">

                        <button
                          type="button"
                          className="text-[10px] font-semibold text-[#8c1d18] hover:text-[#d92c2c]"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* Mobile Cards */}
            <div className="divide-y divide-[#eadfce] md:hidden">

              {registrations.map((member) => (

                <div
                  key={member.name}
                  className="flex items-center justify-between gap-3 p-4"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] text-[11px] font-semibold text-[#f5c45e]">
                      {member.initial}
                    </div>

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        {member.name}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {member.age} • {member.location}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`
                      rounded-full px-2 py-1 text-[8px] font-semibold
                      ${
                        member.status === "Approved"
                          ? "bg-[#e7f6ed] text-[#287b51]"
                          : "bg-[#fff1d8] text-[#b36b11]"
                      }
                    `}
                  >
                    {member.status}
                  </span>

                </div>

              ))}

            </div>

          </section>


          {/* ================= PENDING APPROVALS ================= */}
          <section className="rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.05)]">

            <div className="border-b border-[#eadfce] px-5 py-4">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                    Pending Approvals
                  </h2>

                  <p className="mt-0.5 text-[9px] text-[#9a806f]">
                    Profiles waiting for review
                  </p>

                </div>

                <span className="rounded-full bg-[#fff1d8] px-2.5 py-1 text-[8px] font-semibold text-[#b36b11]">
                  128 Pending
                </span>

              </div>

            </div>


            <div className="space-y-3 p-5">

              {pendingApprovals.map(([initial, name, details]) => (

                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-[#eee4d8] bg-[#fffaf5] p-3"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e2c2] text-[10px] font-semibold text-[#8c1d18]">
                      {initial}
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        {name}
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        {details}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="rounded-md bg-[#8c1d18] px-3 py-1.5 text-[8px] font-semibold text-white transition hover:bg-[#6f1511]"
                  >
                    Review
                  </button>

                </div>

              ))}


              <a
                href="/admin/profiles"
                className="block pt-2 text-center text-[10px] font-semibold text-[#a67c35] hover:text-[#8c1d18]"
              >
                Review All Profiles →
              </a>

            </div>

          </section>

        </div>


        {/* ================= RECENT ACTIVITY ================= */}
        <section className="mt-6 rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.05)]">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                Recent Activity
              </h2>

              <p className="mt-0.5 text-[9px] text-[#9a806f]">
                Latest activity across the platform
              </p>

            </div>

            <button
              type="button"
              className="text-[10px] font-semibold text-[#a67c35] hover:text-[#8c1d18]"
            >
              View Activity →
            </button>

          </div>


          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">

            {/* Activity 1 */}
            <div className="rounded-lg bg-[#fffaf5] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f6ed] text-[14px]">
                  ✓
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#4f3425]">
                    Profile Approved
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#9a806f]">
                    5 minutes ago
                  </p>

                </div>

              </div>

            </div>


            {/* Activity 2 */}
            <div className="rounded-lg bg-[#fffaf5] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff1d8] text-[14px]">
                  👤
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#4f3425]">
                    New Member Registered
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#9a806f]">
                    18 minutes ago
                  </p>

                </div>

              </div>

            </div>


            {/* Activity 3 */}
            <div className="rounded-lg bg-[#fffaf5] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8e3e3] text-[14px]">
                  ⚑
                </div>

                <div>

                  <p className="text-[10px] font-semibold text-[#4f3425]">
                    New Report Received
                  </p>

                  <p className="mt-0.5 text-[8px] text-[#9a806f]">
                    32 minutes ago
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;