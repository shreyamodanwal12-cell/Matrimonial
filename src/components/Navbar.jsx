import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function Navbar() {
  const [open, setOpen] = useState(false);
const [accountOpen, setAccountOpen] = useState(false);
const [notificationCount, setNotificationCount] = useState(0);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
useEffect(() => {
  const fetchInterestNotifications = async () => {
    if (!token || !user) {
      setNotificationCount(0);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/interests/received`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setNotificationCount(
          (data.requests || []).length
        );
      }
    } catch (error) {
      console.error(
        "Interest notification error:",
        error
      );
    }
  };

  fetchInterestNotifications();
}, [token, user]);
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
            href="#public-profile"
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
{/* Notifications */}
<div className="relative">
  <button
    type="button"
    onClick={() => {
      window.location.href = "/interest-requests";
    }}
    className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8bd] bg-white text-[16px] text-[#8c1d18] transition hover:bg-[#f7ead6]"
    title="Interest Notifications"
  >
    🔔

    {notificationCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d92c2c] px-1 text-[9px] font-bold text-white">
        {notificationCount > 99 ? "99+" : notificationCount}
      </span>
    )}
  </button>
</div>
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
  href="/interest-requests"
  className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
  onClick={() => setAccountOpen(false)}
>
  💌 Interest Requests
</a>

<a
  href="/my-interests"
  className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
  onClick={() => setAccountOpen(false)}
>
  ❤️ My Interests
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
              href="#public-profile"
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
{/* Mobile Notifications */}
<button
  type="button"
  onClick={() => {
    setOpen(false);
    window.location.href = "/interest-requests";
  }}
  className="flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-[#8c1d18] hover:bg-[#f7ead6]"
>
  <span className="relative text-lg">
    🔔

    {notificationCount > 0 && (
      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d92c2c] px-1 text-[8px] font-bold text-white">
        {notificationCount > 99 ? "99+" : notificationCount}
      </span>
    )}
  </span>

  Notifications
</button>
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
  href="/interest-requests"
  className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
  onClick={() => setAccountOpen(false)}
>
  💌 Interest Requests
</a>

<a
  href="/my-interests"
  className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
  onClick={() => setAccountOpen(false)}
>
  ❤️ My Interests
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