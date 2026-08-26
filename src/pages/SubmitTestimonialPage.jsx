import { useState } from "react";
import API_BASE_URL from "../api/api";

function SubmitTestimonialPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      console.log("Submitting Testimonial:", formData);
console.log("Rating being sent:", Number(formData.rating));
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/testimonials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            location: formData.location,
            message: formData.message,
            rating: Number(formData.rating),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit testimonial"
        );
      }

      alert("Thank you! Your success story has been submitted.");

      setFormData({
        name: "",
        location: "",
        message: "",
        rating: 5,
      });
    } catch (error) {
      console.error("Submit Testimonial Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#401711]">

      {/* HEADER */}
      <header className="border-b border-[#ead8bd] bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-[#8c1d18] px-4 py-2 text-xs font-semibold text-[#8c1d18] transition hover:bg-[#fff3dc]"
          >
            ← Back
          </button>

          <p className="font-serif text-xl font-semibold text-[#751b17]">
            Share Your Story
          </p>

        </div>
      </header>

      {/* CONTENT */}
      <main className="px-5 py-12 sm:py-16">

        <div className="mx-auto max-w-[650px]">

          <div className="mb-8 text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#a67c35]">
              Success Stories
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold text-[#751b17] sm:text-4xl">
              Share Your Beautiful Journey
            </h1>

            <p className="mx-auto mt-3 max-w-[520px] text-sm leading-6 text-[#806653]">
              Tell us about your experience with Shiva Parvati
              Matrimonial and inspire others on their journey.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#ead8bd] bg-white p-6 shadow-[0_8px_30px_rgba(73,38,20,0.08)] sm:p-8"
          >

            {/* NAME */}
            <div>
              <label className="text-xs font-semibold text-[#60483d]">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Priya & Rahul"
                required
                className="mt-2 h-11 w-full rounded-lg border border-[#ead8bd] bg-[#fffaf4] px-4 text-sm outline-none transition focus:border-[#8c1d18]"
              />
            </div>

            {/* LOCATION */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-[#60483d]">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore"
                className="mt-2 h-11 w-full rounded-lg border border-[#ead8bd] bg-[#fffaf4] px-4 text-sm outline-none transition focus:border-[#8c1d18]"
              />
            </div>

            {/* RATING */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-[#60483d]">
                Rating
              </label>

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-lg border border-[#ead8bd] bg-[#fffaf4] px-4 text-sm outline-none focus:border-[#8c1d18]"
              >
                <option value="5">★★★★★ 5 Stars</option>
                <option value="4">★★★★ 4 Stars</option>
                <option value="3">★★★ 3 Stars</option>
                <option value="2">★★ 2 Stars</option>
                <option value="1">★ 1 Star</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-[#60483d]">
                Your Story
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your experience..."
                rows={6}
                required
                className="mt-2 w-full resize-none rounded-lg border border-[#ead8bd] bg-[#fffaf4] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#8c1d18]"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                ✓ {success}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-lg bg-[#8c1d18] text-sm font-semibold text-white transition hover:bg-[#751712] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting..."
                : "Share My Story →"}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#9a806f]">
              Your story will be reviewed before appearing on
              our website.
            </p>

          </form>

        </div>

      </main>

    </div>
  );
}

export default SubmitTestimonialPage;