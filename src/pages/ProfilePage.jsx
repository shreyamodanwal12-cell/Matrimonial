
import { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setError(data.message || "Unable to load profile.");
          return;
        }

        setUser(data.user);

        // Keep localStorage user data updated
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error("Profile Error:", error);
        setError(
          "Unable to connect to server. Please make sure backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff0b8]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[20px] text-[#f5c45e]">
            ॐ
          </div>

          <p className="mt-3 text-[12px] text-[#806653]">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fff0b8] px-5">
        <div className="w-full max-w-[420px] rounded-xl border border-[#e5c35d] bg-white p-7 text-center shadow-[0_8px_30px_rgba(73,38,20,0.12)]">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1d8] text-[20px]">
            !
          </div>

          <h2 className="mt-4 font-serif text-[22px] font-semibold text-[#4a1712]">
            Unable to Load Profile
          </h2>

          <p className="mt-2 text-[11px] text-[#806653]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.href = "/login"}
            className="mt-5 rounded-md bg-[#8c1d18] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#751712]"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initial = user.full_name
    ? user.full_name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-[#fff0b8] text-[#3c2415]">

      {/* ================= NAVBAR ================= */}

      <nav className="w-full border-b border-[#e5c35d] bg-[#d9272e]">

        <div className="mx-auto flex h-[72px] w-[92%] max-w-[1100px] items-center justify-between">

          {/* Brand */}

          <a
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#ffc400]">
              <span className="text-[22px] text-white">
                ♥
              </span>
            </div>

            <div className="leading-none">

              <div className="font-serif text-[17px] font-bold tracking-wide text-white">
                SHIVA PARVATI
              </div>

              <div className="mt-[3px] text-[9px] font-semibold tracking-[1px] text-[#ffc400]">
                MATRIMONIAL GULBARGA
              </div>

            </div>

          </a>

          {/* Right */}

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-[10px] font-semibold text-white">
                {user.full_name}
              </p>

              <p className="text-[8px] text-[#ffd9a0]">
                My Profile
              </p>

            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5c45e] bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
              {initial}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-[#ffd28a] px-3 py-2 text-[9px] font-semibold text-white transition hover:bg-[#b91f25]"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HEADER ================= */}

      <div className="px-4 pb-5 pt-7 text-center">

        <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
          Shiva Parvati Matrimonial
        </p>

        <h1 className="mt-2 font-serif text-[28px] font-semibold text-[#d9272e]">
          My Profile
        </h1>

        <p className="mt-1 text-[11px] text-[#806653]">
          Manage your matrimonial profile and personal details.
        </p>

      </div>


      {/* ================= MAIN CARD ================= */}

      <main className="mx-auto w-[92%] max-w-[850px] pb-12">

        <div className="overflow-hidden rounded-2xl border border-[#e5c35d] bg-white shadow-[0_8px_30px_rgba(73,38,20,0.12)]">

          {/* PROFILE HEADER */}

          <div className="bg-[#fffaf2] px-5 py-7 sm:px-8">

            <div className="flex flex-col items-center gap-4 sm:flex-row">

              {/* Avatar */}

              <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full border-4 border-[#f5c45e] bg-[#8c1d18] font-serif text-[32px] font-semibold text-[#f5c45e]">
                {initial}
              </div>


              {/* User Info */}

              <div className="text-center sm:text-left">

                <h2 className="font-serif text-[25px] font-semibold text-[#4a1712]">
                  {user.full_name}
                </h2>

                <p className="mt-1 text-[11px] text-[#806653]">
                  {user.email}
                </p>

                {user.mobile && (
                  <p className="mt-1 text-[10px] text-[#9a806f]">
                    📱 {user.mobile}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* ACCOUNT INFORMATION */}

          <div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

            <div className="mb-5">

              <h3 className="font-serif text-[19px] font-semibold text-[#4a1712]">
                Account Information
              </h3>

              <p className="mt-1 text-[10px] text-[#9a806f]">
                Your basic account details.
              </p>

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Full Name */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Full Name
                </p>

                <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
                  {user.full_name}
                </p>

              </div>


              {/* Email */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Email Address
                </p>

                <p className="mt-2 break-all text-[11px] font-medium text-[#4f3425]">
                  {user.email}
                </p>

              </div>


              {/* Mobile */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Mobile Number
                </p>

                <p className="mt-2 text-[11px] font-medium text-[#4f3425]">
                  {user.mobile || "Not provided"}
                </p>

              </div>


              {/* Account Role */}

              <div className="rounded-lg border border-[#eadfce] bg-[#fffaf5] p-4">

                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#a67c35]">
                  Account Type
                </p>

                <p className="mt-2 text-[11px] font-medium capitalize text-[#4f3425]">
                  {user.role || "User"}
                </p>

              </div>

            </div>

          </div>


          {/* PROFILE STATUS */}

          <div className="border-t border-[#eadfce] px-5 py-6 sm:px-8">

            <div className="rounded-xl border border-[#e5c35d] bg-[#fffaf2] p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <h3 className="font-serif text-[18px] font-semibold text-[#4a1712]">
                    Profile Status
                  </h3>

                  <p className="mt-1 text-[10px] text-[#806653]">
                    Your account has been successfully created.
                  </p>

                </div>

                <span className="w-fit rounded-full bg-[#e7f6ed] px-3 py-1.5 text-[9px] font-semibold text-[#287b51]">
                  Active
                </span>

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="border-t border-[#eadfce] px-5 py-5 sm:px-8">

            <div className="flex flex-col gap-3 sm:flex-row">

              <a
                href="/"
                className="flex-1 rounded-md border border-[#d7a744] py-2.5 text-center text-[10px] font-semibold text-[#8c1d18] transition hover:bg-[#fffaf2]"
              >
                Back to Home
              </a>

              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-md bg-[#d9272e] py-2.5 text-[10px] font-semibold text-white transition hover:bg-[#bb2027]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>


        {/* Bottom Message */}

        <p className="mt-6 text-center font-serif text-[17px] italic text-[#751b17]">
          “Your beautiful story begins here.”
        </p>

      </main>

    </div>
  );
}

export default ProfilePage;
