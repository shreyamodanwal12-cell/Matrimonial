
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
const [accountOpen, setAccountOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ead8bd] bg-[#fffaf2]">
      <div className="mx-auto flex h-[78px] w-[92%] max-w-[1180px] items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] text-[24px] text-[#f5c45e]">
            ॐ
          </div>

          <div className="leading-none">
            <h2 className="font-serif text-[25px] font-semibold text-[#751b17]">
              Shiva Parvati
            </h2>

            <span className="text-[10px] uppercase tracking-[3px] text-[#a67c35]">
              Matrimonial
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">

          <a
            href="#home"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            Home
          </a>

          <a
            href="#profiles"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            Profiles
          </a>

          <a
            href="#about"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            About Us
          </a>
<a
  href="/chairman"
  className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
>
  About Chairman
</a>
          <a
            href="#how"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            Contact
          </a>





          {/* Logged In */}
          {token && user ? (
            <>
             <div className="relative">

  <button
    type="button"
    onClick={() => setAccountOpen(!accountOpen)}
    className="flex items-center gap-1 rounded-md px-4 py-2 text-[13px] font-medium text-[#8c1d18] transition hover:bg-[#f7ead6]"
  >
    Account
    <span className="text-[10px]">
      {accountOpen ? "▲" : "▼"}
    </span>
  </button>

  {accountOpen && (
    <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-[#ead8bd] bg-white py-2 shadow-lg">

      <a
        href="/profile"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        My Profile
      </a>

      <a
        href="/plans"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        Plans
      </a>

      <a
        href="/my-membership"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        My Membership
      </a>

    </div>
  )}

</div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-[#8c1d18] px-5 py-[10px] text-[13px] font-medium text-white transition hover:bg-[#751712]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Logged Out */}
              <a
                href="/login"
                className="rounded-md px-4 py-2 text-[13px] font-medium text-[#8c1d18] transition hover:bg-[#f7ead6]"
              >
                Login
              </a>

              <a
                href="/register"
                className="rounded-md bg-[#8c1d18] px-5 py-[10px] text-[13px] font-medium text-white transition hover:bg-[#751712]"
              >
                Register
              </a>
            </>
          )}

        </nav>

        {/* Mobile Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-2xl text-[#8c1d18] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#ead8bd] bg-[#fffaf2] px-5 py-5 md:hidden">

          <nav className="mx-auto flex max-w-[1180px] flex-col gap-4">

            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              Home
            </a>

            <a
              href="#profiles"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              Profiles
            </a>

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              About Us
            </a>
<a
  href="/chairman"
  onClick={() => setOpen(false)}
  className="text-sm text-[#563927]"
>
  About Chairman
</a>
            <a
              href="#how"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              How It Works
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              Contact
            </a>
<a
  href="/plans"
  onClick={() => setOpen(false)}
  className="text-sm font-medium text-[#8c1d18]"
>
  Plans
</a>

<a
  href="/my-membership"
  onClick={() => setOpen(false)}
  className="text-sm font-medium text-[#8c1d18]"
>
  My Membership
</a>
            {/* Mobile Logged In */}
            {token && user ? (
              <>
                <div className="relative">

  <button
    type="button"
    onClick={() => setAccountOpen(!accountOpen)}
    className="flex items-center gap-1 rounded-md px-4 py-2 text-[13px] font-medium text-[#8c1d18] transition hover:bg-[#f7ead6]"
  >
    Account
    <span className="text-[10px]">
      {accountOpen ? "▲" : "▼"}
    </span>
  </button>

  {accountOpen && (
    <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-[#ead8bd] bg-white py-2 shadow-lg">

      <a
        href="/profile"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        My Profile
      </a>

      <a
        href="/plans"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        Plans
      </a>

      <a
        href="/my-membership"
        className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
        onClick={() => setAccountOpen(false)}
      >
        My Membership
      </a>

    </div>
  )}

</div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-fit rounded-md bg-[#8c1d18] px-5 py-2 text-sm text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[#8c1d18]"
                >
                  Login
                </a>

                <a
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="w-fit rounded-md bg-[#8c1d18] px-5 py-2 text-sm text-white"
                >
                  Register
                </a>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;