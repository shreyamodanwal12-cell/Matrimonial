
import { useState } from "react";

const inputClass =
  "w-full h-[36px] px-3 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const selectClass =
  "w-full h-[36px] px-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#555] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const textareaClass =
  "w-full min-h-[75px] px-3 py-2 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none resize-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const labelClass =
  "block mb-[4px] text-[10px] font-medium text-[#333]";

function FamilyDetailsPage() {
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",

    brothers: "",
    sisters: "",
    marriedBrothers: "",
    marriedSisters: "",

    familyType: "",
    familyStatus: "",
    familyValues: "",

    aboutFamily: "",
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

  console.log("Family Details:", formData);

  localStorage.setItem(
    "registrationStep2",
    JSON.stringify(formData)
  );

  window.location.href = "/register/education";
};

  const handleBack = () => {
    window.location.href = "/register";
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
          Tell us a little about your family.
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
                Family Details
              </h2>

              <p className="text-[10px] text-[#555] mt-[2px]">
                Tell us about your family background
              </p>

            </div>


            {/* =================================================
                PARENTS
            ================================================== */}

            <div className="mb-5">

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Parents Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

                {/* FATHER NAME */}

                <div>

                  <label className={labelClass}>
                    Father's Name
                  </label>

                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className={inputClass}
                  />

                </div>


                {/* FATHER OCCUPATION */}

                <div>

                  <label className={labelClass}>
                    Father's Occupation
                  </label>

                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                    className={inputClass}
                  />

                </div>


                {/* MOTHER NAME */}

                <div>

                  <label className={labelClass}>
                    Mother's Name
                  </label>

                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter mother's name"
                    className={inputClass}
                  />

                </div>


                {/* MOTHER OCCUPATION */}

                <div>

                  <label className={labelClass}>
                    Mother's Occupation
                  </label>

                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                    placeholder="Enter occupation"
                    className={inputClass}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                SIBLINGS
            ================================================== */}

            <div className="mb-5">

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Sibling Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-[13px]">

                {/* BROTHERS */}

                <div>

                  <label className={labelClass}>
                    Brothers
                  </label>

                  <select
                    name="brothers"
                    value={formData.brothers}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="0">
                      None
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4+">
                      4+
                    </option>

                  </select>

                </div>


                {/* SISTERS */}

                <div>

                  <label className={labelClass}>
                    Sisters
                  </label>

                  <select
                    name="sisters"
                    value={formData.sisters}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="0">
                      None
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4+">
                      4+
                    </option>

                  </select>

                </div>


                {/* MARRIED BROTHERS */}

                <div>

                  <label className={labelClass}>
                    Married Brothers
                  </label>

                  <select
                    name="marriedBrothers"
                    value={formData.marriedBrothers}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="0">
                      None
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4+">
                      4+
                    </option>

                  </select>

                </div>


                {/* MARRIED SISTERS */}

                <div>

                  <label className={labelClass}>
                    Married Sisters
                  </label>

                  <select
                    name="marriedSisters"
                    value={formData.marriedSisters}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="0">
                      None
                    </option>

                    <option value="1">
                      1
                    </option>

                    <option value="2">
                      2
                    </option>

                    <option value="3">
                      3
                    </option>

                    <option value="4+">
                      4+
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* =================================================
                FAMILY INFORMATION
            ================================================== */}

            <div className="mb-5">

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                Family Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-[13px]">

                {/* FAMILY TYPE */}

                <div>

                  <label className={labelClass}>
                    Family Type
                  </label>

                  <select
                    name="familyType"
                    value={formData.familyType}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select Family Type
                    </option>

                    <option>
                      Nuclear Family
                    </option>

                    <option>
                      Joint Family
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>


                {/* FAMILY STATUS */}

                <div>

                  <label className={labelClass}>
                    Family Status
                  </label>

                  <select
                    name="familyStatus"
                    value={formData.familyStatus}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select Family Status
                    </option>

                    <option>
                      Middle Class
                    </option>

                    <option>
                      Upper Middle Class
                    </option>

                    <option>
                      Affluent
                    </option>

                  </select>

                </div>


                {/* FAMILY VALUES */}

                <div className="md:col-span-2">

                  <label className={labelClass}>
                    Family Values
                  </label>

                  <select
                    name="familyValues"
                    value={formData.familyValues}
                    onChange={handleChange}
                    className={selectClass}
                  >

                    <option value="">
                      Select Family Values
                    </option>

                    <option>
                      Traditional
                    </option>

                    <option>
                      Moderate
                    </option>

                    <option>
                      Liberal
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* =================================================
                ABOUT FAMILY
            ================================================== */}

            <div>

              <h3 className="text-[12px] font-semibold text-[#d9272e] mb-3">
                About Your Family
              </h3>

              <label className={labelClass}>
                Family Description
              </label>

              <textarea
                name="aboutFamily"
                value={formData.aboutFamily}
                onChange={handleChange}
                placeholder="Tell us something about your family..."
                className={textareaClass}
              />

              <p className="mt-1 text-[9px] text-[#999]">
                You can share a little about your family, values and background.
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

export default FamilyDetailsPage;