function FeaturedProfiles() {
  const profiles = [
    {
      name: "Ananya",
      age: 27,
      education: "M.Tech",
      profession: "Software Engineer",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Priya",
      age: 26,
      education: "MBA",
      profession: "Business Professional",
      location: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Rahul",
      age: 29,
      education: "B.Tech",
      profession: "Software Developer",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    },
  ];

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


        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {profiles.map((profile) => (
            <div
              key={profile.name}
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

                <img
                  src={profile.image}
                  alt={profile.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Small Badge */}
                <div className="absolute left-4 top-4 rounded-full bg-[#fffaf2]/95 px-3 py-1 text-[10px] font-semibold text-[#8c1d18] shadow-sm">
                  New Profile
                </div>

              </div>


              {/* Details */}
              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h3 className="font-serif text-[25px] font-semibold text-[#751b17]">
                      {profile.name}
                    </h3>

                    <p className="mt-1 text-[11px] text-[#806653]">
                      {profile.age} years old
                    </p>

                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8ead5] text-[#8c1d18]">
                    ♡
                  </div>

                </div>


                <div className="mt-4 space-y-2">

                  <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                    <span className="text-[#a67c35]">🎓</span>
                    {profile.education}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                    <span className="text-[#a67c35]">💼</span>
                    {profile.profession}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#563927]">
                    <span className="text-[#a67c35]">📍</span>
                    {profile.location}
                  </div>

                </div>


                <button
                  type="button"
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
          ))}

        </div>


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