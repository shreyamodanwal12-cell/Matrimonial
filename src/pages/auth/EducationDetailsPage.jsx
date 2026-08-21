
import { useState } from "react";

const inputClass =
  "w-full h-[36px] px-3 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const selectClass =
  "w-full h-[36px] px-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#555] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const labelClass =
  "block mb-[4px] text-[10px] font-medium text-[#333]";

const textareaClass =
  "w-full min-h-[75px] px-3 py-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none resize-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

function EducationDetailsPage() {
const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Education & Career Details:", formData);

    localStorage.setItem(
      "registrationStep3",
      JSON.stringify(formData)
    );

    window.location.href = "/register/lifestyle";
  };

  const handleBack = () => {
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


      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="text-center pt-[16px] pb-[17px]">

        <h1 className="text-[19px] sm:text-[20px] font-medium text-[#d9272e]">
          Create Your Profile
        </h1>

        <p className="text-[11px] text-[#765d2d] mt-[3px]">
          Tell us about your education and career.
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
                ✓
              </div>

              <div className="w-[42px] h-[1px] bg-[#d9272e]" />

            </div>


            {/* STEP 2 */}

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                ✓
              </div>

              <div className="w-[42px] h-[1px] bg-[#d9272e]" />

            </div>


            {/* STEP 3 */}

            <div className="flex items-center">

              <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
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
              FORM
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

            <div className="mb-5">

              <h2 className="font-serif text-[17px] text-[#222]">
                Education & Career
              </h2>

              <p className="text-[10px] text-[#555] mt-[2px]">
                Share your educational and professional background
              </p>

            </div>


            {/* =================================================
                EDUCATION
            ================================================== */}

            <div className="mb-5">

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Education Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

                {/* QUALIFICATION */}

                <div>

                  <label className={labelClass}>
                    Highest Qualification
                  </label>

                  <select 
  name="highest_qualification"
  value={formData.highest_qualification}
  onChange={handleChange} 
  className={selectClass} 
>

                    <option value="">
                      Select Qualification
                    </option>

                    <option>
                      10th
                    </option>

                    <option>
                      12th
                    </option>

                    <option>
                      Diploma
                    </option>

                    <option>
                      Graduate
                    </option>

                    <option>
                      Post Graduate
                    </option>

                    <option>
                      Doctorate
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>


                {/* SPECIALIZATION */}

                <div>

                  <label className={labelClass}>
                    Specialization / Field
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    className={inputClass}
                  />

                </div>


                {/* COLLEGE */}

               {/* COLLEGE */}

<div>

  <label className={labelClass}>
    College Name
  </label>

  <input
    type="text"
    name="college_name"
    value={formData.college_name}
    onChange={handleChange}
    placeholder="Enter college name"
    className={inputClass}
  />

</div>


{/* UNIVERSITY */}

<div>

  <label className={labelClass}>
    University Name
  </label>

  <input
    type="text"
    name="university_name"
    value={formData.university_name}
    onChange={handleChange}
    placeholder="Enter university name"
    className={inputClass}
  />

</div>

              </div>

            </div>


            {/* =================================================
                CAREER
            ================================================== */}

            <div className="mb-5">

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Career Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

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

                    <option value="">
                      Select Profession
                    </option>

                    <option>
                      IT Professional
                    </option>

                    <option>
                      Business
                    </option>

                    <option>
                      Doctor
                    </option>

                    <option>
                      Engineer
                    </option>

                    <option>
                      Teacher
                    </option>

                    <option>
                      Government Employee
                    </option>

                    <option>
                      Lawyer
                    </option>

                    <option>
                      Chartered Accountant
                    </option>

                    <option>
                      Banking Professional
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>


                {/* EMPLOYMENT TYPE */}

                <div>

                  <label className={labelClass}>
                    Employment Type
                  </label>

                  <select
  name="employment_type"
  value={formData.employment_type}
  onChange={handleChange}
  className={selectClass}
>

                    <option value="">
                      Select Employment Type
                    </option>

                    <option>
                      Private
                    </option>

                    <option>
                      Government
                    </option>

                    <option>
                      Business
                    </option>

                    <option>
                      Self Employed
                    </option>

                    <option>
                      Not Working
                    </option>

                    <option>
                      Student
                    </option>

                  </select>

                </div>


                {/* COMPANY */}

                <div>

                  <label className={labelClass}>
                    Company / Organization
                  </label>

                  <input
  type="text"
  name="company_name"
  value={formData.company_name}
  onChange={handleChange}
  placeholder="Enter company name"
  className={inputClass}
/>

                </div>


                {/* JOB TITLE */}

                <div>

                  <label className={labelClass}>
                    Job Title / Designation
                  </label>

                  <input
                    type="text"
                    name="job_title"
value={formData.job_title}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className={inputClass}
                  />

                </div>


                {/* WORK LOCATION */}

                <div>

                  <label className={labelClass}>
                    Work Location
                  </label>

                  <input
                    type="text"
                    name="work_location"
value={formData.work_location}
                    onChange={handleChange}
                    placeholder="City / State"
                    className={inputClass}
                  />

                </div>


                {/* INCOME */}

                <div>

                  <label className={labelClass}>
                    Annual Income
                  </label>

                  <select
                    name="annual_income"
value={formData.annual_income}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select Income Range
                    </option>

                    <option>
                      Below 3 LPA
                    </option>

                    <option>
                      3 - 5 LPA
                    </option>

                    <option>
                      5 - 10 LPA
                    </option>

                    <option>
                      10 - 20 LPA
                    </option>

                    <option>
                      20 - 30 LPA
                    </option>

                    <option>
                      30+ LPA
                    </option>

                    <option>
                      Prefer Not to Say
                    </option>

                  </select>

                </div>



{/* JOB EXPERIENCE */}

<div>

  <label className={labelClass}>
    Job Experience
  </label>

  <input
    type="text"
    name="job_experience"
    value={formData.job_experience}
    onChange={handleChange}
    placeholder="e.g. Banking, Software, Teaching"
    className={inputClass}
  />

</div>


{/* YEARS OF EXPERIENCE */}

<div>

  <label className={labelClass}>
    Years of Experience
  </label>

  <input
    type="number"
    name="years_of_experience"
    value={formData.years_of_experience}
    onChange={handleChange}
    placeholder="e.g. 5"
    min="0"
    className={inputClass}
  />

</div>


{/* CERTIFICATE */}

<div className="md:col-span-2">

  <label className={labelClass}>
    Certificate / Professional Certification
  </label>

  <input
    type="text"
    name="certificate"
    value={formData.certificate}
    onChange={handleChange}
    placeholder="e.g. CA, AWS, Microsoft, Banking Certification"
    className={inputClass}
  />

</div>

                

              </div>

            </div>


            {/* =================================================
                CAREER DESCRIPTION
            ================================================== */}

            <div>

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Career Description
              </h3>

              <label className={labelClass}>
                About Your Career
              </label>

              <textarea
  name="job_experience"
  value={formData.job_experience}
  onChange={handleChange}
  placeholder="Tell us about your career, work experience or future career plans..."
  className={textareaClass}
/>

              <p className="mt-1 text-[9px] text-[#999]">
                Keep it simple and genuine.
              </p>

            </div>


            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="mt-5 pt-3 border-t border-[#eeeeee] flex items-center justify-between gap-3">

              <button
                type="button"
                onClick={handleBack}
                className="
                  border
                  border-[#d7a744]
                  text-[#8c1d18]
                  text-[10px]
                  font-medium
                  px-4
                  py-[7px]
                  rounded-[4px]
                  hover:bg-[#fff0c9]
                  transition
                "
              >
                ← Back
              </button>

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
                Next Step →
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EducationDetailsPage;
