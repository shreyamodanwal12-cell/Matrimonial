import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function EditMemberPage() {
  const [member, setMember] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileStatus, setProfileStatus] = useState("Pending");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= GET MEMBER ID =================
  const memberId =
    window.location.pathname.split("/").pop();

  // ================= FETCH MEMBER =================
  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login required");
      }

   const response = await fetch(
  `${API_BASE_URL}/api/admin/members/${memberId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      console.log("Edit Member Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch member"
        );
      }

      const user = data.profile || data.user;

      setMember(user);

      setFullName(user?.full_name || "");
      setEmail(user?.email || "");
      setMobile(user?.mobile || "");
      setProfileStatus(
        user?.profile_status || "Pending"
      );
      setIsActive(
        user?.is_active ?? true
      );
    } catch (err) {
      console.error("Fetch Member Error:", err);
      setError(
        err.message || "Unable to load member"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= SAVE MEMBER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login required");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/members/${memberId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            full_name: fullName,
            email,
            mobile,
            profile_status: profileStatus,
            is_active: isActive,
          }),
        }
      );

      const data = await response.json();

      console.log("Update Member Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update member"
        );
      }

      setSuccess("Member updated successfully.");

      setMember(data.member || member);
    } catch (err) {
      console.error("Update Member Error:", err);

      setError(
        err.message || "Unable to update member"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] p-10 text-center">
        <p className="text-[13px] text-[#806653]">
          Loading member...
        </p>
      </div>
    );
  }

  // ================= ERROR =================
  if (error && !member) {
    return (
      <div className="min-h-screen bg-[#faf7f2] p-10 text-center">
        <p className="text-[13px] text-red-700">
          {error}
        </p>

        <button
          type="button"
          onClick={fetchMember}
          className="mt-4 rounded-lg bg-[#8c1d18] px-5 py-2 text-[10px] text-white"
        >
          Retry
        </button>
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
            Edit Member
          </h1>
        </div>

        <button
          type="button"
          onClick={() =>
            (window.location.href =
              "/admin/members")
          }
          className="rounded-lg border border-[#eadfce] bg-white px-4 py-2 text-[10px] font-semibold text-[#8c1d18] hover:bg-[#fff5e8]"
        >
          ← Back to Members
        </button>

      </header>

      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-[900px] p-4 sm:p-7">

        <div className="rounded-xl border border-[#eadfce] bg-white p-5 shadow-[0_4px_18px_rgba(73,38,20,0.04)] sm:p-7">

          <div className="mb-6">
            <h2 className="font-serif text-[24px] font-semibold text-[#4a1712]">
              Member Information
            </h2>

            <p className="mt-1 text-[10px] text-[#9a806f]">
              Update the basic account information of this member.
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mb-5 rounded-lg border border-[#cce8d7] bg-[#eaf7ef] px-4 py-3 text-[10px] text-[#287b51]">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-lg border border-[#f0cccc] bg-[#fff0f0] px-4 py-3 text-[10px] text-[#b63b3b]">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* FULL NAME */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="h-10 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#8c1d18]"
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="h-10 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#8c1d18]"
                required
              />
            </div>

            {/* MOBILE */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                Mobile
              </label>

              <input
                type="text"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    ).slice(0, 10)
                  )
                }
                className="h-10 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#8c1d18]"
                maxLength={10}
              />
            </div>

            {/* PROFILE STATUS */}
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                Profile Status
              </label>

              <select
                value={profileStatus}
                onChange={(e) =>
                  setProfileStatus(
                    e.target.value
                  )
                }
                className="h-10 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#8c1d18]"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>

                <option value="Suspended">
                  Suspended
                </option>
              </select>
            </div>

            {/* ACTIVE */}
            <div className="flex items-center justify-between rounded-lg border border-[#eadfce] bg-[#fffaf5] px-4 py-3">

              <div>
                <p className="text-[10px] font-semibold text-[#563927]">
                  Account Active
                </p>

                <p className="mt-0.5 text-[8px] text-[#9a806f]">
                  Enable or disable this member account.
                </p>
              </div>

              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) =>
                  setIsActive(
                    e.target.checked
                  )
                }
                className="h-4 w-4 accent-[#8c1d18]"
              />

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 border-t border-[#eadfce] pt-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  (window.location.href =
                    "/admin/members")
                }
                className="rounded-lg border border-[#eadfce] px-5 py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-[#fffaf5]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#8c1d18] px-6 py-2.5 text-[10px] font-semibold text-white hover:bg-[#701510] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default EditMemberPage;