function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#401711] px-4 pt-14 text-[#f8e8d5]"
    >
      <div className="mx-auto max-w-[1180px]">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] text-[21px] text-[#f5c45e]">
                ॐ
              </div>

              <div className="leading-none">

                <h2 className="font-serif text-[23px] font-semibold text-white">
                  Shiva Parvati
                </h2>

                <p className="mt-1 text-[9px] uppercase tracking-[2.5px] text-[#f5c45e]">
                  Matrimonial
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-[270px] text-[11px] leading-6 text-[#d8bfae]">
              Helping individuals and families find meaningful,
              respectful and lasting relationships through a trusted
              matrimonial platform.
            </p>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="font-serif text-[20px] font-semibold text-[#f5c45e]">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-2.5">

              <a
                href="#home"
                className="w-fit text-[11px] text-[#d8bfae] transition hover:text-[#f5c45e]"
              >
                Home
              </a>

              <a
                href="#profiles"
                className="w-fit text-[11px] text-[#d8bfae] transition hover:text-[#f5c45e]"
              >
                Profiles
              </a>

              <a
                href="#about"
                className="w-fit text-[11px] text-[#d8bfae] transition hover:text-[#f5c45e]"
              >
                About Us
              </a>

              <a
                href="#how"
                className="w-fit text-[11px] text-[#d8bfae] transition hover:text-[#f5c45e]"
              >
                How It Works
              </a>

              <a
                href="/register"
                className="w-fit text-[11px] text-[#d8bfae] transition hover:text-[#f5c45e]"
              >
                Register
              </a>

            </div>

          </div>


          {/* Contact */}
          <div>

            <h3 className="font-serif text-[20px] font-semibold text-[#f5c45e]">
              Contact Us
            </h3>

            <div className="mt-4 flex flex-col gap-3">

              <div className="flex gap-3">

                <span className="text-[#f5c45e]">
                  📍
                </span>

                <p className="text-[11px] leading-5 text-[#d8bfae]">
                  Gulbarga, Karnataka
                </p>

              </div>

              <div className="flex gap-3">

                <span className="text-[#f5c45e]">
                  ✉
                </span>

                <p className="text-[11px] leading-5 text-[#d8bfae]">
                  support@shivaparvati.com
                </p>

              </div>

              <div className="flex gap-3">

                <span className="text-[#f5c45e]">
                  ☎
                </span>

                <p className="text-[11px] leading-5 text-[#d8bfae]">
                  +91 XXXXX XXXXX
                </p>

              </div>

            </div>

          </div>


          {/* Social / CTA */}
          <div>

            <h3 className="font-serif text-[20px] font-semibold text-[#f5c45e]">
              Begin Your Journey
            </h3>

            <p className="mt-4 text-[11px] leading-6 text-[#d8bfae]">
              Take the first step towards finding someone special.
            </p>

            <a
              href="/register"
              className="
                mt-5
                inline-flex
                rounded-md
                bg-[#f2c15b]
                px-5
                py-2.5
                text-[11px]
                font-semibold
                text-[#4a1b12]
                transition
                hover:bg-[#ffd477]
              "
            >
              Register Free
            </a>

          </div>

        </div>


        {/* Divider */}
        <div className="border-t border-[#704027]" />


        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-center sm:flex-row sm:text-left">

          <p className="text-[10px] text-[#bfa494]">
            © {new Date().getFullYear()} Shiva Parvati Matrimonial. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <a
              href="#"
              className="text-[10px] text-[#bfa494] transition hover:text-[#f5c45e]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[10px] text-[#bfa494] transition hover:text-[#f5c45e]"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;