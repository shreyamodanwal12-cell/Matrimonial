
import { useEffect, useState } from "react";

function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [education, setEducation] = useState(null);
const [savingEducation, setSavingEducation] = useState(false);
const [isEducationEditing, setIsEducationEditing] = useState(false);

const [educationForm, setEducationForm] = useState({
  highest_qualification: "",
  specialization: "",
  college_name: "",
  university_name: "",
  profession: "",
  company_name: "",
  job_title: "",
  employment_type: "",
  work_location: "",
  annual_income: "",
  job_experience: "",
  certificate: "",
  years_of_experience: "",
});

const [matrimonial, setMatrimonial] = useState(null);

const [isMatrimonialEditing, setIsMatrimonialEditing] = useState(false);

const [matrimonialForm, setMatrimonialForm] = useState({
  profile_for: "",
  gender: "",
  birth_date: "",
  birth_place: "",
  marital_status: "",
  address: "",
  religion: "",
  caste: "",
  sub_caste: "",
  mother_tongue: "",
  state: "",
  native_place: "",
  education: "",
  profession: "",
  annual_income: "",
  employment_type: "",
  job_details: "",
});

const [savingMatrimonial, setSavingMatrimonial] = useState(false);
const [uploadingPhoto, setUploadingPhoto] = useState(false);
const [editForm, setEditForm] = useState({
  full_name: "",
  mobile: "",
});
const [family, setFamily] = useState(null);
const [isFamilyEditing, setIsFamilyEditing] = useState(false);
const [savingFamily, setSavingFamily] = useState(false);

const [familyForm, setFamilyForm] = useState({
  father_name: "",
  father_occupation: "",
  mother_name: "",
  mother_occupation: "",
  brothers: "",
  sisters: "",
  family_type: "",
  family_status: "",
  family_values: "",
  about_family: "",
});








  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError(data.message || "Unable to load profile.");
          return;
        }

        const matrimonialData = data.user.matrimonial_profiles;

setMatrimonial(matrimonialData);

if (matrimonialData) {
  setMatrimonialForm({
    profile_for: matrimonialData.profile_for || "",
    gender: matrimonialData.gender || "",
    birth_date: matrimonialData.birth_date || "",
    birth_place: matrimonialData.birth_place || "",
    marital_status: matrimonialData.marital_status || "",
    address: matrimonialData.address || "",
    religion: matrimonialData.religion || "",
    caste: matrimonialData.caste || "",
    sub_caste: matrimonialData.sub_caste || "",
    mother_tongue: matrimonialData.mother_tongue || "",
    state: matrimonialData.state || "",
    native_place: matrimonialData.native_place || "",
    education: matrimonialData.education || "",
    profession: matrimonialData.profession || "",
    annual_income: matrimonialData.annual_income || "",
    employment_type: matrimonialData.employment_type || "",
    job_details: matrimonialData.job_details || "",
  });
}

const familyData = data.user.family_details;

setFamily(familyData);

if (familyData) {
  setFamilyForm({
    father_name: familyData.father_name || "",
    father_occupation: familyData.father_occupation || "",
    mother_name: familyData.mother_name || "",
    mother_occupation: familyData.mother_occupation || "",
    brothers: familyData.brothers ?? "",
    sisters: familyData.sisters ?? "",
    family_type: familyData.family_type || "",
    family_status: familyData.family_status || "",
    family_values: familyData.family_values || "",
    about_family: familyData.about_family || "",
  });
}

setUser(data.user);


setEducation(data.user.education_details || null);

setEducationForm({
  highest_qualification:
    data.user.education_details?.highest_qualification || "",

  specialization:
    data.user.education_details?.specialization || "",

  college_name:
    data.user.education_details?.college_name || "",

  university_name:
    data.user.education_details?.university_name || "",

  profession:
    data.user.education_details?.profession || "",

  company_name:
    data.user.education_details?.company_name || "",

  job_title:
    data.user.education_details?.job_title || "",

  employment_type:
    data.user.education_details?.employment_type || "",

  work_location:
    data.user.education_details?.work_location || "",

  annual_income:
    data.user.education_details?.annual_income || "",
});

