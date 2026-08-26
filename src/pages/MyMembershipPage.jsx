import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";
function MyMembershipPage() {
  const [profiles, setProfiles] = useState([]);
const [membership, setMembership] = useState(null);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  useEffect(() => {
  const fetchMembership = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/membership/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Membership Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch membership"
        );
      }

      const memberships = data.memberships || [];

      if (memberships.length === 0) {
        setMembership(null);
        return;
      }

      // Latest membership
      setMembership(memberships[0]);

    } catch (error) {
      console.error("Membership Error:", error);
      setError(error.message || "Unable to fetch membership");
      setMembership(null);
    } finally {
      setLoading(false);
    }
  };

  fetchMembership();
}, []);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf4]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eadfce] border-t-[#8c1d18]" />

          <p className="mt-4 text-[11px] text-[#806653]">
            Loading membership...
          </p>
        </div>
      </div>
    );
  }

  if (error || !membership) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf4] px-5">
        <div className="w-full max-w-[500px] rounded-2xl border border-[#eadfce] bg-white p-10 text-center shadow-[0_10px_35px_rgba(73,38,20,0.08)]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f0] text-[25px] text-[#b83232]">
            !
          </div>

          <h2 className="mt-5 font-serif text-[28px] font-semibold text-[#4a1712]">
            No Membership Found
          </h2>

          <p className="mt-2 text-[10px] text-[#806653]">
            You currently do not have an active membership.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="mt-7 h-11 w-full rounded-lg bg-[#8c1d18] text-[10px] font-semibold text-white"
          >
            Go to Home
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#3c2415]">

      {/* HEADER */}
      <header className="border-b border-[#eadfce] bg-white">

        <div className="mx-auto flex max-w-[1150px] items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[20px] text-[#f5c45e]">
              ॐ
            </div>

            <div>
              <h1 className="font-serif text-[18px] font-semibold text-[#8c1d18]">
                Shiva Parvati
              </h1>

              <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                Matrimonial
              </p>
            </div>

          </div>

        </div>

      </header>


      {/* CONTENT */}
      <main className="flex min-h-[calc(100vh-75px)] items-center justify-center px-5 py-12">

        <div className="w-full max-w-[700px]">

          {/* TITLE */}
          <div className="mb-7 text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
              My Account
            </p>

            <h2 className="mt-2 font-serif text-[34px] font-semibold text-[#4a1712] sm:text-[40px]">
              My Membership
            </h2>

            <p className="mt-2 text-[10px] text-[#806653]">
              Manage and view your current matrimonial membership.
            </p>

          </div>


          {/* MEMBERSHIP CARD */}
          <div className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-[0_10px_35px_rgba(73,38,20,0.08)] sm:p-8">

            {/* PLAN HEADER */}
            <div className="flex flex-col gap-5 border-b border-[#f0e7dc] pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[8px] font-semibold uppercase tracking-[1.5px] text-[#a67c35]">
                  Current Plan
                </p>

                <h3 className="mt-1 font-serif text-[30px] font-semibold text-[#8c1d18]">
                  {membership.plan_name}
                </h3>

                <p className="mt-1 text-[10px] text-[#806653]">
                  {membership.duration} membership
                </p>

              </div>

              <span className="w-fit rounded-full bg-[#e7f6ed] px-4 py-2 text-[9px] font-semibold text-[#287b51]">
                ● {membership.status}
              </span>

            </div>


            {/* DETAILS */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#9a806f]">
                  Amount Paid
                </p>

                <p className="mt-2 font-serif text-[24px] font-semibold text-[#4a1712]">
                  ₹{membership.amount}
                </p>

              </div>


              <div className="rounded-xl border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#9a806f]">
                  Duration
                </p>

                <p className="mt-2 font-serif text-[20px] font-semibold text-[#4a1712]">
                  {membership.duration}
                </p>

              </div>


              <div className="rounded-xl border border-[#eadfce] bg-white p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#9a806f]">
                  Start Date
                </p>

                <p className="mt-2 text-[11px] font-semibold text-[#4f3425]">
                  {formatDate(membership.start_date)}
                </p>

              </div>


              <div className="rounded-xl border border-[#eadfce] bg-white p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#9a806f]">
                  Expiry Date
                </p>

                <p className="mt-2 text-[11px] font-semibold text-[#4f3425]">
                  {formatDate(membership.end_date)}
                </p>

              </div>

            </div>


            {/* MEMBERSHIP STATUS */}
            <div className="mt-6 rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f6ed] text-[18px] text-[#287b51]">
                  ✓
                </div>

                <div>

                  <p className="text-[9px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                    Membership Status
                  </p>

                  <p className="mt-1 text-[13px] font-semibold text-[#287b51]">
                    Your membership is active
                  </p>

                </div>

              </div>

            </div>


            {/* BUTTON */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-7 h-11 w-full rounded-lg bg-[#8c1d18] text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(140,29,24,0.16)] transition hover:-translate-y-0.5 hover:bg-[#711611]"
            >
              Go to Home
            </button>

          </div>


          {/* BOTTOM MESSAGE */}
          <p className="mt-6 text-center font-serif text-[17px] italic text-[#751b17]">
            “Your beautiful story begins here.”
          </p>

        </div>

      </main>

    </div>
  );
}

export default MyMembershipPage;