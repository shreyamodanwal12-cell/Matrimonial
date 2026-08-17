function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Create Your Profile",
      description:
        "Tell us about yourself, your interests, values and what you are looking for in a life partner.",
    },
    {
      number: "02",
      icon: "🔎",
      title: "Discover Matches",
      description:
        "Browse genuine profiles and use our search options to discover people who match your preferences.",
    },
    {
      number: "03",
      icon: "💬",
      title: "Connect",
      description:
        "Take the next step by expressing interest and starting a meaningful conversation.",
    },
    {
      number: "04",
      icon: "💍",
      title: "Begin Your Journey",
      description:
        "Build a connection based on trust, understanding and shared values.",
    },
  ];

  return (
    <section
      id="how"
      className="bg-[#fffaf2] px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1180px]">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-[650px] text-center">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
            Simple & Easy
          </p>

          <h2 className="font-serif text-[34px] font-semibold leading-tight text-[#751b17] sm:text-[42px]">
            How It Works
          </h2>

          <p className="mt-3 text-[13px] leading-7 text-[#806653]">
            Finding your life partner doesn't have to be complicated.
            Follow these simple steps to begin your journey.
          </p>

        </div>


        {/* Steps */}
        <div className="relative">

          {/* Connecting Line - Desktop */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[35px] hidden h-px bg-[#dfc27b] lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative text-center"
              >

                {/* Icon Circle */}
                <div className="relative z-10 mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#fffaf2] shadow-[0_4px_12px_rgba(73,38,20,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#8c1d18]">

                  <span className="text-[25px]">
                    {step.icon}
                  </span>

                </div>


                {/* Number */}
                <p className="mt-4 text-[10px] font-semibold tracking-[2px] text-[#a67c35]">
                  STEP {step.number}
                </p>


                {/* Title */}
                <h3 className="mt-2 font-serif text-[23px] font-semibold text-[#751b17]">
                  {step.title}
                </h3>


                {/* Description */}
                <p className="mx-auto mt-2 max-w-[230px] text-[11px] leading-6 text-[#806653]">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>


        {/* CTA */}
        <div className="mt-12 text-center">

          <a
            href="/register"
            className="
              inline-flex
              items-center
              gap-2
              rounded-md
              bg-[#8c1d18]
              px-6
              py-3
              text-[12px]
              font-semibold
              text-white
              shadow-[0_5px_15px_rgba(140,29,24,0.2)]
              transition
              hover:bg-[#751712]
              hover:shadow-[0_8px_20px_rgba(140,29,24,0.25)]
            "
          >
            Create Your Profile
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;