setEditForm({
  full_name: data.user.full_name || "",
  mobile: data.user.mobile || "",
});
        // Keep localStorage user data updated
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error("Profile Error:", error);
        setError(
          "Unable to connect to server. Please make sure backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);


const handleSaveProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: editForm.full_name,
          mobile: editForm.mobile,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to update profile");
      return;
    }

    // Update UI
    setUser(data.user);

    // Update localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    // Exit edit mode
    setIsEditing(false);

    alert("Profile updated successfully!");

  } catch (error) {
    console.error("Update profile error:", error);

    alert(
      "Unable to connect to server. Please make sure backend is running."
    );
  }
};


const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setUploadingPhoto(true);

    const formData = new FormData();
    formData.append("photo", file);

    const response = await fetch(
      "http://localhost:5000/api/profiles/photo",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to upload photo");
      return;
    }

    // Update user with new photo
    const updatedUser = {
      ...user,
      profile_photo: data.photoUrl,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile photo updated successfully!");

  } catch (error) {
    console.error("Photo upload error:", error);

    alert(
      "Unable to upload photo. Please try again."
    );
  } finally {
    setUploadingPhoto(false);
  }
};


const handleSaveMatrimonial = async () => {
  try {
    setSavingMatrimonial(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/profiles/matrimonial",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(matrimonialForm),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to update profile");
      return;
    }

    setMatrimonial(data.profile);
    setIsMatrimonialEditing(false);

    alert("Matrimonial details updated successfully!");
  } catch (error) {
    console.error("Update matrimonial error:", error);
    alert("Unable to connect to server.");
  } finally {
    setSavingMatrimonial(false);
  }
};

const handleSaveEducation = async () => {
  console.log("SAVE EDUCATION CLICKED");

  try {
    setSavingEducation(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/auth/education",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(educationForm),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to update education details");
      return;
    }

    alert("Education details updated successfully");

    setIsEducationEditing(false);

    // Profile data ko dobara load karne ke liye
    window.location.reload();

  } catch (error) {
    console.error("Save education error:", error);
    alert("Something went wrong");
  } finally {
    setSavingEducation(false);
  }
};


