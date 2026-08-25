import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function FeaturedProfiles() {
 

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/profiles`);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to fetch profiles");
      }

      setProfiles(data.profiles || []);
    } catch (error) {
      console.error("Featured Profiles Error:", error);
      setError("Unable to load profiles");
    } finally {
      setLoading(false);
    }
  };

  // Calculate age from birth date
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <section
      id="profiles"
      className="bg-[#fffaf2] px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1180px]">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-[650px] text-center">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
            Featured Profiles
          </p>

          <h2 className="font-serif text-[34px] font-semibold leading-tight text-[#751b17] sm:text-[42px]">
            Meet Some Wonderful People
          </h2>

          <p className="mt-3 text-[13px] leading-7 text-[#806653]">
            Explore some of our recently joined profiles and
            take the first step towards finding your perfect match.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center">
            <p className="text-[13px] text-[#806653]">
              Loading profiles...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-12 text-center">
            <p className="text-[13px] text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* No Profiles */}
        {!loading && !error && profiles.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[13px] text-[#806653]">
              No profiles available at the moment.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && profiles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {profiles.slice(0, 6).map((profile) => {

              const matrimonial =
                profile.matrimonial_profiles?.[0] ||
                profile.matrimonial_profiles ||
                {};

              const educationDetails =
                profile.education_details?.[0] ||
                profile.education_details ||
                {};

              const name =
                profile.full_name || "Profile";

              const age = calculateAge(
                matrimonial.birth_date
              );

              const education =
                matrimonial.education ||
                educationDetails.highest_qualification ||
                "Not specified";

              const profession =
                matrimonial.profession ||
                educationDetails.profession ||
                educationDetails.job_title ||
                "Not specified";

              const location =
                matrimonial.state ||
                matrimonial.native_place ||
                educationDetails.work_location ||
                "Not specified";


              return (
                 <div
    key={profile.id}
    className="
      group
      overflow-hidden
      rounded-xl
      border
      border-[#ead8bd]
      bg-white
      shadow-[0_5px_20px_rgba(73,38,20,0.08)]
      transition
      duration-300
      hover:-translate-y-1
      hover:shadow-[0_12px_30px_rgba(73,38,20,0.14)]
    "
  >

    {/* Image */}
    <div className="relative h-[300px] overflow-hidden bg-[#f3e6d4]">

      {profile.profile_photo ? (
        <img
          src={profile.profile_photo}
          alt={name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#f3e6d4]">
          <span className="font-serif text-5xl font-semibold text-[#8c1d18]">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Badge */}
      <div className="absolute left-4 top-4 rounded-full bg-[#fffaf2]/95 px-3 py-1 text-[10px] font-semibold text-[#8c1d18] shadow-sm">
        New Profile
      </div>

    </div>

    {/* Details */}
    <div className="p-5">


                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <h3 className="font-serif text-[25px] font-semibold text-[#751b17]">
                          {name}
                        </h3>

                        {age && (
                          <p className="mt-1 text-[11px] text-[#806653]">
                            {age} years old
                          </p>
                        )}

                      </div>

                      <button
  type="button"
  onClick={() => alert(`Like ${name}`)}
  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8ead5] text-[20px] text-[#8c1d18] transition hover:bg-[#f5d8d8]"
>
  ♡
</button>

                    </div>

                    <div className="mt-4 space-y-2">

                      <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                        <span className="text-[#a67c35]">
                          🎓
                        </span>
                        {education}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                        <span className="text-[#a67c35]">
                          💼
                        </span>
                        {profession}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                        <span className="text-[#a67c35]">
                          📍
                        </span>
                        {location}
                      </div>

                    </div>

            <button
  type="button"
  onClick={() => {
    window.location.href = `/public-profile/${profile.id}`;
  }}
  className="
    mt-5
    w-full
    rounded-md
    border
    border-[#8c1d18]
    py-2.5
    text-[11px]
    font-semibold
    text-[#8c1d18]
    transition
    hover:bg-[#8c1d18]
    hover:text-white
  "
>
  View Profile
</button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Bottom Button */}
        <div className="mt-10 text-center">

          <a
            href="#profiles"
            className="
              inline-flex
              items-center
              rounded-md
              bg-[#8c1d18]
              px-6
              py-3
              text-[12px]
              font-semibold
              text-white
              transition
              hover:bg-[#751712]
            "
          >
            View All Profiles
          </a>

        </div>

      </div>
    </section>
  );
}

export default FeaturedProfiles;