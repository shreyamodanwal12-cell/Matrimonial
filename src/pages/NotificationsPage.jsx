
import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/profiles/notifications`,
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
          setNotifications(data.notifications || []);
        }
      } catch (error) {
        console.error("Notifications error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf2] px-5 py-10">
        <div className="mx-auto max-w-[800px]">
          <h1 className="mb-6 text-2xl font-semibold text-[#751b17]">
            Notifications
          </h1>

          <p className="text-sm text-[#563927]">
            Loading notifications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf2] px-5 py-10">
      <div className="mx-auto max-w-[800px]">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#751b17]">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-[#8a6a4a]">
            See who interacted with your profile.
          </p>
        </div>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-[#ead8bd] bg-white p-8 text-center shadow-sm">
            <div className="mb-3 text-3xl">🔔</div>

            <h2 className="text-base font-semibold text-[#751b17]">
              No notifications
            </h2>

            <p className="mt-1 text-sm text-[#8a6a4a]">
              You don't have any notifications yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center gap-4 rounded-xl border border-[#ead8bd] bg-white p-4 shadow-sm ${
                  !notification.is_read
                    ? "border-l-4 border-l-[#d92c2c]"
                    : ""
                }`}
              >

                {/* Profile Photo */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7ead6] text-xl text-[#8c1d18]">

                  {notification.related_user?.profile_photo ? (
                    <img
                      src={notification.related_user.profile_photo}
                      alt={
                        notification.related_user.full_name ||
                        "User"
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "👤"
                  )}

                </div>

                {/* Notification Content */}
                <div className="min-w-0 flex-1">

                  {notification.type === "profile_view" ? (
                    <>
                      <p className="text-sm text-[#563927]">
                        <span className="font-semibold text-[#751b17]">
                          {notification.related_user?.full_name ||
                            "Someone"}
                        </span>{" "}
                        viewed your profile.
                      </p>

                      <p className="mt-1 text-xs text-[#9a7b5a]">
                        Someone has viewed your matrimonial profile.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-[#751b17]">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-xs text-[#9a7b5a]">
                        {notification.message}
                      </p>
                    </>
                  )}

                  {/* Time */}
                  {notification.created_at && (
                    <p className="mt-2 text-[10px] text-[#b08d68]">
                      {new Date(
                        notification.created_at
                      ).toLocaleString()}
                    </p>
                  )}

                </div>

                {/* Notification Type */}
                {notification.type === "profile_view" && (
                  <span className="shrink-0 rounded-full bg-[#fff1e8] px-2 py-1 text-[10px] font-medium text-[#8c1d18]">
                    Profile View
                  </span>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default NotificationsPage;