const handleSaveFamily = async () => {
  try {
    setSavingFamily(true);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/profiles/family",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(familyForm),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to update family details");
      return;
    }

    setFamily(data.family);
    setIsFamilyEditing(false);

    alert("Family details updated successfully!");
  } catch (error) {
    console.error("Update family error:", error);
    alert("Unable to connect to server.");
  } finally {
    setSavingFamily(false);
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff0b8]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[20px] text-[#f5c45e]">
            ॐ
          </div>

          <p className="mt-3 text-[12px] text-[#806653]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff0b8] px-5">
        <div className="w-full max-w-[420px] rounded-xl border border-[#e5c35d] bg-white p-7 text-center shadow-[0_8px_30px_rgba(73,38,20,0.12)]">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1d8] text-[20px]">
            !
          </div>

          <h2 className="mt-4 font-serif text-[22px] font-semibold text-[#4a1712]">
            Unable to Load Profile
          </h2>

          <p className="mt-2 text-[11px] text-[#806653]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.href = "/login"}
            className="mt-5 rounded-md bg-[#8c1d18] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#751712]"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initial = user.full_name
    ? user.full_name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-[#fff0b8] text-[#3c2415]">

      {/* ================= NAVBAR ================= */}

      <nav className="w-full border-b border-[#e5c35d] bg-[#d9272e]">

        <div className="mx-auto flex h-[72px] w-[92%] max-w-[1100px] items-center justify-between">

          {/* Brand */}

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#ffc400]">
              <span className="text-[22px] text-white">
                ♥
              </span>
            </div>

            <div className="leading-none">

              <div className="font-serif text-[17px] font-bold tracking-wide text-white">
                SHIVA PARVATI
              </div>

              <div className="mt-[3px] text-[9px] font-semibold tracking-[1px] text-[#ffc400]">
                MATRIMONIAL GULBARGA
              </div>

            </div>

          </a>

          {/* Right */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-[10px] font-semibold text-white">
                {user.full_name}
              </p>

              <p className="text-[8px] text-[#ffd9a0]">
                My Profile
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5c45e] bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
              {initial}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-[#ffd28a] px-3 py-2 text-[9px] font-semibold text-white transition hover:bg-[#b91f25]"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HEADER ================= */}

      <div className="px-4 pb-5 pt-7 text-center">

        <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
          Shiva Parvati Matrimonial
        </p>

        <h1 className="mt-2 font-serif text-[28px] font-semibold text-[#d9272e]">
          My Profile
        </h1>

        <p className="mt-1 text-[11px] text-[#806653]">
          Manage your matrimonial profile and personal details.
        </p>

      </div>


      {/* ================= MAIN CARD ================= */}

      <main className="mx-auto w-[92%] max-w-[850px] pb-12">

        <div className="overflow-hidden rounded-2xl border border-[#e5c35d] bg-white shadow-[0_8px_30px_rgba(73,38,20,0.12)]">

          {/* PROFILE HEADER */}

          <div className="bg-[#fffaf2] px-5 py-7 sm:px-8">

            <div className="flex flex-col items-center gap-4 sm:flex-row">

              {/* Avatar */}

             <div className="relative h-[82px] w-[82px] shrink-0">

  {user.profile_photo ? (
    <img
      src={user.profile_photo}
      alt={user.full_name}
      className="h-[82px] w-[82px] rounded-full border-4 border-[#f5c45e] object-cover"
    />
  ) : (
    <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full border-4 border-[#f5c45e] bg-[#8c1d18] font-serif text-[32px] font-semibold text-[#f5c45e]">
      {initial}
    </div>
  )}

  <label
    htmlFor="profile-photo"
    className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#d9272e] text-[12px] text-white shadow-md"
    title="Change photo"
  >
    ✎
  </label>

  <input
    id="profile-photo"
    type="file"
    accept="image/*"
    onChange={handlePhotoUpload}
    className="hidden"
  />

</div>


              {/* User Info */}

              <div className="text-center sm:text-left">

                <h2 className="font-serif text-[25px] font-semibold text-[#4a1712]">
                  {user.full_name}
                </h2>

                <p className="mt-1 text-[11px] text-[#806653]">
                  {user.email}
                </p>

                {user.mobile && (
                  <p className="mt-1 text-[10px] text-[#9a806f]">
                    📱 {user.mobile}
                  </p>
                )}

              </div>

<button
  type="button"
  onClick={() => {
    setIsEditing(true);

    setTimeout(() => {
      document.getElementById("account-information")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }}
  className="mt-3 rounded-md bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white transition hover:bg-[#751712]"
>
  ✎ Edit Profile
</button>


            </div>

          </div>


          {/* ACCOUNT INFORMATION */}

          <div
  id="account-information"
  className="border-t border-[#eadfce] px-5 py-6 sm:px-8"
>

            <div className="mb-5">

              <h3 className="font-serif text-[19px] font-semibold text-[#4a1712]">
                Account Information
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Your basic account details.
              </p>

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Full Name */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Full Name
  </p>

  {isEditing ? (
    <input
      type="text"
      value={editForm.full_name}
      onChange={(e) =>
        setEditForm({
          ...editForm,
          full_name: e.target.value,
        })
      }
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] text-[#4f3425] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {user.full_name}
    </p>
  )}

</div>


              {/* Email */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Email Address
                </p>

                <p className="mt-2 break-all text-[11px] font-medium text-[#4f3425]">
                  {user.email}
                </p>

              </div>


              {/* Mobile */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Mobile Number
  </p>

  {isEditing ? (
    <input
      type="tel"
      value={editForm.mobile}
      onChange={(e) =>
        setEditForm({
          ...editForm,
          mobile: e.target.value,
        })
      }
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] text-[#4f3425] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {user.mobile || "Not provided"}
    </p>
  )}

</div>


              {/* Account Role */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Account Type
                </p>

                <p className="mt-2 text-[11px] font-medium capitalize text-[#4f3425]">
                  {user.role || "User"}
                </p>

              </div>

            </div>

{isEditing && (
  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">

    <button
      type="button"
      onClick={() => {
        setIsEditing(false);

        setEditForm({
          full_name: user.full_name || "",
          mobile: user.mobile || "",
        });
      }}
      className="rounded-md border border-[#d7c6b5] px-5 py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-white"
    >
      Cancel
    </button>

   <button
  type="button"
  onClick={handleSaveProfile}
  disabled={savingProfile}
  className="rounded-md bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#751712] disabled:opacity-60"
>
  {savingProfile ? "Saving..." : "Save Changes"}
</button>
  </div>
)}


          </div>


{/* ================= MATRIMONIAL DETAILS ================= */}

<div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="font-serif text-[19px] font-semibold text-[#4a1712]">
        Matrimonial Details
      </h3>

      <p className="mt-1 text-[10px] text-[#9a806f]">
        Your personal and matrimonial information.
      </p>
    </div>

    {!isMatrimonialEditing && (
      <button
        type="button"
        onClick={() => setIsMatrimonialEditing(true)}
        className="rounded-md bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#751712]"
      >
        Edit
      </button>
    )}

  </div>


  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

    {/* Profile For */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Profile For
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.profile_for}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              profile_for: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.profile_for || "Not provided"}
        </p>
      )}
    </div>


    {/* Gender */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Gender
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.gender}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              gender: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.gender || "Not provided"}
        </p>
      )}
    </div>


    {/* Birth Date */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Birth Date
      </p>

      {isMatrimonialEditing ? (
        <input
          type="date"
          value={matrimonialForm.birth_date}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              birth_date: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.birth_date || "Not provided"}
        </p>
      )}
    </div>


    {/* Birth Place */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Birth Place
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.birth_place}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              birth_place: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.birth_place || "Not provided"}
        </p>
      )}
    </div>


    {/* Marital Status */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Marital Status
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.marital_status}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              marital_status: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.marital_status || "Not provided"}
        </p>
      )}
    </div>


    {/* Religion */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Religion
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.religion}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              religion: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.religion || "Not provided"}
        </p>
      )}
    </div>


    {/* Caste */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Caste
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.caste}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              caste: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.caste || "Not provided"}
        </p>
      )}
    </div>


    {/* State */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        State
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.state}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              state: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.state || "Not provided"}
        </p>
      )}
    </div>





    {/* Address */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4 sm:col-span-2">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Address
      </p>

      {isMatrimonialEditing ? (
        <input
          type="text"
          value={matrimonialForm.address}
          onChange={(e) =>
            setMatrimonialForm({
              ...matrimonialForm,
              address: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium">
          {matrimonial?.address || "Not provided"}
        </p>
      )}
    </div>

  </div>


  {/* SAVE / CANCEL */}

  {isMatrimonialEditing && (
    <div className="mt-5 flex justify-end gap-2">

      <button
        type="button"
        onClick={() => {
          setIsMatrimonialEditing(false);

          setMatrimonialForm({
            profile_for: matrimonial?.profile_for || "",
            gender: matrimonial?.gender || "",
            birth_date: matrimonial?.birth_date || "",
            birth_place: matrimonial?.birth_place || "",
            marital_status: matrimonial?.marital_status || "",
            address: matrimonial?.address || "",
            religion: matrimonial?.religion || "",
            caste: matrimonial?.caste || "",
            sub_caste: matrimonial?.sub_caste || "",
            mother_tongue: matrimonial?.mother_tongue || "",
            state: matrimonial?.state || "",
            native_place: matrimonial?.native_place || "",
            education: matrimonial?.education || "",
            profession: matrimonial?.profession || "",
            annual_income: matrimonial?.annual_income || "",
            employment_type: matrimonial?.employment_type || "",
            job_details: matrimonial?.job_details || "",
          });
        }}
        className="rounded-md border border-[#d7c6b5] px-5 py-2.5 text-[10px] font-semibold text-[#806653]"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleSaveMatrimonial}
        disabled={savingMatrimonial}
        className="rounded-md bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#751712] disabled:opacity-60"
      >
        {savingMatrimonial ? "Saving..." : "Save Changes"}
      </button>

    </div>
  )}

</div>


{/* ================= EDUCATION & PROFESSIONAL DETAILS ================= */}

<div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="font-serif text-[19px] font-semibold text-[#4a1712]">
        Education & Professional Details
      </h3>

      <p className="mt-1 text-[10px] text-[#9a806f]">
        Your education and professional information.
      </p>
    </div>

    {!isEducationEditing && (
      <button
        type="button"
        onClick={() => setIsEducationEditing(true)}
        className="rounded-md bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#751712]"
      >
        Edit
      </button>
    )}

  </div>


  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">


    {/* Highest Qualification */}

    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Highest Qualification
      </p>

      {isEducationEditing ? (
        <select
          value={educationForm.highest_qualification}
          onChange={(e) =>
            setEducationForm({
              ...educationForm,
              highest_qualification: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        >
          <option value="">Select Qualification</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="Diploma">Diploma</option>
          <option value="Graduate">Graduate</option>
          <option value="Post Graduate">Post Graduate</option>
          <option value="Doctorate">Doctorate</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
         {education?.highest_qualification ||
  matrimonial?.education ||
  "Not provided"}
        </p>
      )}

    </div>


    {/* Specialization */}

    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Specialization
      </p>

      {isEducationEditing ? (
        <input
          type="text"
          value={educationForm.specialization}
          onChange={(e) =>
            setEducationForm({
              ...educationForm,
              specialization: e.target.value,
            })
          }
          placeholder="e.g. Computer Science"
          className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {education?.specialization || "Not provided"}
        </p>
      )}

    </div>


    {/* College */}

    {/* College / University */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    College / University
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.college_name}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          college_name: e.target.value,
        })
      }
      placeholder="Enter college / university"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.college_name ||
        education?.university_name ||
        "Not provided"}
    </p>
  )}

