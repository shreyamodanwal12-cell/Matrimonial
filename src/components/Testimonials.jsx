import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/testimonials`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch testimonials"
        );
      }

      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Testimonials Error:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, []);
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
        {/* Testimonials */}

{loading ? (
  <div className="py-10 text-center">
    <p className="text-sm text-[#806653]">
      Loading success stories...
    </p>
  </div>
) : testimonials.length === 0 ? (
  <div className="py-10 text-center">
    <p className="text-sm text-[#806653]">
      No success stories available yet.
    </p>
  </div>
) : (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {testimonials.map((testimonial, index) => (
  <div key={`${testimonial.name}-${index}`}
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
             <div className="mb-4 flex gap-1 text-[13px]">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={
        star <= Number(testimonial.rating)
          ? "text-[#d7a744]"
          : "text-[#c9b9a5]"
      }
    >
      ★
    </span>
  ))}
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
)}

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