
import { useState } from "react";
import API_BASE_URL from "../../api/api";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "h-11 w-full rounded-md border border-[#e7c77e] bg-white px-3 text-[12px] text-[#563927] outline-none transition placeholder:text-[#b6a294] focus:border-[#c58a25] focus:ring-2 focus:ring-[#e7c77e]/30";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
  `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Role based redirect
      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to server. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0b9]">

      {/* Top Brand Area */}
      <div className="px-4 pb-6 pt-9 text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[25px] text-[#f5c45e] shadow-md">
          ॐ
        </div>

        <h1 className="mt-3 font-serif text-[31px] font-semibold leading-none text-[#d92c2c]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[11px] text-[#806653]">
          Login to continue your matrimonial journey
        </p>

      </div>


      {/* Login Card */}
      <main className="mx-auto w-[92%] max-w-[450px] pb-12">

        <div className="rounded-xl border border-[#e5c35d] bg-white p-5 shadow-[0_8px_30px_rgba(73,38,20,0.12)] sm:p-7">

          {/* Card Heading */}
          <div className="text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
              Shiva Parvati Matrimonial
            </p>

            <h2 className="mt-2 font-serif text-[25px] font-semibold text-[#3c2415]">
              Sign In
            </h2>

            <p className="mt-1 text-[11px] text-[#8c5f48]">
              Enter your details to access your profile
            </p>

          </div>


          {/* Form */}
          <form
            className="mt-7"
            onSubmit={handleLogin}
          >

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-[11px] text-red-600">
                {error}
              </div>
            )}


            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#563927]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={inputClass}
                autoComplete="email"
              />
            </div>


            {/* Password */}
            <div className="mt-4">

              <div className="mb-1.5 flex items-center justify-between">

                <label className="block text-[11px] font-medium text-[#563927]">
                  Password
                </label>

                <button
                  type="button"
                  className="text-[10px] font-medium text-[#a67c35] transition hover:text-[#8c1d18]"
                >
                  Forgot Password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-11`}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#806653] transition hover:text-[#8c1d18]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* Remember Me */}
            <div className="mt-4 flex items-center">

              <label className="flex cursor-pointer items-center gap-2 text-[10px] text-[#806653]">

                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-[#d92c2c]"
                />

                Remember me

              </label>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-6
                h-11
                w-full
                rounded-md
                bg-[#d92c2c]
                text-[12px]
                font-semibold
                text-white
                shadow-[0_5px_15px_rgba(217,44,44,0.2)]
                transition
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#bd2020]
                hover:shadow-[0_8px_20px_rgba(217,44,44,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* Divider */}
          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-[#eadfce]" />

            <span className="text-[9px] uppercase tracking-[2px] text-[#b29a88]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#eadfce]" />

          </div>


          {/* Register */}
          <div className="text-center">

            <p className="text-[11px] text-[#806653]">
              Don't have an account?
            </p>

            <a
              href="/register"
              className="
                mt-2
                inline-flex
                rounded-md
                border
                border-[#d7a744]
                px-5
                py-2
                text-[11px]
                font-semibold
                text-[#8c1d18]
                transition
                hover:bg-[#fff0c9]
              "
            >
              Create New Profile
            </a>

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

export default LoginPage;