</div>


    {/* Profession */}

    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Profession
      </p>

      {isEducationEditing ? (
        <input
          type="text"
          value={educationForm.profession}
          onChange={(e) =>
            setEducationForm({
              ...educationForm,
              profession: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {education?.profession || "Not provided"}
        </p>
      )}

    </div>


   {/* Company */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Company
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.company_name}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          company_name: e.target.value,
        })
      }
      placeholder="Enter company name"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.company_name || "Not provided"}
    </p>
  )}

</div>


    {/* Job Title */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Job Title
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.job_title}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          job_title: e.target.value,
        })
      }
      placeholder="Enter job title"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.job_title || "Not provided"}
    </p>
  )}

</div>


    {/* Employment Type */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Employment Type
  </p>

  {isEducationEditing ? (
    <select
      value={educationForm.employment_type}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          employment_type: e.target.value,
        })
      }
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    >
      <option value="">Select Employment Type</option>
      <option value="Private">Private</option>
      <option value="Government">Government</option>
      <option value="Business">Business</option>
      <option value="Self Employed">Self Employed</option>
      <option value="Not Working">Not Working</option>
      <option value="Student">Student</option>
    </select>
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.employment_type || "Not provided"}
    </p>
  )}

</div>


{/* University Name */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    University Name
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.university_name}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          university_name: e.target.value,
        })
      }
      placeholder="Enter university name"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.university_name || "Not provided"}
    </p>
  )}

