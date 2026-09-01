import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function PublicProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = window.location.pathname.split("/").pop();
 const token = localStorage.getItem("token");


 useEffect(() => {
  fetchPublicProfile();
}, []);

  const fetchPublicProfile = async () => {
    try {
      setLoading(true);
      setError("");

    

const response = await fetch(
  `${API_BASE_URL}/api/profiles/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load profile"
        );
      }

      setProfile(data.profile);

     } catch (error) {
    console.error("Public Profile Error:", error);
    setError(error.message || "Unable to load this profile");
  } finally {
    setLoading(false);
  }
};
const handleSendInterest = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to send interest.");
      window.location.href = "/login";
      return;
    }

    if (!profile?.user?.id) {
      alert("Profile information is not available.");
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/interests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_id: profile.user.id,
        }),
      }
    );

    const data = await response.json();

    console.log("Send Interest Response:", data);

    if (!response.ok || !data.success) {
      alert(data.message || "Unable to send interest.");
      return;
    }

    alert("Interest sent successfully! ❤️");
  } catch (error) {
    console.error("Send interest error:", error);
    alert("Something went wrong while sending interest.");
  }
};

const handleStartChat = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to start a chat.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/chat/conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          otherUserId: profile.user.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.message || "Unable to start chat.");
      return;
    }

    window.location.href = `/chat/${data.conversation.id}`;
  } catch (error) {
    console.error("Start chat error:", error);
    alert("Something went wrong while starting chat.");
  }
};



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
      (
        monthDifference === 0 &&
        today.getDate() < birth.getDate()
      )
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center">
        <p className="text-[#806653]">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#fffaf2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#751b17]">
            Profile Not Found
          </h2>

          <p className="mt-2 text-sm text-[#806653]">
            {error || "This profile is not available."}
          </p>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="mt-5 rounded-md bg-[#8c1d18] px-5 py-2.5 text-sm text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    user,
    matrimonial,
    education,
    family,
    lifestyle,
  } = profile;

  const age = calculateAge(
    matrimonial?.birth_date
  );

  return (
    <div className="min-h-screen bg-[#fffaf2] text-[#563927]">

      {/* ================= HEADER ================= */}
      <header className="border-b border-[#ead8bd] bg-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="font-serif text-xl font-semibold text-[#751b17]"
          >
            Sangam
          </button>

          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-[#8c1d18] px-4 py-2 text-xs font-semibold text-[#8c1d18]"
          >
            ← Back
          </button>

        </div>
      </header>


      {/* ================= PROFILE HERO ================= */}
      <section className="px-4 py-10 sm:py-14">

        <div className="mx-auto max-w-[1000px]">

          <div className="overflow-hidden rounded-2xl border border-[#ead8bd] bg-white shadow-[0_8px_30px_rgba(73,38,20,0.08)]">

            <div className="grid md:grid-cols-[360px_1fr]">

              {/* PHOTO */}
            {/* PHOTO */}
<div className="h-[400px] bg-[#f3e6d4] md:h-full">

  {user?.profile_photo ? (
    <img
      src={user.profile_photo}
      alt={user?.full_name}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[#f3e6d4]">
      <span className="font-serif text-[100px] font-semibold text-[#8c1d18]">
        {(user?.full_name || "U").charAt(0).toUpperCase()}
      </span>
    </div>
  )}

</div>


              {/* BASIC DETAILS */}
              <div className="p-7 sm:p-10">

                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
                  Matrimonial Profile
                </p>

                <h1 className="mt-2 font-serif text-4xl font-semibold text-[#751b17]">
                  {user?.full_name}
                </h1>

                {age && (
                  <p className="mt-2 text-sm text-[#806653]">
                    {age} years old
                  </p>
                )}

                <div className="mt-6 space-y-3">

                  {matrimonial?.gender && (
                    <Info
                      icon="👤"
                      label="Gender"
                      value={matrimonial.gender}
                    />
                  )}

                  {matrimonial?.marital_status && (
                    <Info
                      icon="💍"
                      label="Marital Status"
                      value={matrimonial.marital_status}
                    />
                  )}

                  {matrimonial?.religion && (
                    <Info
                      icon="🕉️"
                      label="Religion"
                      value={matrimonial.religion}
                    />
                  )}

                  {matrimonial?.mother_tongue && (
                    <Info
                      icon="🗣️"
                      label="Mother Tongue"
                      value={matrimonial.mother_tongue}
                    />
                  )}

                  {matrimonial?.state && (
                    <Info
                      icon="📍"
                      label="Location"
                      value={matrimonial.state}
                    />
                  )}

                </div>

                <button
  type="button"
  onClick={handleSendInterest}
  className="mt-7 w-full rounded-md bg-[#8c1d18] px-5 py-3 text-sm font-semibold text-white hover:bg-[#751712]"
>
  ❤️ Send Interest
</button>
<button
  type="button"
  onClick={handleStartChat}
  className="mt-3 w-full rounded-md border border-[#8c1d18] px-5 py-3 text-sm font-semibold text-[#8c1d18] hover:bg-[#fff5ed]"
>
  💬 Chat
</button>
              </div>

            </div>

          </div>


          {/* ================= PERSONAL INFORMATION ================= */}
          <ProfileSection title="Personal Information">

            <InfoGrid>

              <InfoItem
                label="Profile For"
                value={matrimonial?.profile_for}
              />

              <InfoItem
                label="Gender"
                value={matrimonial?.gender}
              />

              <InfoItem
                label="Date of Birth"
                value={formatDate(matrimonial?.birth_date)}
              />

              <InfoItem
                label="Birth Place"
                value={matrimonial?.birth_place}
              />

              <InfoItem
                label="Marital Status"
                value={matrimonial?.marital_status}
              />

              <InfoItem
                label="Religion"
                value={matrimonial?.religion}
              />

              <InfoItem
                label="Caste"
                value={matrimonial?.caste}
              />

              <InfoItem
                label="Sub Caste"
                value={matrimonial?.sub_caste}
              />

              <InfoItem
                label="Mother Tongue"
                value={matrimonial?.mother_tongue}
              />

              <InfoItem
                label="Native Place"
                value={matrimonial?.native_place}
              />

            </InfoGrid>

          </ProfileSection>


          {/* ================= EDUCATION & CAREER ================= */}
          <ProfileSection title="Education & Career">

            <InfoGrid>

              <InfoItem
                label="Highest Qualification"
                value={education?.highest_qualification || matrimonial?.education}
              />

              <InfoItem
                label="Specialization"
                value={education?.specialization}
              />

              <InfoItem
                label="College"
                value={education?.college_name}
              />

              <InfoItem
                label="University"
                value={education?.university_name}
              />

              <InfoItem
                label="Profession"
                value={
                  education?.profession ||
                  matrimonial?.profession
                }
              />

              <InfoItem
                label="Job Title"
                value={education?.job_title}
              />

              <InfoItem
                label="Company"
                value={education?.company_name}
              />

              <InfoItem
                label="Employment Type"
                value={
                  education?.employment_type ||
                  matrimonial?.employment_type
                }
              />

              <InfoItem
                label="Work Location"
                value={education?.work_location}
              />

              <InfoItem
                label="Annual Income"
                value={
                  education?.annual_income ||
                  matrimonial?.annual_income
                }
              />

              <InfoItem
                label="Job Experience"
                value={education?.job_experience}
              />

              <InfoItem
                label="Years of Experience"
                value={education?.years_of_experience}
              />

            </InfoGrid>

            {matrimonial?.job_details && (
              <div className="mt-6">
                <InfoItem
                  label="About Career"
                  value={matrimonial.job_details}
                />
              </div>
            )}

          </ProfileSection>


          {/* ================= FAMILY ================= */}
          <ProfileSection title="Family Details">

            <InfoGrid>

              <InfoItem
                label="Father"
                value={family?.father_name}
              />

              <InfoItem
                label="Father's Occupation"
                value={family?.father_occupation}
              />

              <InfoItem
                label="Mother"
                value={family?.mother_name}
              />

              <InfoItem
                label="Mother's Occupation"
                value={family?.mother_occupation}
              />

              <InfoItem
                label="Brothers"
                value={family?.brothers}
              />

              <InfoItem
                label="Sisters"
                value={family?.sisters}
              />

              <InfoItem
                label="Family Type"
                value={family?.family_type}
              />

              <InfoItem
                label="Family Status"
                value={family?.family_status}
              />

              <InfoItem
                label="Family Values"
                value={family?.family_values}
              />

            </InfoGrid>

            {family?.about_family && (
              <div className="mt-6">
                <InfoItem
                  label="About Family"
                  value={family.about_family}
                />
              </div>
            )}

          </ProfileSection>


          {/* ================= LIFESTYLE ================= */}
          <ProfileSection title="Lifestyle & Interests">

            <InfoGrid>

              <InfoItem
                label="Diet"
                value={lifestyle?.diet}
              />

              <InfoItem
                label="Smoking"
                value={lifestyle?.smoking}
              />

              <InfoItem
                label="Drinking"
                value={lifestyle?.drinking}
              />

              <InfoItem
                label="Hobbies"
                value={lifestyle?.hobbies}
              />

              <InfoItem
                label="Interests"
                value={lifestyle?.interests}
              />

            </InfoGrid>

          </ProfileSection>


          {/* ================= PARTNER PREFERENCES ================= */}
          <ProfileSection title="Partner Preferences">

            <InfoGrid>

              <InfoItem
                label="Preferred Age"
                value={
                  lifestyle?.partner_age_from &&
                  lifestyle?.partner_age_to
                    ? `${lifestyle.partner_age_from} - ${lifestyle.partner_age_to} years`
                    : null
                }
              />

              <InfoItem
                label="Education"
                value={lifestyle?.partner_education}
              />

              <InfoItem
                label="Profession"
                value={lifestyle?.partner_profession}
              />

              <InfoItem
                label="Religion"
                value={lifestyle?.partner_religion}
              />

              <InfoItem
                label="Preferred Location"
                value={lifestyle?.partner_location}
              />

            </InfoGrid>

          </ProfileSection>

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function ProfileSection({ title, children }) {
  return (
    <section className="mt-7 rounded-2xl border border-[#ead8bd] bg-white p-6 shadow-[0_5px_20px_rgba(73,38,20,0.06)] sm:p-8">

      <h2 className="border-b border-[#ead8bd] pb-4 font-serif text-2xl font-semibold text-[#751b17]">
        {title}
      </h2>

      <div className="pt-5">
        {children}
      </div>

    </section>
  );
}


function InfoGrid({ children }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {children}
    </div>
  );
}


function InfoItem({ label, value }) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a67c35]">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-line text-sm text-[#563927]">
        {value}
      </p>
    </div>
  );
}


function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-lg">
        {icon}
      </span>

      <div>
        <p className="text-[10px] text-[#a67c35]">
          {label}
        </p>

        <p className="text-sm font-medium text-[#563927]">
          {value}
        </p>
      </div>

    </div>
  );
}


function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default PublicProfilePage;