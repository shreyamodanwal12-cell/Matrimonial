import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function AccountActivityPage() {
  const [hiddenProfiles, setHiddenProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
const [reports, setReports] = useState([]);
const [reportsLoading, setReportsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchHiddenProfiles = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profiles/hidden`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch hidden profiles");
      }

      setHiddenProfiles(data.profiles || []);
    } catch (error) {
      console.error("Get hidden profiles error:", error);
    } finally {
      setLoading(false);
    }
  };
const fetchMyReports = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/profiles/reports`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to fetch reports");
    }

    setReports(data.reports || []);
  } catch (error) {
    console.error("Get reports error:", error);
  } finally {
    setReportsLoading(false);
  }
};
  useEffect(() => {
    fetchHiddenProfiles();
    fetchMyReports();
  }, []);

  const handleUnhide = async (userId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profiles/hide/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to unhide profile");
      }

      setHiddenProfiles((previous) =>
        previous.filter((profile) => profile.id !== userId)
      );
    } catch (error) {
      console.error("Unhide profile error:", error);
      alert(error.message || "Unable to unhide profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-4 py-8">
      <button
  type="button"
  onClick={() => window.history.back()}
  className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#eadfce] bg-white px-4 py-2 text-[10px] font-semibold text-[#563927] hover:bg-[#fff5e8]"
>
  ← Back
</button>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-semibold text-[#563927] mb-2">
          Account Activity
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Manage your account activity, interests, hidden profiles,
          blocked profiles and reports.
        </p>
<a
  href="/interest-requests"
  className="block rounded-xl border border-[#eadfce] bg-white px-4 py-3 hover:bg-[#fff5e8]"
>
  <p className="text-[11px] font-semibold text-[#563927]">
    💌 Interest Requests
  </p>
  <p className="mt-1 text-[9px] text-[#9a806f]">
    View interest requests received from other profiles
  </p>
</a>

<a
  href="/my-interests"
  className="block rounded-xl border border-[#eadfce] bg-white px-4 py-3 hover:bg-[#fff5e8]"
>
  <p className="text-[11px] font-semibold text-[#563927]">
    ❤️ My Interests
  </p>
  <p className="mt-1 text-[9px] text-[#9a806f]">
    View interests you have sent to other profiles
  </p>
</a>
        {/* Hidden Profiles */}
        <div className="bg-white border border-[#f0e2d3] rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[#563927]">
            👁️ Hidden Profiles
          </h2>

          {loading ? (
            <p className="text-sm text-gray-500 mt-4">
              Loading...
            </p>
          ) : hiddenProfiles.length === 0 ? (
            <p className="text-sm text-gray-500 mt-4">
              You haven't hidden any profiles.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {hiddenProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between border border-[#f0e2d3] rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">

                    {profile.profile_photo ? (
                      <img
                        src={profile.profile_photo}
                        alt={profile.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#f5e5d5] flex items-center justify-center">
                        👤
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-[#563927]">
                        {profile.full_name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleUnhide(profile.id)}
                    className="px-4 py-2 text-sm rounded-lg bg-[#563927] text-white hover:bg-[#40291d]"
                  >
                    Unhide
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Reports */}
<div className="bg-white border border-[#f0e2d3] rounded-xl p-5">
  <h2 className="text-lg font-semibold text-[#563927]">
    🚩 Reports
  </h2>

  {reportsLoading ? (
    <p className="text-sm text-gray-500 mt-4">
      Loading reports...
    </p>
  ) : reports.length === 0 ? (
    <p className="text-sm text-gray-500 mt-4">
      You haven't reported any profiles.
    </p>
  ) : (
    <div className="mt-4 space-y-3">
      {reports.map((report) => (
        <div
          key={report.id}
          className="border border-[#f0e2d3] rounded-lg p-3"
        >
          <div className="flex items-center gap-3">

            {report.reportedUser?.profile_photo ? (
              <img
                src={report.reportedUser.profile_photo}
                alt={report.reportedUser.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#f5e5d5] flex items-center justify-center">
                👤
              </div>
            )}

            <div className="flex-1">
              <p className="font-medium text-[#563927]">
                {report.reportedUser?.full_name || "Unknown User"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Reason: {report.reason}
              </p>

              <p className="text-xs text-gray-500">
                Status:{" "}
                <span className="font-medium">
                  {report.status}
                </span>
              </p>
            </div>

          </div>

          {report.explanation && (
            <p className="text-xs text-gray-500 mt-3">
              Explanation: {report.explanation}
            </p>
          )}

          {report.admin_note && (
            <p className="text-xs text-[#563927] mt-2">
              Admin Note: {report.admin_note}
            </p>
          )}
        </div>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default AccountActivityPage;