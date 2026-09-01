import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function ReportsPage() {
  const [period, setPeriod] = useState("This Year");

  const [reports, setReports] = useState({
    totalMembers: 0,
    activeProfiles: 0,
    totalInterests: 0,
    acceptedInterests: 0,
    pendingInterests: 0,
    rejectedInterests: 0,
    malePercentage: 0,
    femalePercentage: 0,
    acceptedPercentage: 0,
    pendingPercentage: 0,
    rejectedPercentage: 0,
    monthlyData: [],
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================================
  // FETCH REPORTS
  // =====================================================

 const fetchReports = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    let periodValue = "year";

    if (period === "This Week") {
      periodValue = "week";
    } else if (period === "This Month") {
      periodValue = "month";
    }

const periodMap = {
  "This Week": "week",
  "This Month": "month",
  "This Year": "year",
};

const selectedPeriod = periodMap[period];

const response = await fetch(
  `${API_BASE_URL}/api/reports/admin?period=${selectedPeriod}`,
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
        data.message || "Failed to fetch reports"
      );
    }

    setReports(data.reports || {});

  } catch (error) {
    console.error(
      "Fetch reports error:",
      error
    );

    setError(
      error.message ||
        "Unable to load reports"
    );

  } finally {
    setLoading(false);
  }
};


 useEffect(() => {
  fetchReports();
}, [period]);


  // =====================================================
  // DATA
  // =====================================================

  const monthlyData = reports.monthlyData || [];

  const maxRegistrations = Math.max(
    ...monthlyData.map(
      (item) => item.registrations || 0
    ),
    1
  );


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#eadfce] border-t-[#8c1d18]" />

          <p className="mt-3 text-[10px] text-[#806653]">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf7f2] p-6">

        <div className="mx-auto max-w-[700px] rounded-xl border border-[#eadfce] bg-white p-8 text-center">

          <div className="text-3xl">
            ⚠️
          </div>

          <h2 className="mt-3 font-serif text-[22px] font-semibold text-[#4a1712]">
            Unable to load reports
          </h2>

          <p className="mt-2 text-[10px] text-[#9a806f]">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchReports}
            className="mt-5 rounded-lg bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#701510]"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ================= TOPBAR ================= */}

      <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 backdrop-blur sm:px-7">

        <div>

          <p className="text-[9px] uppercase tracking-[2px] text-[#a67c35]">
            Admin Workspace
          </p>

          <h1 className="font-serif text-[24px] font-semibold text-[#4a1712]">
            Reports & Analytics
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

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
              Platform Overview
            </h2>

            <p className="mt-1 text-[11px] text-[#8c7566]">
              Track member activity, requests, matches and platform growth.
            </p>

          </div>


          {/* Period */}

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 rounded-lg border border-[#eadfce] bg-white px-4 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
          >

            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>

          </select>

        </div>


        {/* ================= STAT CARDS ================= */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">


          {/* Members */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] text-[#9a806f]">
                  Total Members
                </p>

                <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
                  {reports.totalMembers.toLocaleString()}
                </p>

              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff1dc] text-[15px]">
                👥
              </div>

            </div>

            <p className="mt-3 text-[8px] text-[#9a806f]">
              Registered matrimonial members
            </p>

          </div>


          {/* Active */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] text-[#9a806f]">
                  Active Profiles
                </p>

                <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
                  {reports.activeProfiles.toLocaleString()}
                </p>

              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf7ef] text-[15px]">
                ✓
              </div>

            </div>

            <p className="mt-3 text-[8px] text-[#9a806f]">
              Active and approved profiles
            </p>

          </div>


          {/* Interests */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] text-[#9a806f]">
                  Interests Sent
                </p>

                <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
                  {reports.totalInterests.toLocaleString()}
                </p>

              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0f0] text-[15px]">
                ♥
              </div>

            </div>

            <p className="mt-3 text-[8px] text-[#9a806f]">
              Total connection requests
            </p>

          </div>


          {/* Matches */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-[9px] text-[#9a806f]">
                  Successful Matches
                </p>

                <p className="mt-1 font-serif text-[27px] font-semibold text-[#4a1712]">
                  {reports.acceptedInterests.toLocaleString()}
                </p>

              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7eaf0] text-[15px]">
                💞
              </div>

            </div>

            <p className="mt-3 text-[8px] text-[#9a806f]">
              Accepted connection requests
            </p>

          </div>

        </div>


        {/* ================= CHART + GENDER ================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">


          {/* Registration Chart */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <div className="flex items-start justify-between">

              <div>

                <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                  Platform Growth
                </h3>

                <p className="mt-1 text-[9px] text-[#9a806f]">
                  Monthly registrations and successful matches
                </p>

              </div>


              <div className="hidden items-center gap-4 sm:flex">

                <div className="flex items-center gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-[#8c1d18]" />

                  <span className="text-[8px] text-[#806653]">
                    Registrations
                  </span>

                </div>


                <div className="flex items-center gap-1.5">

                  <span className="h-2 w-2 rounded-full bg-[#d7a744]" />

                  <span className="text-[8px] text-[#806653]">
                    Matches
                  </span>

                </div>

              </div>

            </div>


            {/* Chart */}

            <div className="mt-8">

              <div className="flex h-[260px] items-end gap-2 border-b border-l border-[#eadfce] px-3 pb-0 sm:gap-4">

                {monthlyData.map((item) => {

                  const registrationHeight =
                    (item.registrations / maxRegistrations) * 190;

                  const matchHeight =
                    (item.matches / maxRegistrations) * 190;

                  return (

                    <div
                      key={item.month}
                      className="flex h-full flex-1 items-end justify-center gap-1"
                    >

                      <div className="group relative flex w-1/2 items-end justify-center">

                        <div
                          className="w-full max-w-[28px] rounded-t-md bg-[#8c1d18] transition hover:opacity-80"
                          style={{
                            height: `${registrationHeight}px`,
                          }}
                        />

                        <div className="absolute -top-6 hidden rounded bg-[#4a1712] px-1.5 py-1 text-[7px] text-white group-hover:block">
                          {item.registrations}
                        </div>

                      </div>


                      <div className="group relative flex w-1/2 items-end justify-center">

                        <div
                          className="w-full max-w-[28px] rounded-t-md bg-[#d7a744] transition hover:opacity-80"
                          style={{
                            height: `${matchHeight}px`,
                          }}
                        />

                        <div className="absolute -top-6 hidden rounded bg-[#4a1712] px-1.5 py-1 text-[7px] text-white group-hover:block">
                          {item.matches}
                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* Months */}

              <div className="ml-1 flex gap-2 px-3 pt-2 sm:gap-4">

                {monthlyData.map((item) => (

                  <div
                    key={item.month}
                    className="flex-1 text-center text-[8px] text-[#9a806f]"
                  >
                    {item.month}
                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* Gender Distribution */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Member Distribution
            </h3>

            <p className="mt-1 text-[9px] text-[#9a806f]">
              Current member demographics
            </p>


            {/* Donut */}

            <div className="mt-7 flex justify-center">

              <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(
                    #8c1d18 0deg ${
                      reports.malePercentage * 3.6
                    }deg,
                    #d7a744 ${
                      reports.malePercentage * 3.6
                    }deg 360deg
                  )`,
                }}
              >

                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">

                  <span className="font-serif text-[25px] font-semibold text-[#4a1712]">
                    {(
                      reports.totalMembers / 1000
                    ).toFixed(1)}
                    K
                  </span>

                  <span className="text-[8px] text-[#9a806f]">
                    Members
                  </span>

                </div>

              </div>

            </div>


            {/* Legend */}

            <div className="mt-7 space-y-3">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#8c1d18]" />

                  <span className="text-[10px] text-[#806653]">
                    Male
                  </span>

                </div>

                <span className="text-[10px] font-semibold text-[#4a1712]">
                  {reports.malePercentage}%
                </span>

              </div>


              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#d7a744]" />

                  <span className="text-[10px] text-[#806653]">
                    Female
                  </span>

                </div>

                <span className="text-[10px] font-semibold text-[#4a1712]">
                  {reports.femalePercentage}%
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ================= LOWER SECTION ================= */}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">


          {/* Interest Analytics */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Interest Analytics
            </h3>

            <p className="mt-1 text-[9px] text-[#9a806f]">
              Current connection request performance
            </p>


            <div className="mt-6 space-y-5">


              {/* Accepted */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-[9px] text-[#806653]">
                    Accepted Interests
                  </span>

                  <span className="text-[9px] font-semibold text-[#287b51]">
                    {reports.acceptedPercentage}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eee4d8]">

                  <div
                    className="h-full rounded-full bg-[#287b51]"
                    style={{
                      width: `${reports.acceptedPercentage}%`,
                    }}
                  />

                </div>

              </div>


              {/* Pending */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-[9px] text-[#806653]">
                    Pending Interests
                  </span>

                  <span className="text-[9px] font-semibold text-[#b36b11]">
                    {reports.pendingPercentage}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eee4d8]">

                  <div
                    className="h-full rounded-full bg-[#d7a744]"
                    style={{
                      width: `${reports.pendingPercentage}%`,
                    }}
                  />

                </div>

              </div>


              {/* Rejected */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-[9px] text-[#806653]">
                    Rejected Interests
                  </span>

                  <span className="text-[9px] font-semibold text-[#b63b3b]">
                    {reports.rejectedPercentage}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eee4d8]">

                  <div
                    className="h-full rounded-full bg-[#b63b3b]"
                    style={{
                      width: `${reports.rejectedPercentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* Platform Health */}

          <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Platform Health
            </h3>

            <p className="mt-1 text-[9px] text-[#9a806f]">
              Current system activity overview
            </p>


            <div className="mt-6 grid grid-cols-2 gap-3">


              <div className="rounded-lg bg-[#fffaf5] p-4">

                <p className="text-[8px] text-[#9a806f]">
                  Daily Active Users
                </p>

                <p className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  {reports.activeProfiles.toLocaleString()}
                </p>

                <p className="mt-1 text-[8px] text-[#287b51]">
                  Active
                </p>

              </div>


              <div className="rounded-lg bg-[#fffaf5] p-4">

                <p className="text-[8px] text-[#9a806f]">
                  Profile Completion
                </p>

                <p className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  {reports.totalMembers > 0
                    ? Math.round(
                        (reports.activeProfiles /
                          reports.totalMembers) *
                          100
                      )
                    : 0}
                  %
                </p>

                <p className="mt-1 text-[8px] text-[#287b51]">
                  Approved profiles
                </p>

              </div>


              <div className="rounded-lg bg-[#fffaf5] p-4">

                <p className="text-[8px] text-[#9a806f]">
                  Active Requests
                </p>

                <p className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  {reports.pendingInterests.toLocaleString()}
                </p>

                <p className="mt-1 text-[8px] text-[#b36b11]">
                  Pending
                </p>

              </div>


              <div className="rounded-lg bg-[#fffaf5] p-4">

                <p className="text-[8px] text-[#9a806f]">
                  Match Rate
                </p>

                <p className="mt-1 font-serif text-[22px] font-semibold text-[#4a1712]">
                  {reports.totalInterests > 0
                    ? Math.round(
                        (reports.acceptedInterests /
                          reports.totalInterests) *
                          100
                      )
                    : 0}
                  %
                </p>

                <p className="mt-1 text-[8px] text-[#287b51]">
                  Current rate
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RECENT ACTIVITY ================= */}

        <div className="mt-5 rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div>

            <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
              Recent Platform Activity
            </h3>

            <p className="mt-1 text-[9px] text-[#9a806f]">
              Latest important events
            </p>

          </div>


          <div className="mt-5 divide-y divide-[#eadfce]">

            {reports.recentActivity?.length > 0 ? (

              reports.recentActivity.map(
                (activity, index) => (

                  <div
                    key={`${activity.type}-${index}`}
                    className="flex items-center gap-3 py-4"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff5e8] text-[14px]">
                      {activity.icon}
                    </div>


                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 text-[8px] text-[#9a806f]">
                        {activity.description}
                      </p>

                    </div>


                    <span className="shrink-0 text-[8px] text-[#a38d7d]">
                      {activity.time}
                    </span>

                  </div>

                )
              )

            ) : (

              <div className="py-10 text-center">

                <div className="text-2xl">
                  📊
                </div>

                <p className="mt-2 text-[10px] text-[#9a806f]">
                  No recent activity found
                </p>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default ReportsPage;