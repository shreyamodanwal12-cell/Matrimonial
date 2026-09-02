import API_BASE_URL from "../api/api";
function ChoosePackage() {
  const packages = [
    {
      name: "Basic",
      price: "₹1",
      duration: "1 Month",
      icon: "🎁",
      description: "Basic features",
    },
    {
      name: "Premium",
      price: "₹1",
      duration: "3 Months",
      icon: "👑",
      description: "Premium features",
    },
    {
      name: "Royal",
      price: "₹1",
      duration: "6 Months",
      icon: "💎",
      description: "All features",
    },
  ];

const handlePackageClick = async () => {
  try {
    // 1. Check login
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first to choose a membership plan.");
      window.location.href = "/login";
      return;
    }

    // 2. Check Aadhaar
    const response = await fetch(
      `${API_BASE_URL}/api/profiles/verification/aadhaar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Aadhaar Verification:", data);

    if (!response.ok || !data.success) {
      alert(
        data.message || "Unable to check Aadhaar verification."
      );
      return;
    }

    // 3. Aadhaar not uploaded
    if (!data.isVerified) {
      alert(
        "Please complete your Aadhaar verification before choosing a membership plan."
      );

      return;
    }

    // 4. Everything is okay
    window.location.href = "/plans";

  } catch (error) {
    console.error("Package Click Error:", error);

    alert(
      "Something went wrong while checking your verification."
    );
  }
};

  return (
    <section className="px-5 py-12 sm:px-8 lg:px-12">

      <div className="mx-auto max-w-[1100px]">

        {/* Heading */}
        <div className="mb-8 text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
            Membership
          </p>

          <h2 className="mt-2 font-serif text-[30px] font-semibold text-[#4a1712]">
            Choose Your Package
          </h2>

          <p className="mt-2 text-[11px] text-[#8c7566]">
            Choose the membership plan that suits you best.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          {packages.map((pkg) => (

            <button
              key={pkg.name}
              type="button"
              onClick={handlePackageClick}
              className="
                group
                rounded-2xl
                border border-[#eadfce]
                bg-white
                p-6
                text-center
                shadow-[0_5px_20px_rgba(73,38,20,0.06)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_15px_35px_rgba(73,38,20,0.13)]
              "
            >

              {/* Icon */}
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fff1d8]
                  text-[25px]
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                {pkg.icon}
              </div>

              {/* Name */}
              <h3 className="mt-4 font-serif text-[20px] font-semibold text-[#4a1712]">
                {pkg.name}
              </h3>

              {/* Description */}
              <p className="mt-1 text-[10px] text-[#8c7566]">
                {pkg.description}
              </p>

              {/* Price */}
              <p className="mt-4 text-[18px] font-semibold text-[#8c1d18]">
                {pkg.price}
              </p>

              {/* Duration */}
              <p className="mt-1 text-[9px] text-[#9a806f]">
                {pkg.duration}
              </p>

              {/* Button text */}
              <div className="mt-5 rounded-lg bg-[#8c1d18] px-4 py-2.5 text-[10px] font-semibold text-white transition group-hover:bg-[#6f1511]">
                Choose Plan →
              </div>

            </button>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ChoosePackage;