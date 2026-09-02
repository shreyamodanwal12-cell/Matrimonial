import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import FeaturedProfiles from "../components/FeaturedProfiles";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import ChoosePackage from "../components/ChoosePackage";
function HomePage() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen bg-[#fffaf4]">

      <Navbar />

      <Reveal>
        <Hero />
      </Reveal>

      <Reveal>
        <SearchBox />
      </Reveal>


      <Reveal>
        <FeaturedProfiles />
      </Reveal>

      <Reveal>
        <WhyChooseUs />
      </Reveal>

      <Reveal>
        <HowItWorks />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>
<Reveal>
  <div id="packages">
    <ChoosePackage />
  </div>
</Reveal>
      <Reveal>
        <Footer />
      </Reveal>


      {/* ================= WELCOME POPUP ================= */}

      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl border border-[#d7a744] bg-[#fffaf4] shadow-[0_25px_80px_rgba(64,23,17,0.35)]">

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl text-[#751b17] shadow-md transition hover:bg-[#8c1d18] hover:text-white"
            >
              ×
            </button>

            {/* Popup Header */}
            <div className="bg-[#401711] px-6 py-7 text-center text-[#f8e8d5]">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-2xl text-[#f5c45e] shadow-lg">
                ॐ
              </div>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[3px] text-[#f5c45e]">
                Shiva Parvati Matrimonial
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
                Welcome to Sangam
              </h2>

            </div>

            {/* Popup Content */}
            <div className="px-6 py-7 text-center sm:px-10">

              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#a66a25]">
                A Journey of Meaningful Connections
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold text-[#401711]">
                Where Hearts Find Their Perfect Match
              </h3>

              <p className="mx-auto mt-4 max-w-[420px] text-sm leading-6 text-[#60483d]">
                Discover meaningful matrimonial connections with
                Shiva Parvati Matrimonial — built with trust,
                tradition and sincere relationships.
              </p>

              {/* Chairman */}
              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                  window.location.href = "/chairman";
                }}
                className="mt-6 w-full rounded-lg bg-[#8c1d18] px-6 py-3 text-sm font-semibold text-white shadow-[0_7px_20px_rgba(140,29,24,0.20)] transition hover:-translate-y-0.5 hover:bg-[#751712]"
              >
                Meet Our Chairman →
              </button>

              {/* Continue */}
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="mt-3 w-full rounded-lg border border-[#d7a744] px-6 py-3 text-sm font-semibold text-[#8c1d18] transition hover:bg-[#fff3dc]"
              >
                Continue to Website
              </button>

              <p className="mt-5 text-[9px] text-[#9a806f]">
                ✦ Trusted Matrimonial Platform ✦
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default HomePage;