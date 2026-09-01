import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH MEMBERS =================
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Admin login required");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/profiles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Members Response:", data);
      console.log("All Members:", data.profiles);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch members"
        );
      }

      setMembers(data.profiles || []);
    } catch (err) {
      console.error("Members Error:", err);
      setError(err.message || "Unable to load members");
    } finally {
      setLoading(false);
    }
  };

  // ================= GET MATRIMONIAL DATA =================
  const getMatrimonial = (member) => {
    return (
      member.matrimonial_profiles?.[0] ||
      member.matrimonial_profiles ||
      {}
    );
  };

  // ================= AGE =================
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
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= NORMALIZE MEMBERS =================
  const normalizedMembers = members.map((member) => {
    const matrimonial = getMatrimonial(member);

    const name =
      member.full_name || "Profile";

    const memberGender =
      matrimonial.gender || "No Gender";

    const age = calculateAge(
      matrimonial.birth_date
    );

    const location =
      matrimonial.state ||
      matrimonial.native_place ||
      "Not specified";

    const profession =
      matrimonial.profession ||
      "Not specified";

    const memberStatus =
      member.profile_status || "Pending";

    return {
      ...member,

      displayName: name,
      displayGender: memberGender,
      displayAge: age,
      displayLocation: location,
      displayProfession: profession,
      displayStatus: memberStatus,
      displayDate: formatDate(member.created_at),

      initial: name
        .charAt(0)
        .toUpperCase(),
    };
  });

  // ================= FILTER =================
  const filteredMembers =
    normalizedMembers.filter((member) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        member.displayName
          .toLowerCase()
          .includes(searchText) ||

        member.displayLocation
          .toLowerCase()
          .includes(searchText) ||

        member.displayProfession
          .toLowerCase()
          .includes(searchText);

      const matchesGender =
        gender === "All" ||
        member.displayGender === gender;

      const matchesStatus =
        status === "All" ||
        member.displayStatus === status;

      return (
        matchesSearch &&
        matchesGender &&
        matchesStatus
      );
    });

  // ================= COUNTS =================
  const totalMembers =
    normalizedMembers.length;

  const activeMembers =
    normalizedMembers.filter(
      (member) =>
        member.is_active === true
    ).length;

  const pendingMembers =
    normalizedMembers.filter(
      (member) =>
        member.displayStatus === "Pending"
    ).length;

  const suspendedMembers =
    normalizedMembers.filter(
      (member) =>
        member.displayStatus === "Suspended"
    ).length;

  // ================= VIEW =================
  const handleView = (member) => {
    console.log("View Member:", member);

    // Existing working admin Profiles page
    window.location.href =
      "/admin/profiles";
  };

  // ================= EDIT =================
  const handleEdit = (member) => {
    console.log("Edit Member:", member);

    // For now open existing profile management page
    window.location.href =
      "/admin/profiles";
  };

  // ================= ADD MEMBER =================
  const handleAddMember = () => {
    // Registration/profile creation flow
    window.location.href =
      "/register";
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] p-10 text-center">
        <p className="text-[13px] text-[#806653]">
          Loading members...
        </p>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="min-h-screen bg-[#faf7f2] p-10 text-center">
        <p className="text-[13px] text-red-700">
          {error}
        </p>

        <button
          onClick={fetchMembers}
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
            Members
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

      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-[1400px] p-4 sm:p-7">

        {/* HEADING */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
              Manage Members
            </h2>

            <p className="mt-1 text-[11px] text-[#8c7566]">
              View and manage all registered matrimonial profiles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddMember}
            className="w-fit rounded-lg bg-[#8c1d18] px-5 py-2.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#701510]"
          >
            + Add Member
          </button>

        </div>

        {/* ================= SUMMARY ================= */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Total Members
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#4a1712]">
              {totalMembers}
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Active
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#287b51]">
              {activeMembers}
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Pending
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#b36b11]">
              {pendingMembers}
            </p>
          </div>

          <div className="rounded-xl border border-[#eadfce] bg-white p-4">
            <p className="text-[9px] text-[#9a806f]">
              Suspended
            </p>

            <p className="mt-1 font-serif text-[24px] font-semibold text-[#b63b3b]">
              {suspendedMembers}
            </p>
          </div>

        </div>

        {/* ================= FILTER ================= */}
        <div className="rounded-xl border border-[#eadfce] bg-white p-4 shadow-[0_4px_18px_rgba(73,38,20,0.04)] sm:p-5">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <div className="flex flex-1 items-center rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3">

              <span className="text-[15px] text-[#a67c35]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by name, location or profession..."
                className="h-10 w-full bg-transparent px-2 text-[10px] outline-none placeholder:text-[#b5a293]"
              />

            </div>

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none"
            >
              <option value="All">
                All Genders
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="h-10 rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none"
            >
              <option value="All">
                All Status
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Suspended">
                Suspended
              </option>
            </select>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="mt-5 overflow-hidden rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">

          <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-4">

            <div>
              <h3 className="font-serif text-[21px] font-semibold text-[#4a1712]">
                Registered Members
              </h3>

              <p className="mt-0.5 text-[9px] text-[#9a806f]">
                Showing {filteredMembers.length} of{" "}
                {totalMembers} members
              </p>
            </div>

          </div>

          {/* DESKTOP */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#eadfce] bg-[#fffaf5]">

                  <th className="px-5 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Member
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Age
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Gender
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Location
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Profession
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] uppercase tracking-[1px] text-[#9a806f]">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredMembers.map((member) => (

                  <tr
                    key={member.id}
                    className="border-b border-[#f0e7dc] last:border-0 hover:bg-[#fffaf5]"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        {member.profile_photo ? (
                          <img
                            src={member.profile_photo}
                            alt={member.displayName}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[12px] font-semibold text-[#f5c45e]">
                            {member.initial}
                          </div>
                        )}

                        <div>
                          <p className="text-[10px] font-semibold text-[#4f3425]">
                            {member.displayName}
                          </p>

                          <p className="mt-0.5 text-[8px] text-[#a28c7c]">
                            Joined {member.displayDate}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.displayAge || "—"}
                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.displayGender}
                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.displayLocation}
                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#806653]">
                      {member.displayProfession}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
                          member.displayStatus === "Approved"
                            ? "bg-[#e7f6ed] text-[#287b51]"
                            : member.displayStatus === "Pending"
                              ? "bg-[#fff1d8] text-[#b36b11]"
                              : member.displayStatus === "Rejected"
                                ? "bg-[#f8e3e3] text-[#b63b3b]"
                                : "bg-[#f8e3e3] text-[#b63b3b]"
                        }`}
                      >
                        {member.displayStatus}
                      </span>

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(member)
                          }
                          className="rounded-md border border-[#eadfce] px-2.5 py-1.5 text-[9px] font-medium text-[#8c1d18] transition hover:bg-[#fff5e8]"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(member)
                          }
                          className="rounded-md border border-[#eadfce] px-2.5 py-1.5 text-[9px] font-medium text-[#806653] transition hover:bg-[#fff5e8]"
                        >
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* ================= MOBILE ================= */}
          <div className="divide-y divide-[#eadfce] md:hidden">

            {filteredMembers.map((member) => (

              <div
                key={member.id}
                className="p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    {member.profile_photo ? (
                      <img
                        src={member.profile_photo}
                        alt={member.displayName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[13px] font-semibold text-[#f5c45e]">
                        {member.initial}
                      </div>
                    )}

                    <div>

                      <p className="text-[11px] font-semibold text-[#4f3425]">
                        {member.displayName}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {member.displayAge || "—"} •{" "}
                        {member.displayGender}
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#9a806f]">
                        {member.displayLocation}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[8px] font-semibold ${
                      member.displayStatus === "Approved"
                        ? "bg-[#e7f6ed] text-[#287b51]"
                        : "bg-[#fff1d8] text-[#b36b11]"
                    }`}
                  >
                    {member.displayStatus}
                  </span>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <p className="text-[9px] text-[#806653]">
                    {member.displayProfession}
                  </p>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleView(member)
                      }
                      className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] text-[#8c1d18]"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(member)
                      }
                      className="rounded-md border border-[#eadfce] px-3 py-1.5 text-[9px] text-[#806653]"
                    >
                      Edit
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* EMPTY */}
          {filteredMembers.length === 0 && (
            <div className="px-5 py-16 text-center">

              <div className="text-3xl">
                🔍
              </div>

              <h3 className="mt-3 font-serif text-[18px] font-semibold text-[#4a1712]">
                No members found
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>

        {/* ================= FOOTER COUNT ================= */}
        <div className="mt-5 flex justify-between">

          <p className="text-[9px] text-[#9a806f]">
            Showing {filteredMembers.length} of{" "}
            {totalMembers} members
          </p>

        </div>

      </main>

    </div>
  );
}

export default MembersPage;