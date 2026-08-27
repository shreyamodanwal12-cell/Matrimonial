import { useState } from "react";
import API_BASE_URL from "../api/api";

const inputClass =
  "w-full h-[36px] px-3 rounded-[6px] border border-[#f2c65c] bg-white text-[11px] text-[#4b4b4b] placeholder:text-[#a6a6a6] outline-none focus:border-[#d9272e] focus:ring-1 focus:ring-[#d9272e]/15 transition";

const labelClass =
  "block mb-[4px] text-[10px] font-medium text-[#333]";

function AadhaarVerificationPage() {

  // =========================================
  // STATES
  // =========================================

  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    aadhaarFile: null,
    photo_1: null,
    photo_2: null,
    photo_3: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };


  // =========================================
  // AADHAAR FILE CHANGE
  // =========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      aadhaarFile: file || null,
    }));

    setError("");
  };


  // =========================================
  // PHOTO CHANGE
  // =========================================

  const handlePhotoChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0] || null,
    }));

    setError("");
  };


  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      // =====================================
      // TOKEN
      // =====================================

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        return;
      }


      // =====================================
      // AADHAAR NUMBER
      // =====================================

      const aadhaar =
        formData.aadhaarNumber.replace(/\s/g, "");

      if (!/^\d{12}$/.test(aadhaar)) {
        setError(
          "Please enter a valid 12-digit Aadhaar number."
        );
        return;
      }


      // =====================================
      // AADHAAR FILE
      // =====================================

      if (!formData.aadhaarFile) {
        setError("Please upload your Aadhaar card.");
        return;
      }


      // =====================================
      // PHOTO VALIDATION
      // =====================================

      if (!formData.photo_1) {
        setError("Please upload Photo 1.");
        return;
      }

      if (!formData.photo_2) {
        setError("Please upload Photo 2.");
        return;
      }

      if (!formData.photo_3) {
        setError("Please upload Photo 3.");
        return;
      }


      // =====================================
      // AADHAAR FILE TYPE
      // =====================================

      const allowedAadhaarTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ];

      if (
        !allowedAadhaarTypes.includes(
          formData.aadhaarFile.type
        )
      ) {
        setError(
          "Only JPG, PNG or PDF files are allowed for Aadhaar."
        );
        return;
      }


      // =====================================
      // AADHAAR FILE SIZE
      // =====================================

      if (
        formData.aadhaarFile.size >
        5 * 1024 * 1024
      ) {
        setError(
          "Aadhaar file size must be less than 5 MB."
        );
        return;
      }


      // =====================================
      // 1. UPLOAD AADHAAR
      // =====================================

      const aadhaarFormData = new FormData();

      aadhaarFormData.append(
        "aadhaarFile",
        formData.aadhaarFile
      );

      aadhaarFormData.append(
        "aadhaarNumber",
        aadhaar
      );


      const aadhaarResponse = await fetch(
        `${API_BASE_URL}/api/profiles/documents/aadhaar`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: aadhaarFormData,
        }
      );


      const aadhaarData =
        await aadhaarResponse.json();

      console.log(
        "Aadhaar Upload Response:",
        aadhaarData
      );


      if (
        !aadhaarResponse.ok ||
        !aadhaarData.success
      ) {
        throw new Error(
          aadhaarData.message ||
            "Aadhaar upload failed"
        );
      }


      // =====================================
      // 2. UPLOAD 3 PHOTOS
      // =====================================

      for (
        const photoNumber of [
          "photo_1",
          "photo_2",
          "photo_3",
        ]
      ) {

        const photoFormData =
          new FormData();

        photoFormData.append(
          "photo",
          formData[photoNumber]
        );


        const photoResponse =
          await fetch(
            `${API_BASE_URL}/api/profiles/documents/photo/${photoNumber}`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: photoFormData,
            }
          );


        const photoData =
          await photoResponse.json();


        console.log(
          `${photoNumber} Response:`,
          photoData
        );


        if (
          !photoResponse.ok ||
          !photoData.success
        ) {
          throw new Error(
            photoData.message ||
              `${photoNumber} upload failed`
          );
        }
      }


      // =====================================
      // SUCCESS
      // =====================================

      alert(
        "Aadhaar and all 3 photos uploaded successfully!"
      );

      window.location.href =
        "/profile-submitted";

    } catch (error) {

      console.error(
        "Aadhaar upload error:",
        error
      );

      setError(
        error.message ||
          "Unable to complete verification."
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================================
  // RETURN UI
  // =========================================

  return (
    <div className="min-h-screen w-full bg-[#fff0b8] text-[#333]">

      {/* NAVBAR */}
      <nav className="w-full h-[72px] bg-[#d9272e] flex items-center">

        <div className="w-full max-w-[1100px] mx-auto px-5 flex items-center">

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


      {/* HEADER */}

      <div className="text-center pt-[20px] pb-[18px]">

        <h1 className="text-[19px] sm:text-[20px] font-medium text-[#d9272e]">
          Aadhaar Verification
        </h1>

        <p className="text-[11px] text-[#765d2d] mt-[4px]">
          Verify your identity to complete your matrimonial profile.
        </p>

      </div>


      {/* MAIN CARD */}

      <div className="w-full flex justify-center px-3 sm:px-5 pb-10">

        <div className="w-full max-w-[650px] bg-white rounded-[14px] border border-[#f1c63d] shadow-[0_7px_20px_rgba(88,67,20,0.14)] px-4 sm:px-7 pt-7 pb-6">


          {/* PROGRESS */}

          <div className="flex justify-center items-center mb-7">

            {["1", "2", "3", "4"].map(
              (step) => (
                <div
                  key={step}
                  className="flex items-center"
                >

                  <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
                    ✓
                  </div>

                  <div className="w-[42px] h-[1px] bg-[#d9272e]" />

                </div>
              )
            )}

            <div className="w-[30px] h-[30px] rounded-full bg-[#d9272e] text-white flex items-center justify-center text-[11px] font-semibold">
              5
            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="w-full rounded-[11px] border border-[#e8e8e8] px-4 sm:px-5 pt-5 pb-5"
          >

            <div className="mb-5">

              <h2 className="font-serif text-[17px] text-[#222]">
                Identity Verification
              </h2>

              <p className="text-[10px] text-[#555] mt-[3px]">
                Please provide your Aadhaar details and profile photos.
              </p>

            </div>


            {/* AADHAAR NUMBER */}

            <div className="mb-5">

              <label className={labelClass}>
                Aadhaar Number
              </label>

              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                placeholder="Enter 12-digit Aadhaar number"
                maxLength="12"
                inputMode="numeric"
                className={inputClass}
              />

            </div>


            {/* AADHAAR FILE */}

            <div className="mb-5">

              <label className={labelClass}>
                Upload Aadhaar Card
              </label>

              <input
                type="file"
                name="aadhaarFile"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="w-full text-[10px] text-[#555] border border-[#f2c65c] rounded-[6px] bg-white p-[7px]"
              />

            </div>


            {/* PHOTO 1 */}

            <div className="mb-5">

              <label className={labelClass}>
                Upload Photo 1
              </label>

              <input
                type="file"
                name="photo_1"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handlePhotoChange}
                className="w-full text-[10px] text-[#555] border border-[#f2c65c] rounded-[6px] bg-white p-[7px]"
              />

            </div>


            {/* PHOTO 2 */}

            <div className="mb-5">

              <label className={labelClass}>
                Upload Photo 2
              </label>

              <input
                type="file"
                name="photo_2"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handlePhotoChange}
                className="w-full text-[10px] text-[#555] border border-[#f2c65c] rounded-[6px] bg-white p-[7px]"
              />

            </div>


            {/* PHOTO 3 */}

            <div className="mb-5">

              <label className={labelClass}>
                Upload Photo 3
              </label>

              <input
                type="file"
                name="photo_3"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handlePhotoChange}
                className="w-full text-[10px] text-[#555] border border-[#f2c65c] rounded-[6px] bg-white p-[7px]"
              />

            </div>


            {/* PRIVACY */}

            <div className="bg-[#fff8dc] border border-[#f2d47b] rounded-[7px] p-3 mb-5">

              <p className="text-[9px] text-[#765d2d] leading-[15px]">
                Your Aadhaar information will be used only for identity verification and profile verification purposes.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mb-4 rounded-[6px] bg-red-50 border border-red-200 px-3 py-2">

                <p className="text-[9px] text-red-600">
                  {error}
                </p>

              </div>
            )}


            {/* BUTTON */}

            <div className="pt-3 border-t border-[#eeeeee] flex justify-end">

              <button
                type="submit"
                disabled={loading}
                className="bg-[#d9272e] hover:bg-[#bb2027] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[10px] font-medium px-5 py-[8px] rounded-[4px] shadow-sm transition"
              >

                {loading
                  ? "Uploading..."
                  : "Submit Aadhaar Verification"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AadhaarVerificationPage;