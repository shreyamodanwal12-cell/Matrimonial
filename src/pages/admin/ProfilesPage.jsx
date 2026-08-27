import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function ProfilesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setError("");

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_BASE_URL}/api/profiles`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to fetch profiles"
          );
        }

        setProfiles(data.profiles || []);

      } catch (error) {
        console.error("Featured Profiles Error:", error);
        setError(error.message || "Unable to load profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  


const updateProfileStatus = async (profileId, newStatus) => {
  try {
    setUpdatingStatus(true);

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/profiles/${profileId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile_status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to update profile status");
    }

    // Update profile in frontend
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId
          ? {
              ...profile,
              profile_status: newStatus,
            }
          : profile
      )
    );

    setSelectedProfile(null);

  } catch (error) {
    console.error("Update profile status error:", error);
    setError(error.message || "Unable to update profile status");
  } finally {
    setUpdatingStatus(false);
  }
};

const pendingCount = profiles.filter(
  (profile) => profile.profile_status === "Pending"
).length;

const approvedCount = profiles.filter(
  (profile) => profile.profile_status === "Approved"
).length;

const rejectedCount = profiles.filter(
  (profile) => profile.profile_status === "Rejected"
).length;
const filteredProfiles = profiles.filter((profile) => {
  const matrimonial = profile.matrimonial_profiles || {};
  const education = profile.education_details || {};

  const name = profile.full_name || "";

  const location =
    matrimonial.state ||
    matrimonial.native_place ||
    "";

  const profession =
    education.profession ||
    matrimonial.profession ||
    "";

  const matchesSearch =
    name.toLowerCase().includes(search.toLowerCase()) ||
    location.toLowerCase().includes(search.toLowerCase()) ||
    profession.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    status === "All" ||
    profile.profile_status === status;

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
              {pendingCount}
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
              {approvedCount}
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
             {rejectedCount}
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

                        {profile.profile_photo ? (
  <img
    src={profile.profile_photo}
    alt={profile.full_name}
    className="h-10 w-10 rounded-full object-cover"
  />
) : (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
    {(profile.full_name || "U").charAt(0).toUpperCase()}
  </div>
)}

                        <div>

                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {profile.full_name}
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
  {profile.education_details?.profession ||
    profile.matrimonial_profiles?.profession ||
    "Not specified"}
</p>

<p className="mt-0.5 text-[8px] text-[#9a806f]">
  {profile.matrimonial_profiles?.education || "Not specified"}
</p>

                    </td>


                    {/* Location */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
  {profile.matrimonial_profiles?.state ||
    profile.matrimonial_profiles?.native_place ||
    "Not specified"}
</td>


                    {/* Date */}
                    <td className="px-4 py-4 text-[10px] text-[#806653]">
  {profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available"}
</td>


                    {/* Status */}
                    <td className="px-4 py-4">

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[8px] font-semibold
                          ${
                            profile.profile_status === "Pending"
                              ? "bg-[#fff1d8] text-[#b36b11]"
                              : profile.profile_status === "Approved"
                                ? "bg-[#e7f6ed] text-[#287b51]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                          }
                        `}
                      >
                      {profile.profile_status}
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

                    {profile.profile_photo ? (
  <img
    src={profile.profile_photo}
    alt={profile.full_name}
    className="h-10 w-10 rounded-full object-cover"
  />
) : (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
    {(profile.full_name || "U").charAt(0).toUpperCase()}
  </div>
)}

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        {profile.full_name}
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
                 Review {selectedProfile.full_name}
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

                {selectedProfile.profile_photo ? (
  <img
    src={selectedProfile.profile_photo}
    alt={selectedProfile.full_name}
    className="h-16 w-16 rounded-full object-cover"
  />
) : (
  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[21px] font-semibold text-[#f5c45e]">
    {(selectedProfile.full_name || "U").charAt(0).toUpperCase()}
  </div>
)}

                <div>

                 <h4 className="font-serif text-[20px] font-semibold text-[#4a1712]">
  {selectedProfile.full_name}
</h4>

<p className="mt-1 text-[9px] text-[#806653]">
  {selectedProfile.email}
</p>

<p className="mt-1 text-[9px] text-[#806653]">
  {selectedProfile.mobile}
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
                    {selectedProfile.education_details?.profession ||
  selectedProfile.matrimonial_profiles?.profession ||
  "Not specified"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Education
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
                    {selectedProfile.matrimonial_profiles?.education ||
  selectedProfile.education_details?.highest_qualification ||
  "Not specified"}
                  </p>
                </div>

                {/* Registered */}
<div className="rounded-lg border border-[#eadfce] p-3">
  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
    Registered
  </p>

  <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
    {selectedProfile.created_at
      ? new Date(selectedProfile.created_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Not available"}
  </p>
</div>

                <div className="rounded-lg border border-[#eadfce] p-3">
                  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                    Current Status
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-[#b36b11]">
                    {selectedProfile.profile_status || "Pending"}
                  </p>

              </div>


              {/* About */}
              <div className="mt-4 rounded-lg border border-[#eadfce] p-4">

                <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
                  About Profile
                 </p>
<p className="mt-2 text-[10px] leading-6 text-[#806653]">
  {selectedProfile.matrimonial_profiles?.job_details ||
   selectedProfile.matrimonial_profiles?.address ||
   selectedProfile.matrimonial_profiles?.birth_place ||
   "No additional information available."}
</p>

              </div>


{/* Family Details */}
<div className="mt-4 rounded-lg border border-[#eadfce] p-4">

  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
    Family Details
  </p>

  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Father
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.father_name || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Father's Occupation
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.father_occupation || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Mother
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.mother_name || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Mother's Occupation
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.mother_occupation || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Brothers
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.brothers ?? "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Sisters
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.sisters ?? "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Family Type
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.family_type || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Family Status
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.family_details?.family_status || "Not specified"}
      </p>
    </div>

  </div>

</div>
          {/* Lifestyle & Partner Preferences */}
<div className="mt-4 rounded-lg border border-[#eadfce] p-4">

  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
    Lifestyle & Partner Preferences
  </p>

  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Diet
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.diet || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Hobbies
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.hobbies || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Smoking
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.smoking || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Drinking
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.drinking || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Interests
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.interests || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Partner Location
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.partner_location || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Partner Religion
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.partner_religion || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Partner Education
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.partner_education || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Partner Profession
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.partner_profession || "Not specified"}
      </p>
    </div>

    <div>
      <p className="text-[8px] text-[#9a806f]">
        Partner Age
      </p>
      <p className="mt-1 text-[10px] font-medium text-[#4f3425]">
        {selectedProfile.lifestyle_preferences?.partner_age_from != null &&
        selectedProfile.lifestyle_preferences?.partner_age_to != null
          ? `${selectedProfile.lifestyle_preferences.partner_age_from} - ${selectedProfile.lifestyle_preferences.partner_age_to} years`
          : "Not specified"}
      </p>
    </div>

  </div>

</div>  
{/* ================= PROFILE DOCUMENTS ================= */}
<div className="mt-4 rounded-lg border border-[#eadfce] p-4">

  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
    Profile Documents & Photos
  </p>

  {/* Photos */}
  <div className="mt-3 grid grid-cols-3 gap-3">

    {[1, 2, 3].map((num) => {
      const photo =
        selectedProfile.profile_documents?.[`photo_${num}`];

      return (
        <div key={num}>
          <p className="mb-1 text-[8px] text-[#9a806f]">
            Photo {num}
          </p>

          {photo ? (
            <a
              href={photo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={photo}
                alt={`Photo ${num}`}
                className="h-24 w-full rounded-lg border border-[#eadfce] object-cover hover:opacity-80"
              />
            </a>
          ) : (
            <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[#eadfce] text-[8px] text-[#9a806f]">
              Not uploaded
            </div>
          )}
        </div>
      );
    })}

  </div>

  {/* Aadhaar */}
  <div className="mt-4">

    <p className="text-[8px] text-[#9a806f]">
      Aadhaar Card
    </p>

    {selectedProfile.profile_documents?.aadhar_card ? (
      <a
        href={selectedProfile.profile_documents.aadhar_card}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex rounded-lg bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#701510]"
      >
        View Aadhaar Card
      </a>
    ) : (
      <p className="mt-2 text-[10px] text-[#9a806f]">
        Aadhaar card not uploaded
      </p>
    )}

  </div>

</div>
{/* Certificate */}
<div className="mt-4 rounded-lg border border-[#eadfce] p-4">

  <p className="text-[8px] uppercase tracking-[1px] text-[#a67c35]">
    Education Certificate
  </p>

  {selectedProfile.education_details?.certificate ? (
    <a
      href={selectedProfile.education_details.certificate}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex rounded-lg bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#701510]"
    >
      View Certificate
    </a>
  ) : (
    <p className="mt-2 text-[10px] text-[#9a806f]">
      Certificate not uploaded
    </p>
  )}

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
  disabled={updatingStatus}
  onClick={() =>
    updateProfileStatus(selectedProfile.id, "Rejected")
  }
  className="flex-1 rounded-lg border border-[#d9a0a0] bg-[#fff5f5] py-2.5 text-[10px] font-semibold text-[#b63b3b] hover:bg-[#fceaea] disabled:cursor-not-allowed disabled:opacity-60"
>
  {updatingStatus ? "Rejecting..." : "Reject"}
</button>

                <button
  type="button"
  disabled={updatingStatus}
  onClick={() =>
    updateProfileStatus(selectedProfile.id, "Approved")
  }
  className="flex-1 rounded-lg bg-[#8c1d18] py-2.5 text-[10px] font-semibold text-white hover:bg-[#701510] disabled:cursor-not-allowed disabled:opacity-60"
>
  {updatingStatus ? "Approving..." : "✓ Approve Profile"}
</button>

              </div>

            </div>

          </div>
        </div>
        </div>


      )}

    </div>
  );
}

export default ProfilesPage;