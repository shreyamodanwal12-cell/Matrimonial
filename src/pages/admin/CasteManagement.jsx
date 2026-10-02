
import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function CasteManagement() {
  const [castes, setCastes] = useState([]);
  const [caste, setCaste] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ==========================================
  // GET CASTES
  // ==========================================
  const fetchCastes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/castes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCastes(data.castes || []);
      } else {
        alert(data.message || "Unable to fetch castes");
      }
    } catch (error) {
      console.error("Fetch Castes Error:", error);
      alert("Server error while fetching castes");
    }
  };

  useEffect(() => {
    fetchCastes();
  }, []);

  // ==========================================
  // ADD CASTE
  // ==========================================
  const handleAddCaste = async () => {
    if (!caste.trim()) {
      alert("Please enter caste name");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/admin/castes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: caste,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add caste");
        return;
      }

      alert("Caste added successfully");
      setCaste("");
      fetchCastes();
    } catch (error) {
      console.error("Add Caste Error:", error);
      alert("Server error while adding caste");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ADD SUB-CASTE
  // ==========================================
  const handleAddSubCaste = async () => {
    if (!selectedCaste) {
      alert("Please select caste");
      return;
    }

    if (!subCaste.trim()) {
      alert("Please enter sub-caste name");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/sub-castes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            caste_id: selectedCaste,
            name: subCaste,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add sub-caste");
        return;
      }

      alert("Sub-Caste added successfully");
      setSubCaste("");
    } catch (error) {
      console.error("Add Sub-Caste Error:", error);
      alert("Server error while adding sub-caste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-4 py-6 md:px-8">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8b0000] text-xl text-white shadow-md">
            🪷
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#7f0000]">
              Caste Management
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage caste and sub-caste options for matrimonial profiles
            </p>
          </div>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-transparent mt-5" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ==========================================
            ADD CASTE CARD
        ========================================== */}
        <div className="bg-white rounded-2xl border border-[#ead9c5] shadow-[0_8px_25px_rgba(127,0,0,0.08)] overflow-hidden">

          {/* CARD HEADER */}
          <div className="bg-gradient-to-r from-[#8b0000] to-[#a80000] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-xl">
                🪷
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Add Caste
                </h2>

                <p className="text-xs text-white/75 mt-1">
                  Create a new caste option
                </p>
              </div>
            </div>
          </div>

          {/* CARD BODY */}
          <div className="p-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caste Name
            </label>

            <input
              type="text"
              placeholder="Enter caste name"
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
              className="w-full rounded-xl border border-[#dfcfbd] bg-[#fffdf9] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000]/10"
            />

            <button
              onClick={handleAddCaste}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-[#8b0000] px-5 py-3 font-semibold text-white shadow-md transition hover:bg-[#700000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding..." : "+ Add Caste"}
            </button>

            {/* EXISTING CASTES */}
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#7f0000]">
                  Available Castes
                </h3>

                <span className="rounded-full bg-[#fff4d6] px-3 py-1 text-xs font-semibold text-[#9a7200]">
                  {castes.length}
                </span>
              </div>

              {castes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#decdb8] bg-[#fffaf5] p-5 text-center text-sm text-gray-500">
                  No castes added yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {castes.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full border border-[#ead7a2] bg-[#fff8e7] px-4 py-2 text-sm font-medium text-[#7f0000]"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            ADD SUB-CASTE CARD
        ========================================== */}
        <div className="bg-white rounded-2xl border border-[#ead9c5] shadow-[0_8px_25px_rgba(127,0,0,0.08)] overflow-hidden">

          {/* CARD HEADER */}
          <div className="bg-gradient-to-r from-[#d4af37] to-[#b99118] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                ✨
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Add Sub-Caste
                </h2>

                <p className="text-xs text-white/80 mt-1">
                  Add a sub-caste under an existing caste
                </p>
              </div>
            </div>
          </div>

          {/* CARD BODY */}
          <div className="p-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Caste
            </label>

            <select
              value={selectedCaste}
              onChange={(e) => setSelectedCaste(e.target.value)}
              className="w-full rounded-xl border border-[#dfcfbd] bg-[#fffdf9] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000]/10"
            >
              <option value="">Select Caste</option>

              {castes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2 mt-5">
              Sub-Caste Name
            </label>

            <input
              type="text"
              placeholder="Enter sub-caste name"
              value={subCaste}
              onChange={(e) => setSubCaste(e.target.value)}
              className="w-full rounded-xl border border-[#dfcfbd] bg-[#fffdf9] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000]/10"
            />

            <button
              onClick={handleAddSubCaste}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-[#8b0000] px-5 py-3 font-semibold text-white shadow-md transition hover:bg-[#700000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding..." : "+ Add Sub-Caste"}
            </button>

            {/* INFO */}
            <div className="mt-6 rounded-xl border border-[#ead7a2] bg-[#fff9e9] p-4">
              <div className="flex gap-3">
                <span className="text-lg">💡</span>

                <p className="text-xs leading-5 text-gray-600">
                  Select a caste first, then add its sub-caste. The
                  sub-caste will be linked to the selected caste.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-6 rounded-xl border border-[#ead9c5] bg-white px-5 py-4 shadow-sm">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-[#8b0000]">
            Note:
          </span>{" "}
          Changes made here will be available for caste and sub-caste
          selection in matrimonial profiles.
        </p>
      </div>

    </div>
  );
}

export default CasteManagement;
