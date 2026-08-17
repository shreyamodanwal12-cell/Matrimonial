function Testimonials() {
  const testimonials = [
    {
      name: "Priya & Rahul",
      location: "Bangalore",
      message:
        "We found each other through Shiva Parvati Matrimonial. The experience was simple, respectful and helped our families connect beautifully.",
    },
    {
      name: "Anjali & Karthik",
      location: "Hyderabad",
      message:
        "The profiles felt genuine and the platform was very easy to use. We are grateful for the wonderful beginning of our journey together.",
    },
    {
      name: "Sneha & Arjun",
      location: "Gulbarga",
      message:
        "What started as a simple profile search turned into a beautiful relationship. Thank you for helping us find each other.",
    },
  ];

  return (
    <section className="bg-[#f8ead5] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px]">

        {/* Heading */}
        <div className="mx-auto mb-11 max-w-[650px] text-center">

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
            Success Stories
          </p>

          <h2 className="font-serif text-[34px] font-semibold leading-tight text-[#751b17] sm:text-[42px]">
            Stories That Inspire Us
          </h2>

          <p className="mt-3 text-[13px] leading-7 text-[#806653]">
            Every meaningful connection is a beautiful story.
            Here are a few couples who began their journey with us.
          </p>

        </div>


        {/* Testimonials */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="
                group
                relative
                rounded-xl
                border
                border-[#ead8bd]
                bg-[#fffaf2]
                p-6
                shadow-[0_5px_20px_rgba(73,38,20,0.06)]
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_28px_rgba(73,38,20,0.12)]
              "
            >

              {/* Quote */}
              <div className="absolute right-5 top-3 font-serif text-[55px] leading-none text-[#d7a744]/30">
                “
              </div>


              {/* Stars */}
              <div className="mb-4 flex gap-1 text-[13px] text-[#d7a744]">
                ★ ★ ★ ★ ★
              </div>


              {/* Message */}
              <p className="relative z-10 text-[12px] leading-7 text-[#665044]">
                “{testimonial.message}”
              </p>


              {/* Divider */}
              <div className="my-5 h-px bg-[#ead8bd]" />


              {/* Person */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[18px] font-semibold text-[#f5c45e]">
                  ♥
                </div>

                <div>

                  <h3 className="font-serif text-[18px] font-semibold text-[#751b17]">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-[10px] text-[#806653]">
                    {testimonial.location}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>


        {/* Bottom Message */}
        <div className="mt-10 text-center">

          <p className="font-serif text-[22px] italic text-[#751b17]">
            “Your beautiful story could be next.”
          </p>

          <a
            href="/register"
            className="
              mt-5
              inline-flex
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
            Start Your Story
          </a>

        </div>

      </div>
    </section>
  );
}

export default Testimonials;