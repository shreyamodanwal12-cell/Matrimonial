import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";
function AdminDashboard() {
  const [profiles, setProfiles] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


useEffect(() => {
  fetchDashboardData();
}, []);

const fetchDashboardData = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Admin login required");
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/profiles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Dashboard Profiles Response:", data);

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to fetch dashboard data"
      );
    }
console.log("All Dashboard Profiles:", data.profiles);
console.log(
  "Membership Data JSON:",
  JSON.stringify(
    data.profiles?.map((p) => ({
      name: p.full_name,
      membership: p.memberships,
    })),
    null,
    2
  )
);

console.log(
  "Payment Data JSON:",
  JSON.stringify(
    data.profiles?.map((p) => ({
      name: p.full_name,
      payments: p.payments,
    })),
    null,
    2
  )
);
console.log(
  "Profile Statuses:",
  data.profiles?.map((p) => ({
    name: p.full_name,
    status: p.profile_status,
  }))
);

console.log(
  "Gender Data:",
  data.profiles?.map((p) => ({
    name: p.full_name,
    gender:
      p.matrimonial_profiles?.[0]?.gender ||
      p.matrimonial_profiles?.gender ||
      "No Gender",
  }))
);
    setProfiles(data.profiles || []);
  } catch (error) {
    console.error("Dashboard Error:", error);
    setError(error.message || "Unable to load dashboard");
  } finally {
    setLoading(false);
  }
};
const totalMembers = profiles.length;

const maleMembers = profiles.filter((profile) => {
  const matrimonial =
    profile.matrimonial_profiles?.[0] ||
    profile.matrimonial_profiles ||
    {};

  return (
    matrimonial.gender?.toLowerCase() === "male"
  );
}).length;

const femaleMembers = profiles.filter((profile) => {
  const matrimonial =
    profile.matrimonial_profiles?.[0] ||
    profile.matrimonial_profiles ||
    {};

  return (
    matrimonial.gender?.toLowerCase() === "female"
  );
}).length;

const pendingProfiles = profiles.filter(
  (profile) =>
    (profile.profile_status || "Pending").toLowerCase() ===
    "pending"
).length;
const stats = [
  {
    title: "Total Members",
    value: totalMembers,
    change: "Current",
    icon: "👥",
  },
  {
    title: "Male Members",
    value: maleMembers,
    change: "Current",
    icon: "👨",
  },
  {
    title: "Female Members",
    value: femaleMembers,
    change: "Current",
    icon: "👩",
  },
  {
    title: "Pending Profiles",
    value: pendingProfiles,
    change: "Needs Review",
    icon: "⏳",
  },
];
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
const registrations = [...profiles]
  .sort(
    (a, b) =>
      new Date(b.created_at || 0) -
      new Date(a.created_at || 0)
  )
  .slice(0, 5)
  .map((profile) => {
    const matrimonial =
      profile.matrimonial_profiles?.[0] ||
      profile.matrimonial_profiles ||
      {};

    const name =
      profile.full_name || "Unknown Member";

   return {
  id: profile.id,
  name,

  age: matrimonial.birth_date
    ? calculateAge(matrimonial.birth_date)
    : "-",

  location:
    matrimonial.state ||
    matrimonial.native_place ||
    "Not specified",

  status:
    profile.profile_status || "Pending",

  // =========================
  // MEMBERSHIP / PACKAGE
  // =========================
  package:
    profile.memberships?.length > 0
      ? profile.memberships[profile.memberships.length - 1].plan_name
      : "No Package",

  membershipStatus:
    profile.memberships?.length > 0
      ? profile.memberships[profile.memberships.length - 1].status
      : "No Membership",

  // =========================
  // PAYMENT
  // =========================
  paymentStatus:
    profile.payments?.length > 0
      ? profile.payments[profile.payments.length - 1].payment_status
      : "No Payment",

  initial:
    name.charAt(0).toUpperCase(),
};
  });

  const pendingApprovals = profiles
  .filter(
    (profile) =>
      (profile.profile_status || "Pending").toLowerCase() ===
      "pending"
  )
  .slice(0, 5)
  .map((profile) => {
    const matrimonial =
      profile.matrimonial_profiles?.[0] ||
      profile.matrimonial_profiles ||
      {};

    const name =
      profile.full_name || "Unknown Member";

    const gender =
      matrimonial.gender || "Unknown";

    const age = matrimonial.birth_date
      ? calculateAge(matrimonial.birth_date)
      : "-";

    return [
      name.charAt(0).toUpperCase(),
      name,
      `${gender} • ${age}`,
    ];
  });
if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
      <p className="text-[13px] text-[#806653]">
        Loading dashboard...
      </p>
    </div>
  );
}
if (error) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
      <p className="text-[13px] text-red-700">
        {error}
      </p>
    </div>
  );
}
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
  Package
</th>

<th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
  Payment
</th>
<th className="px-4 py-3 text-[9px] font-semibold uppercase tracking-[1px] text-[#9a806f]">
  Membership
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

{/* Package */}
<td className="px-4 py-3.5">
  <span className="rounded-full bg-[#f4e2c2] px-2.5 py-1 text-[8px] font-semibold text-[#8c1d18]">
    {member.package}
  </span>
</td>

{/* Payment */}
<td className="px-4 py-3.5">
  <span
    className={`
      rounded-full px-2.5 py-1 text-[8px] font-semibold
      ${
        member.paymentStatus?.toLowerCase() === "paid"
          ? "bg-[#e7f6ed] text-[#287b51]"
          : member.paymentStatus?.toLowerCase() === "pending"
          ? "bg-[#fff1d8] text-[#b36b11]"
          : "bg-[#f8e3e3] text-[#a33b32]"
      }
    `}
  >
    {member.paymentStatus}
  </span>
</td>
{/* Membership */}
<td className="px-4 py-3.5">
  <span
    className={`
      rounded-full px-2.5 py-1 text-[8px] font-semibold
      ${
        member.membershipStatus?.toLowerCase() === "active"
          ? "bg-[#e7f6ed] text-[#287b51]"
          : "bg-[#f8e3e3] text-[#a33b32]"
      }
    `}
  >
    {member.membershipStatus}
  </span>
</td>


                      {/* Action */}
                      <td className="px-4 py-3.5">

                       <button
  type="button"
  onClick={() => {
    window.location.href = `/admin/profiles?view=${member.id}`;
  }}
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
  {pendingProfiles} Pending
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