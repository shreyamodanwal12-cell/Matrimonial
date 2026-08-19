import { useState } from "react";

const inputClass =
  "w-full h-[36px] px-3 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const selectClass =
  "w-full h-[36px] px-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#555] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const labelClass =
  "block mb-[4px] text-[10px] font-medium text-[#333]";

function LifestylePage() {
  const [formData, setFormData] = useState({
    diet: "",
    smoking: "No",
    drinking: "No",
    hobbies: "",
    interests: "",
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerEducation: "",
    partnerProfession: "",
    partnerReligion: "",
    partnerLocation: "",
    email: "",
  password: "",
  confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  try {
    // Get all previous registration steps
    const step1 = JSON.parse(
      localStorage.getItem("registrationStep1")
    );

    const step2 = JSON.parse(
      localStorage.getItem("registrationStep2")
    );

    const step3 = JSON.parse(
      localStorage.getItem("registrationStep3")
    );

    if (!step1 || !step2 || !step3) {
      alert("Previous registration details are missing.");
      return;
    }

    // Send all 4 steps to backend
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          step1,
          step2,
          step3,
          step4: formData,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed.");
      return;
    }

    console.log("Registration Response:", data);

    // Registration completed
    alert("Registration completed successfully!");

    // Remove temporary registration data
    localStorage.removeItem("registrationStep1");
    localStorage.removeItem("registrationStep2");
    localStorage.removeItem("registrationStep3");
    localStorage.removeItem("registrationStep4");

    // Go to login
    window.location.href = "/login";

  } catch (error) {
    console.error("Registration Error:", error);

    alert(
      "Unable to connect to server. Please make sure backend is running."
    );
  }
};

  return (
    <div className="min-h-screen w-full bg-[#fff0b8] text-[#333]">

      {/* NAVBAR */}
      <nav className="w-full h-[72px] bg-[#d9272e] flex items-center">

        <div className="w-full max-w-[1100px] mx-auto px-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-[36px] h-[36px] rounded-full bg-[#ffc400] flex items-center justify-center">
              <span className="text-white text-[22px]">
                ♥
              </span>
            </div>

            <div className="leading-none">

              <div className="font-serif font-bold text-[17px] text-white tracking-wide">
                SHIVA PARVATI
              </div>

              <div className="text-[9px] font-semibold text-[#ffc400] tracking-[1px] mt-[3px]">
                MATRIMONIAL GULBARGA
              </div>

            </div>

          </div>

        </div>

      </nav>


      {/* PAGE HEADER */}

      <div className="text-center pt-[16px] pb-[17px]">

        <h1 className="text-[19px] sm:text-[20px] font-medium text-[#d9272e]">
          Complete Your Profile
        </h1>

        <p className="text-[11px] text-[#765d2d] mt-[3px]">
          Tell us about your lifestyle and partner preferences.
        </p>

      </div>


      {/* MAIN CARD */}

      <div className="w-full flex justify-center px-3 sm:px-5 pb-10">

        <div
          className="
            w-full
            max-w-[810px]
            bg-white
            rounded-[14px]
            border
            border-[#f1c63d]
            shadow-[0_7px_20px_rgba(88,67,20,0.14)]
            px-4
            sm:px-7
            pt-7
            pb-5
          "
        >

          {/* PROGRESS */}

          <div className="flex justify-center items-center mb-7">

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                ✓
              </div>

              <div className="w-[42px] h-[1px] bg-[#d9272e]" />

            </div>


            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                ✓
              </div>

              <div className="w-[42px] h-[1px] bg-[#d9272e]" />

            </div>


            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                ✓
              </div>

              <div className="w-[42px] h-[1px] bg-[#d9272e]" />

            </div>


            <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
              4
            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="
              w-full
              rounded-[11px]
              border
              border-[#e8e8e8]
              px-4
              sm:px-5
              pt-4
              pb-4
            "
          >

            {/* LIFESTYLE */}

            <div className="mb-5">

              <h2 className="font-serif text-[17px] text-[#222]">
                Lifestyle Details
              </h2>

              <p className="text-[10px] text-[#555] mt-[2px]">
                Help us understand your lifestyle and interests.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

              {/* DIET */}

              <div>

                <label className={labelClass}>
                  Diet
                </label>

                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option value="">
                    Select Diet
                  </option>

                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Eggetarian</option>
                  <option>Vegan</option>

                </select>

              </div>


              {/* SMOKING */}

              <div>

                <label className={labelClass}>
                  Smoking
                </label>

                <select
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option>No</option>
                  <option>Occasionally</option>
                  <option>Yes</option>

                </select>

              </div>


              {/* DRINKING */}

              <div>

                <label className={labelClass}>
                  Drinking
                </label>

                <select
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option>No</option>
                  <option>Occasionally</option>
                  <option>Yes</option>

                </select>

              </div>


              {/* HOBBIES */}

              <div>

                <label className={labelClass}>
                  Hobbies
                </label>

                <input
                  type="text"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  placeholder="e.g. Reading, Music, Travel"
                  className={inputClass}
                />

              </div>


              {/* INTERESTS */}

              <div className="md:col-span-2">

                <label className={labelClass}>
                  Interests
                </label>

                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Tell us about your interests"
                  className={inputClass}
                />

              </div>

            </div>


            {/* PARTNER PREFERENCES */}

            <div className="mt-7 mb-4">

              <h2 className="font-serif text-[17px] text-[#222]">
                Partner Preferences
              </h2>

              <p className="text-[10px] text-[#555] mt-[2px]">
                Tell us what you are looking for in your life partner.
              </p>

            </div>
{/* CREATE ACCOUNT */}

<div className="mt-7 mb-4">

  <h2 className="font-serif text-[17px] text-[#222]">
    Create Your Account
  </h2>

  <p className="text-[10px] text-[#555] mt-[2px]">
    Create login details to access your matrimonial profile.
  </p>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

  {/* EMAIL */}

  <div>

    <label className={labelClass}>
      Email Address
    </label>

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email address"
      className={inputClass}
      required
    />

  </div>


  {/* PASSWORD */}

  <div>

    <label className={labelClass}>
      Password
    </label>

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create a password"
      className={inputClass}
      required
    />

  </div>


  {/* CONFIRM PASSWORD */}

  <div>

    <label className={labelClass}>
      Confirm Password
    </label>

    <input
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm your password"
      className={inputClass}
      required
    />

  </div>

</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

              {/* AGE FROM */}

              <div>

                <label className={labelClass}>
                  Partner Age From
                </label>

                <input
                  type="number"
                  name="partnerAgeFrom"
                  value={formData.partnerAgeFrom}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  min="18"
                  className={inputClass}
                />

              </div>


              {/* AGE TO */}

              <div>

                <label className={labelClass}>
                  Partner Age To
                </label>

                <input
                  type="number"
                  name="partnerAgeTo"
                  value={formData.partnerAgeTo}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  min="18"
                  className={inputClass}
                />

              </div>


              {/* EDUCATION */}

              <div>

                <label className={labelClass}>
                  Preferred Education
                </label>

                <select
                  name="partnerEducation"
                  value={formData.partnerEducation}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option value="">
                    Select Education
                  </option>

                  <option>10th</option>
                  <option>12th</option>
                  <option>Diploma</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Doctorate</option>
                  <option>Any</option>

                </select>

              </div>


              {/* PROFESSION */}

              <div>

                <label className={labelClass}>
                  Preferred Profession
                </label>

                <select
                  name="partnerProfession"
                  value={formData.partnerProfession}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option value="">
                    Select Profession
                  </option>

                  <option>IT Professional</option>
                  <option>Business</option>
                  <option>Doctor</option>
                  <option>Engineer</option>
                  <option>Teacher</option>
                  <option>Government Employee</option>
                  <option>Any</option>

                </select>

              </div>


              {/* RELIGION */}

              <div>

                <label className={labelClass}>
                  Preferred Religion
                </label>

                <select
                  name="partnerReligion"
                  value={formData.partnerReligion}
                  onChange={handleChange}
                  className={selectClass}
                >

                  <option value="">
                    Select Religion
                  </option>

                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                  <option>Buddhist</option>
                  <option>Any</option>

                </select>

              </div>


              {/* LOCATION */}

              <div>

                <label className={labelClass}>
                  Preferred Location
                </label>

                <input
                  type="text"
                  name="partnerLocation"
                  value={formData.partnerLocation}
                  onChange={handleChange}
                  placeholder="City / State"
                  className={inputClass}
                />

              </div>

            </div>


            {/* BUTTON */}

            <div className="mt-5 pt-3 border-t border-[#eeeeee] flex justify-end">

              <button
                type="submit"
                className="
                  bg-[#d9272e]
                  hover:bg-[#bb2027]
                  text-white
                  text-[10px]
                  font-medium
                  px-5
                  py-[8px]
                  rounded-[4px]
                  shadow-sm
                  transition
                "
              >
                Complete Registration
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default LifestylePage;