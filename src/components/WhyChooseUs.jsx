function WhyChooseUs() {
  const features = [
    {
      icon: "🛡️",
      title: "Trusted & Secure",
      description:
        "Your privacy and personal information are protected with care.",
    },
    {
      icon: "💞",
      title: "Meaningful Matches",
      description:
        "Find profiles based on compatibility, values and life goals.",
    },
    {
      icon: "✨",
      title: "Quality Profiles",
      description:
        "We focus on genuine profiles looking for a meaningful relationship.",
    },
    {
      icon: "🤝",
      title: "Personal Support",
      description:
        "Our team is here to make your matrimonial journey easier.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-[#f8ead5] px-4 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1180px]">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-[650px] text-center">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
            Why Choose Us
          </p>

          <h2 className="font-serif text-[34px] font-semibold leading-tight text-[#751b17] sm:text-[42px]">
            A Matrimonial Journey You Can Trust
          </h2>

          <p className="mt-3 text-[13px] leading-7 text-[#806653]">
            We combine traditional values with a simple and modern
            matrimonial experience to help you find the right person.
          </p>

        </div>


        {/* Features */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                rounded-xl
                border
                border-[#ead8bd]
                bg-[#fffaf2]
                p-6
                text-center
                shadow-[0_5px_18px_rgba(73,38,20,0.06)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_28px_rgba(73,38,20,0.12)]
              "
            >

              {/* Icon */}
              <div
                className="
                  mx-auto
                  flex
                  h-[62px]
                  w-[62px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#e7c77e]
                  bg-[#f8ead5]
                  text-[25px]
                  transition
                  duration-300
                  group-hover:scale-105
                "
              >
                {feature.icon}
              </div>


              {/* Title */}
              <h3 className="mt-5 font-serif text-[23px] font-semibold text-[#751b17]">
                {feature.title}
              </h3>


              {/* Description */}
              <p className="mt-2 text-[11px] leading-6 text-[#806653]">
                {feature.description}
              </p>

            </div>
          ))}

        </div>


        {/* Bottom Highlight */}
        <div className="mt-12 flex justify-center">

          <div className="flex max-w-[720px] flex-col items-center gap-4 rounded-xl border border-[#e7c77e] bg-[#fffaf2] px-6 py-5 text-center shadow-[0_5px_18px_rgba(73,38,20,0.05)] sm:flex-row sm:text-left">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8c1d18] text-xl text-[#f5c45e]">
              ♥
            </div>

            <div>
              <h4 className="font-serif text-[20px] font-semibold text-[#751b17]">
                Your Happiness Matters
              </h4>

              <p className="mt-1 text-[11px] leading-5 text-[#806653]">
                Every profile deserves respect, privacy and a genuine
                opportunity to meet someone special.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;