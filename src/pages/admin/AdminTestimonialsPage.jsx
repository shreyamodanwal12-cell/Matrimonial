import { useEffect, useState } from "react";
import API_BASE_URL from "../../api/api";

function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const token = localStorage.getItem("token");

const response = await fetch(
  `${API_BASE_URL}/api/testimonials/${id}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to delete testimonial"
        );
      }

      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== id)
      );

      alert("Testimonial deleted successfully");
    } catch (error) {
      console.error("Delete Testimonial Error:", error);
      alert(error.message || "Unable to delete testimonial");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#751b17] sm:text-3xl">
          Testimonials
        </h1>

        <p className="mt-2 text-sm text-[#806653]">
          Manage success stories submitted by users.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#806653]">
            Loading testimonials...
          </p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#806653]">
            No testimonials available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border border-[#ead8bd] bg-white p-6 shadow-sm"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#751b17]">
                    {testimonial.name}
                  </h2>

                  <p className="mt-1 text-xs text-[#806653]">
                    {testimonial.location || "Location not provided"}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 text-sm">
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

              </div>

              {/* Message */}
              <p className="mt-5 text-sm leading-7 text-[#665044]">
                “{testimonial.message}”
              </p>

              {/* Date */}
              {testimonial.created_at && (
                <p className="mt-4 text-[11px] text-[#9b8878]">
                  Submitted:{" "}
                  {new Date(
                    testimonial.created_at
                  ).toLocaleDateString()}
                </p>
              )}

              {/* Delete */}
              <div className="mt-5 flex justify-end border-t border-[#ead8bd] pt-4">

                <button
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={deletingId === testimonial.id}
                  className="rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === testimonial.id
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AdminTestimonialsPage;