</div>


{/* Job Experience */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Job Experience
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.job_experience}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          job_experience: e.target.value,
        })
      }
      placeholder="Enter job experience"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.job_experience || "Not provided"}
    </p>
  )}

</div>


{/* Certificate */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Certificate
  </p>

  {isEducationEditing ? (
    <input
      type="text"
      value={educationForm.certificate}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          certificate: e.target.value,
        })
      }
      placeholder="Enter certificate"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.certificate || "Not provided"}
    </p>
  )}

</div>


{/* Years of Experience */}

<div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

  <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
    Years of Experience
  </p>

  {isEducationEditing ? (
    <input
      type="number"
      value={educationForm.years_of_experience}
      onChange={(e) =>
        setEducationForm({
          ...educationForm,
          years_of_experience: e.target.value,
        })
      }
      placeholder="e.g. 5"
      min="0"
      className="mt-2 w-full rounded-md border border-[#d7c6b5] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
    />
  ) : (
    <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
      {education?.years_of_experience ?? "Not provided"}
    </p>
  )}

</div>


  {/* SAVE / CANCEL */}

  {isEducationEditing && (
    <div className="mt-5 flex justify-end gap-2">

      <button
        type="button"
        onClick={() => {
          setIsEducationEditing(false);

          setEducationForm({
            highest_qualification:
              education?.highest_qualification || "",

            specialization:
              education?.specialization || "",

            college_name:
              education?.college_name || "",

            university_name:
              education?.university_name || "",

            profession:
              education?.profession || "",

            company_name:
              education?.company_name || "",

            job_title:
              education?.job_title || "",

            employment_type:
              education?.employment_type || "",

            work_location:
              education?.work_location || "",

            annual_income:
              education?.annual_income || "",
          });
        }}
        className="rounded-md border border-[#d7c6b5] px-5 py-2.5 text-[10px] font-semibold text-[#806653]"
      >
        Cancel
      </button>

      <button 
  type="button" 
  onClick={handleSaveEducation} 
  disabled={savingEducation} 
  className="rounded-md bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#751712] disabled:opacity-60"
>
  {savingEducation ? "Saving..." : "Save Changes"}
</button>

    </div>
  )}

