import { useState } from "react";

const inputClass =
  "w-full h-[36px] px-3 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const selectClass =
  "w-full h-[36px] px-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#555] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const labelClass =
  "block mb-[4px] text-[10px] font-medium text-[#333]";

function RegisterPage() {
  const [formData, setFormData] = useState({
    profileFor: "Son",
    gender: "Male",
    fullName: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    maritalStatus: "Never Married",
    contactNumber: "",
    address: "",
    religion: "",
    caste: "",
    subCaste: "",
    motherTongue: "",
    state: "",
    nativePlace: "",
    education: "",
    profession: "",
    annualIncome: "",
    employmentType: "Private",
    jobDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Register Data:", formData);

  localStorage.setItem("registrationStep1", JSON.stringify(formData));

  window.location.href = "/register/family";
};

  return (
    <div className="min-h-screen w-full bg-[#fff0b8] text-[#333]">
 
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="w-full h-[72px] bg-[#d9272e] flex items-center">

        <div className="w-full max-w-[1100px] mx-auto px-5 flex items-center justify-between">

          {/* LOGO */}

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


          {/* NAVIGATION */}

          <div className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-white">

            <a
              href="/"
              className="hover:text-[#ffc400] transition"
            >
              Home
            </a>

            <a
              href="/search"
              className="hover:text-[#ffc400] transition"
            >
              Search
            </a>

            <a
              href="/about"
              className="hover:text-[#ffc400] transition"
            >
              About
            </a>

            <a
              href="/contact"
              className="hover:text-[#ffc400] transition"
            >
              Contact
            </a>

            <a
              href="/login"
              className="hover:text-[#ffc400] transition"
            >
              Login
            </a>

            <a
              href="/register"
              className="bg-[#ffc400] text-[#333] px-4 py-[7px] rounded-[8px] hover:bg-[#ffd33b] transition"
            >
              Register Free
            </a>

          </div>

        </div>

      </nav>

{/* BACK BUTTON */}
<div className="w-full max-w-[1100px] mx-auto px-5 pt-4">
  <button
    type="button"
    onClick={() => window.history.back()}
    className="
      inline-flex
      items-center
      gap-1.5
      px-3
      py-1.5
      rounded-[6px]
      border
      border-[#d7a744]
      bg-white
      text-[#d9272e]
      text-[11px]
      font-medium
      hover:bg-[#d9272e]
      hover:text-white
      transition
    "
  >
    ← Back
  </button>
</div>
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="text-center pt-[16px] pb-[17px]">

        <h1 className="text-[19px] sm:text-[20px] font-medium text-[#d9272e]">
          Register Free
        </h1>

        <p className="text-[11px] text-[#765d2d] mt-[3px]">
          Find your divine match today. It only takes a few minutes.
        </p>

      </div>


      {/* =====================================================
          MAIN CARD
      ====================================================== */}

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

          {/* =================================================
              PROGRESS
          ================================================== */}

          <div className="flex justify-center items-center mb-7">

            {/* STEP 1 */}

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                1
              </div>

              <div className="w-[42px] h-[1px] bg-[#f2d77b]" />

            </div>


            {/* STEP 2 */}

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-white border border-[#f2d77b] text-[#555] flex items-center justify-center text-[11px]">
                2
              </div>

              <div className="w-[42px] h-[1px] bg-[#f2d77b]" />

            </div>


            {/* STEP 3 */}

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-white border border-[#f2d77b] text-[#555] flex items-center justify-center text-[11px]">
                3
              </div>

              <div className="w-[42px] h-[1px] bg-[#f2d77b]" />

            </div>


            {/* STEP 4 */}

            <div className="w-[30px] h-[30px] rounded-full bg-white border border-[#f2d77b] text-[#555] flex items-center justify-center text-[11px]">
              4
            </div>

          </div>


          {/* =================================================
              INNER FORM
          ================================================== */}

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

            {/* FORM HEADING */}

            <div className="mb-4">

              <h2 className="font-serif text-[17px] text-[#222]">
                Personal Details
              </h2>

              <p className="text-[10px] text-[#555] mt-[2px]">
                Tell us about the user
              </p>

            </div>


            {/* =================================================
                FORM GRID
            ================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">


              {/* PROFILE FOR */}

              <div>

                <label className={labelClass}>
                  Create Profile For
                </label>

                <select
                  name="profileFor"
                  value={formData.profileFor}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option>Self</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Relative</option>
                </select>

              </div>


              {/* GENDER */}

              <div>

                <label className={labelClass}>
                  Gender
                </label>

                <div className="h-[36px] flex items-center gap-5">

                  <label className="flex items-center gap-2 text-[11px]">

                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      className="accent-[#d9272e] w-[14px] h-[14px]"
                    />

                    Male

                  </label>

                  <label className="flex items-center gap-2 text-[11px]">

                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      className="accent-[#d9272e] w-[14px] h-[14px]"
                    />

                    Female

                  </label>

                </div>

              </div>


              {/* FULL NAME */}

              <div>

                <label className={labelClass}>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter Fullname"
                  className={inputClass}
                />

              </div>


              {/* BIRTH DATE */}

              <div>

                <label className={labelClass}>
                  Birth Date
                </label>

                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={inputClass}
                />

              </div>


              {/* BIRTH TIME */}

              <div>

                <label className={labelClass}>
                  Birth Time
                </label>

                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className={inputClass}
                />

              </div>


              {/* BIRTH PLACE */}

              <div>

                <label className={labelClass}>
                  Birth Place
                </label>

                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="City/Town"
                  className={inputClass}
                />

              </div>


              {/* MARITAL STATUS */}

              <div>

                <label className={labelClass}>
                  Marital Status
                </label>

                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option>Never Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                  <option>Separated</option>
                </select>

              </div>


              {/* CONTACT */}

              <div>

                <label className={labelClass}>
                  Contact Number
                </label>

                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={inputClass}
                />

              </div>


              {/* ADDRESS */}

              <div className="md:col-span-2">

                <label className={labelClass}>
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address"
                  className={inputClass}
                />

              </div>


              {/* RELIGION */}

              <div>

                <label className={labelClass}>
                  Religion
                </label>

                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Religion</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                  <option>Buddhist</option>
                  <option>Other</option>
                </select>

              </div>


              {/* CASTE */}

              <div>

                <label className={labelClass}>
                  Caste
                </label>

                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Caste</option>
                  <option>Brahmin</option>
                  <option>Rajput</option>
                  <option>Yadav</option>
                  <option>Kurmi</option>
                  <option>Vaishya</option>
                  <option>Other</option>
                </select>

              </div>


              {/* SUB CASTE */}

              <div>

                <label className={labelClass}>
                  Sub-Caste
                </label>

                <select
                  name="subCaste"
                  value={formData.subCaste}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Sub-Caste</option>
                  <option>None</option>
                  <option>Other</option>
                </select>

              </div>


              {/* MOTHER TONGUE */}

              <div>

                <label className={labelClass}>
                  Mother Tongue
                </label>

                <select
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Language</option>
                  <option>Hindi</option>
                  <option>Kannada</option>
                  <option>Telugu</option>
                  <option>Marathi</option>
                  <option>Tamil</option>
                  <option>English</option>
                  <option>Other</option>
                </select>

              </div>


              {/* STATE */}

              <div>

                <label className={labelClass}>
                  State
                </label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select State</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Telangana</option>
                  <option>Andhra Pradesh</option>
                  <option>Delhi</option>
                  <option>Madhya Pradesh</option>
                  <option>Other</option>
                </select>

              </div>


              {/* NATIVE PLACE */}

              <div>

                <label className={labelClass}>
                  Native Place
                </label>

                <input
                  type="text"
                  name="nativePlace"
                  value={formData.nativePlace}
                  onChange={handleChange}
                  placeholder="City/Town"
                  className={inputClass}
                />

              </div>


              {/* EDUCATION */}

              <div>

                <label className={labelClass}>
                  Education / Qualification
                </label>

                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Qualification</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>Diploma</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Doctorate</option>
                  <option>Other</option>
                </select>

              </div>


              {/* PROFESSION */}

              <div>

                <label className={labelClass}>
                  Profession / Occupation
                </label>

                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Profession</option>
                  <option>IT Professional</option>
                  <option>Business</option>
                  <option>Doctor</option>
                  <option>Engineer</option>
                  <option>Teacher</option>
                  <option>Government Employee</option>
                  <option>Other</option>
                </select>

              </div>


              {/* ANNUAL INCOME */}

              <div>

                <label className={labelClass}>
                  Annual Income / Package
                </label>

                <select
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select Income Range</option>
                  <option>Below 3 LPA</option>
                  <option>3 - 5 LPA</option>
                  <option>5 - 10 LPA</option>
                  <option>10 - 20 LPA</option>
                  <option>20+ LPA</option>
                </select>

              </div>


              {/* EMPLOYMENT TYPE */}

              <div>

                <label className={labelClass}>
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option>Private</option>
                  <option>Government</option>
                  <option>Business</option>
                  <option>Self Employed</option>
                  <option>Not Working</option>
                </select>

              </div>


              {/* JOB DETAILS */}

              <div className="md:col-span-2">

                <label className={labelClass}>
                  Job Details
                </label>

                <input
                  type="text"
                  name="jobDetails"
                  value={formData.jobDetails}
                  onChange={handleChange}
                  placeholder="Current job role, company etc."
                  className={inputClass}
                />

              </div>

            </div>


            {/* =================================================
                BUTTON
            ================================================== */}

            <div className="mt-5 pt-3 border-t border-[#eeeeee] flex justify-end">

              <button
                type="submit"
                className="
                  bg-[#d9272e]
                  hover:bg-[#bb2027]
                  text-white
                  text-[10px]
                  font-medium
                  px-4
                  py-[7px]
                  rounded-[4px]
                  shadow-sm
                  transition
                "
              >
                Next Step
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;