</div>





{/* ================= FAMILY DETAILS ================= */}

<div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="font-serif text-[19px] font-semibold text-[#4a1712]">
        Family Details
      </h3>

      <p className="mt-1 text-[10px] text-[#9a806f]">
        Information about your family.
      </p>
    </div>

    {!isFamilyEditing && (
      <button
        type="button"
        onClick={() => setIsFamilyEditing(true)}
        className="rounded-md bg-[#8c1d18] px-4 py-2 text-[9px] font-semibold text-white hover:bg-[#751712]"
      >
        Edit
      </button>
    )}

  </div>


  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

    {/* Father Name */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Father Name
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.father_name}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              father_name: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.father_name || "Not provided"}
        </p>
      )}
    </div>


    {/* Father Occupation */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Father Occupation
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.father_occupation}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              father_occupation: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.father_occupation || "Not provided"}
        </p>
      )}
    </div>


    {/* Mother Name */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Mother Name
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.mother_name}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              mother_name: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.mother_name || "Not provided"}
        </p>
      )}
    </div>


    {/* Mother Occupation */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Mother Occupation
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.mother_occupation}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              mother_occupation: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.mother_occupation || "Not provided"}
        </p>
      )}
    </div>


    {/* Brothers */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Brothers
      </p>

      {isFamilyEditing ? (
        <input
          type="number"
          min="0"
          value={familyForm.brothers}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              brothers: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.brothers ?? "Not provided"}
        </p>
      )}
    </div>


    {/* Sisters */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Sisters
      </p>

      {isFamilyEditing ? (
        <input
          type="number"
          min="0"
          value={familyForm.sisters}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              sisters: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.sisters ?? "Not provided"}
        </p>
      )}
    </div>


    {/* Family Type */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Family Type
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.family_type}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              family_type: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.family_type || "Not provided"}
        </p>
      )}
    </div>


    {/* Family Status */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Family Status
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.family_status}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              family_status: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.family_status || "Not provided"}
        </p>
      )}
    </div>


    {/* Family Values */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4 sm:col-span-2">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        Family Values
      </p>

      {isFamilyEditing ? (
        <input
          type="text"
          value={familyForm.family_values}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              family_values: e.target.value,
            })
          }
          className="mt-2 w-full rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.family_values || "Not provided"}
        </p>
      )}
    </div>


    {/* About Family */}
    <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4 sm:col-span-2">
      <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
        About Family
      </p>

      {isFamilyEditing ? (
        <textarea
          rows="4"
          value={familyForm.about_family}
          onChange={(e) =>
            setFamilyForm({
              ...familyForm,
              about_family: e.target.value,
            })
          }
          className="mt-2 w-full resize-none rounded-md border border-[#d7c6b5] px-3 py-2 text-[11px] outline-none focus:border-[#c58a25]"
        />
      ) : (
        <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
          {family?.about_family || "Not provided"}
        </p>
      )}
    </div>

  </div>


  {/* SAVE / CANCEL */}

  {isFamilyEditing && (
    <div className="mt-5 flex justify-end gap-2">

      <button
        type="button"
        onClick={() => {
          setIsFamilyEditing(false);

          setFamilyForm({
            father_name: family?.father_name || "",
            father_occupation: family?.father_occupation || "",
            mother_name: family?.mother_name || "",
            mother_occupation: family?.mother_occupation || "",
            brothers: family?.brothers ?? "",
            sisters: family?.sisters ?? "",
            family_type: family?.family_type || "",
            family_status: family?.family_status || "",
            family_values: family?.family_values || "",
            about_family: family?.about_family || "",
          });
        }}
        className="rounded-md border border-[#d7c6b5] px-5 py-2.5 text-[10px] font-semibold text-[#806653] hover:bg-white"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={handleSaveFamily}
        disabled={savingFamily}
        className="rounded-md bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white hover:bg-[#751712] disabled:opacity-60"
      >
        {savingFamily ? "Saving..." : "Save Changes"}
      </button>

    </div>
  )}

</div>

          {/* PROFILE STATUS */}

          <div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

            <div className="rounded-xl border border-[#e5c35d] bg-[#fffaf2] p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="font-serif text-[18px] font-semibold text-[#4a1712]">
                    Profile Status
                  </h3>

                  <p className="mt-1 text-[10px] text-[#806653]">
                    Your account has been successfully created.
                  </p>

                </div>

                <span className="w-fit rounded-full bg-[#e7f6ed] px-3 py-1.5 text-[9px] font-semibold text-[#287b51]">
                  Active
                </span>

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="border-t border-[#eadfce] px-5 py-5 sm:px-8">

            <div className="flex flex-col gap-3 sm:flex-row">

              <a
                href="/"
                className="flex-1 rounded-md border border-[#d7a744] py-2.5 text-center text-[10px] font-semibold text-[#8c1d18] transition hover:bg-[#fffaf2]"
              >
                Back to Home
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-md bg-[#d9272e] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#bb2027]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>


        {/* Bottom Message */}

        <p className="mt-6 text-center font-serif text-[17px] italic text-[#751b17]">
          “Your beautiful story begins here.”
        </p>
</div>
      </main>

    </div>
  );
}

export default MyProfilePage;
