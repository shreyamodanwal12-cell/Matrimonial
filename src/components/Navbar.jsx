import { useEffect, useState } from "react";
import API_BASE_URL from "../api/api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [profileViewNotifications, setProfileViewNotifications] =
    useState([]);

  const [interestNotifications, setInterestNotifications] = useState([]);

  const [membershipNotifications, setMembershipNotifications] =
    useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ======================================================
  // ALL NOTIFICATIONS
  // Newest notification will appear first
  // ======================================================

  const allNotifications = [
    ...interestNotifications.map((item) => ({
      ...item,
      notificationCategory: "interest",
    })),

    ...profileViewNotifications.map((item) => ({
      ...item,
      notificationCategory: "profile_view",
    })),

    ...membershipNotifications.map((item) => ({
      ...item,
      notificationCategory: "membership",
    })),
  ].sort(
    (a, b) =>
      new Date(b.created_at || 0) -
      new Date(a.created_at || 0)
  );

  // ======================================================
  // FETCH NOTIFICATIONS
  // ======================================================

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token || !user) {
        setProfileViewNotifications([]);
        setInterestNotifications([]);
        setMembershipNotifications([]);
        setNotificationCount(0);
        return;
      }

      try {
        // ==================================================
        // INTEREST REQUESTS
        // ==================================================

        const interestResponse = await fetch(
          `${API_BASE_URL}/api/interests/received`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const interestData = await interestResponse.json();

        const interests =
          interestResponse.ok && interestData.success
            ? interestData.requests || []
            : [];

        setInterestNotifications(interests);

        const interestCount = interests.length;

        // ==================================================
        // PROFILE + MEMBERSHIP NOTIFICATIONS
        // ==================================================

        const notificationResponse = await fetch(
          `${API_BASE_URL}/api/profiles/notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const notificationData =
          await notificationResponse.json();

        const notifications =
          notificationResponse.ok &&
          notificationData.success
            ? notificationData.notifications || []
            : [];

        // ==================================================
        // PROFILE VIEW
        // ==================================================

        const profileViews = notifications.filter(
          (notification) =>
            notification.type === "profile_view" &&
            notification.is_read === false
        );

        setProfileViewNotifications(profileViews);

        // ==================================================
        // MEMBERSHIP
        // ==================================================

        const membershipNotificationsList =
          notifications.filter(
            (notification) =>
              (notification.type === "membership_expiring" ||
                notification.type === "membership_expired") &&
              notification.is_read === false
          );

        setMembershipNotifications(
          membershipNotificationsList
        );

        // ==================================================
        // TOTAL NOTIFICATION COUNT
        // ==================================================

        setNotificationCount(
          interestCount +
            profileViews.length +
            membershipNotificationsList.length
        );
      } catch (error) {
        console.error(
          "Notification count error:",
          error
        );
      }
    };

    fetchNotifications();
  }, [token, user]);

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // ======================================================
  // MARK NOTIFICATION AS READ
  // ======================================================

  const markNotificationAsRead = async (notification) => {
    try {
      await fetch(
        `${API_BASE_URL}/api/profiles/notifications/${notification.id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "Mark notification read error:",
        error
      );
    }

    if (
      notification.notificationCategory ===
      "profile_view"
    ) {
      setProfileViewNotifications((prev) =>
        prev.filter(
          (item) => item.id !== notification.id
        )
      );
    }

    if (
      notification.notificationCategory ===
      "membership"
    ) {
      setMembershipNotifications((prev) =>
        prev.filter(
          (item) => item.id !== notification.id
        )
      );
    }

    setNotificationCount((prev) =>
      Math.max(0, prev - 1)
    );

    setNotificationOpen(false);
  };

  // ======================================================
  // NOTIFICATION CLICK
  // ======================================================

  const handleNotificationClick = async (
    notification
  ) => {
    // -------------------------------
    // INTEREST
    // -------------------------------

    if (
      notification.notificationCategory ===
      "interest"
    ) {
      setNotificationOpen(false);
      setOpen(false);

      window.location.href = "/interest-requests";
      return;
    }

    // -------------------------------
    // PROFILE VIEW
    // -------------------------------

    if (
      notification.notificationCategory ===
      "profile_view"
    ) {
      await markNotificationAsRead(notification);

      setOpen(false);

      if (notification.related_user_id) {
        window.location.href =
          `/public-profile/${notification.related_user_id}`;
      }

      return;
    }

    // -------------------------------
    // MEMBERSHIP
    // -------------------------------

    if (
      notification.notificationCategory ===
      "membership"
    ) {
      await markNotificationAsRead(notification);

      setOpen(false);

      window.location.href = "/plans";
    }
  };

  // ======================================================
  // NOTIFICATION UI
  // ======================================================

  const renderNotification = (
    notification,
    mobile = false
  ) => {
    const isInterest =
      notification.notificationCategory ===
      "interest";

    const isProfile =
      notification.notificationCategory ===
      "profile_view";

    const isMembership =
      notification.notificationCategory ===
      "membership";

    return (
      <button
        key={`${notification.notificationCategory}-${notification.id || Math.random()}`}
        type="button"
        onClick={() =>
          handleNotificationClick(notification)
        }
        className={`flex w-full items-center gap-3 border-b border-[#f5eadf] px-4 ${
          mobile ? "py-3" : "py-3"
        } text-left transition hover:bg-[#fff8ef]`}
      >
        {/* ICON / PHOTO */}
        {isProfile ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7ead6] text-lg">
            {notification.related_user?.profile_photo ? (
              <img
                src={
                  notification.related_user
                    .profile_photo
                }
                alt={
                  notification.related_user
                    ?.full_name || "User"
                }
                className="h-full w-full object-cover"
              />
            ) : (
              "👤"
            )}
          </div>
        ) : (
          <div
            className={`flex ${
              mobile ? "h-9 w-9" : "h-10 w-10"
            } shrink-0 items-center justify-center rounded-full bg-[#fff0ed] text-lg`}
          >
            {isInterest ? "❤️" : "🔔"}
          </div>
        )}

        {/* TEXT */}
        <div className="min-w-0 flex-1">
          {/* INTEREST */}
          {isInterest && (
            <>
              <p className="text-xs font-semibold text-[#751b17]">
                New Interest Request
              </p>

              <p className="mt-1 text-[11px] text-[#6f5742]">
                Someone has sent you an interest
                request.
              </p>
            </>
          )}

          {/* PROFILE */}
          {isProfile && (
            <>
              <p className="text-xs text-[#563927]">
                <span className="font-semibold text-[#751b17]">
                  {notification.related_user
                    ?.full_name || "Someone"}
                </span>{" "}
                viewed your profile.
              </p>

              <p className="mt-1 text-[10px] text-[#9a7b5a]">
                Someone has viewed your matrimonial
                profile.
              </p>
            </>
          )}

          {/* MEMBERSHIP */}
          {isMembership && (
            <>
              <p className="text-xs font-semibold text-[#751b17]">
                {notification.title}
              </p>

              <p className="mt-1 text-[11px] text-[#6f5742]">
                {notification.message}
              </p>

              <p className="mt-1 text-[10px] font-medium text-[#c28b2c]">
                Renew Membership →
              </p>
            </>
          )}
        </div>

        {/* CATEGORY */}
        {!mobile && (
          <span className="shrink-0 text-[9px] text-[#b08d68]">
            {isInterest
              ? "Interest"
              : isProfile
              ? "Profile"
              : "Membership"}
          </span>
        )}
      </button>
    );
  };

  // ======================================================
  // RETURN
  // ======================================================

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ead8bd] bg-[#fffaf2]">
     <div className="mx-auto flex h-[78px] w-[96%] max-w-[1350px] items-center justify-between gap-4">

        {/* ==================================================
            LOGO
        ================================================== */}

        <a
          href="#home"
          className="flex items-center gap-3"
        >
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

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="hidden items-center gap-4 whitespace-nowrap lg:flex">

          <a
            href="#home"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            About Us
          </a>

          <a
            href="#packages"
            className="text-[13px] font-medium text-[#563927] transition hover:text-[#9b261f]"
          >
            Packages
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

          {/* ==================================================
              LOGGED IN
          ================================================== */}

        {token && user ? (
  <>
    <div className="relative flex items-center gap-2">

                {/* CHAT */}
                <a
                  href="/chat"
                  className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                >
                  💬 Chat
                </a>

                {/* ==================================================
                    NOTIFICATIONS
                ================================================== */}

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(
                        !notificationOpen
                      )
                    }
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8bd] bg-white text-[16px] text-[#8c1d18] transition hover:bg-[#f7ead6]"
                    title="Notifications"
                  >
                    🔔

                    {notificationCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d92c2c] px-1 text-[9px] font-bold text-white">
                        {notificationCount > 99
                          ? "99+"
                          : notificationCount}
                      </span>
                    )}
                  </button>

                  {/* DESKTOP DROPDOWN */}

                  {notificationOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-[350px] overflow-hidden rounded-xl border border-[#ead8bd] bg-white shadow-xl">

                      <div className="border-b border-[#f0e2d3] px-4 py-3">
                        <h3 className="text-sm font-semibold text-[#751b17]">
                          Notifications
                        </h3>

                        <p className="mt-1 text-[10px] text-[#9a7b5a]">
                          Latest notifications appear first
                        </p>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto">

                        {allNotifications.map(
                          (notification) =>
                            renderNotification(
                              notification
                            )
                        )}

                        {allNotifications.length ===
                          0 && (
                          <div className="px-4 py-8 text-center">
                            <div className="mb-2 text-2xl">
                              🔔
                            </div>

                            <p className="text-xs font-medium text-[#751b17]">
                              No notifications
                            </p>

                            <p className="mt-1 text-[10px] text-[#9a7b5a]">
                              You don't have any
                              notifications yet.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* VIEW ALL */}

                      {allNotifications.length > 0 && (
                        <div className="border-t border-[#f0e2d3] px-4 py-2">
                          <button
                            type="button"
                            onClick={() => {
                              setNotificationOpen(
                                false
                              );

                              window.location.href =
                                "/notifications";
                            }}
                            className="w-full rounded-md py-2 text-center text-[11px] font-medium text-[#8c1d18] hover:bg-[#fff5e8]"
                          >
                            View All Notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ==================================================
                    ACCOUNT
                ================================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setAccountOpen(!accountOpen)
                  }
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
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      My Profile
                    </a>

                    <a
                      href="/plans"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      Plans
                    </a>

                    {/* PROFILES */}

                    <button
                      type="button"
                      onClick={async () => {
                        const currentToken =
                          localStorage.getItem(
                            "token"
                          );

                        if (!currentToken) {
                          alert(
                            "Please login first."
                          );

                          window.location.href =
                            "/login";

                          return;
                        }

                        try {
                          const response =
                            await fetch(
                              `${API_BASE_URL}/api/membership/my`,
                              {
                                headers: {
                                  Authorization: `Bearer ${currentToken}`,
                                },
                              }
                            );

                          const data =
                            await response.json();

                          const membership =
                            data.memberships?.[0];

                          if (
                            !response.ok ||
                            !data.success ||
                            !membership
                          ) {
                            alert(
                              "Please take a membership plan first."
                            );

                            window.location.href =
                              "/plans";

                            return;
                          }

                          const isActive =
                            membership.status?.toUpperCase() ===
                              "ACTIVE" &&
                            membership.end_date &&
                            new Date(
                              membership.end_date
                            ) >= new Date();

                          if (!isActive) {
                            alert(
                              "Your membership has expired. Please take a membership plan."
                            );

                            window.location.href =
                              "/plans";

                            return;
                          }

                          window.location.href =
                            "#profiles";
                        } catch (error) {
                          console.error(
                            "Profile Membership Check:",
                            error
                          );

                          alert(
                            "Unable to check membership."
                          );
                        }
                      }}
                      className="block w-full px-4 py-2 text-left text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                    >
                      Profiles
                    </button>

                    <a
                      href="/chat"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      💬 Chat
                    </a>

                    <a
                      href="/my-interests"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      ❤️ My Interests
                    </a>

                    <a
                      href="/my-membership"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      My Membership
                    </a>

                    <div className="my-1 border-t border-[#f0e2d3]" />

                    <a
                      href="/account-activity"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      ⚙️ Account Activity
                    </a>
                  </div>
                )}
              </div>

              {/* LOGOUT */}

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
              {/* LOGGED OUT */}

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

        {/* ==================================================
            MOBILE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
         className="text-2xl text-[#8c1d18] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {open && (
  <div className="border-t border-[#ead8bd] bg-[#fffaf2] px-5 py-5 lg:hidden">

          <nav className="mx-auto flex max-w-[1180px] flex-col gap-4">

            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-sm text-[#563927]"
            >
              About Us
            </a>

            <a
              href="#packages"
              onClick={() => setOpen(false)}
              className="text-[13px] font-medium text-[#563927]"
            >
              Packages
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

            {/* MOBILE LOGGED IN */}

            {token && user ? (
              <>
                <a
                  href="/chat"
                  onClick={() => setOpen(false)}
                  className="text-sm text-[#563927]"
                >
                  💬 Chat
                </a>

                {/* MOBILE NOTIFICATIONS */}

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(
                        !notificationOpen
                      )
                    }
                    className="flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-[#8c1d18] hover:bg-[#f7ead6]"
                  >
                    <span className="relative text-lg">
                      🔔

                      {notificationCount > 0 && (
                        <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d92c2c] px-1 text-[8px] font-bold text-white">
                          {notificationCount > 99
                            ? "99+"
                            : notificationCount}
                        </span>
                      )}
                    </span>

                    Notifications
                  </button>

                  {notificationOpen && (
                    <div className="mt-2 w-full overflow-hidden rounded-xl border border-[#ead8bd] bg-white shadow-lg">

                      <div className="border-b border-[#f0e2d3] px-4 py-3">
                        <h3 className="text-sm font-semibold text-[#751b17]">
                          Notifications
                        </h3>

                        <p className="mt-1 text-[10px] text-[#9a7b5a]">
                          Latest notifications appear
                          first
                        </p>
                      </div>

                      <div className="max-h-[350px] overflow-y-auto">

                        {allNotifications.map(
                          (notification) =>
                            renderNotification(
                              notification,
                              true
                            )
                        )}

                        {allNotifications.length ===
                          0 && (
                          <div className="px-4 py-6 text-center">
                            <div className="mb-2 text-xl">
                              🔔
                            </div>

                            <p className="text-xs font-medium text-[#751b17]">
                              No notifications
                            </p>
                          </div>
                        )}
                      </div>

                      {allNotifications.length > 0 && (
                        <div className="border-t border-[#f0e2d3] px-4 py-2">
                          <button
                            type="button"
                            onClick={() => {
                              setOpen(false);
                              setNotificationOpen(
                                false
                              );

                              window.location.href =
                                "/notifications";
                            }}
                            className="w-full rounded-md py-2 text-center text-[11px] font-medium text-[#8c1d18] hover:bg-[#fff5e8]"
                          >
                            View All Notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MOBILE ACCOUNT */}

                <button
                  type="button"
                  onClick={() =>
                    setAccountOpen(!accountOpen)
                  }
                  className="flex items-center gap-1 rounded-md px-4 py-2 text-[13px] font-medium text-[#8c1d18] transition hover:bg-[#f7ead6]"
                >
                  Account

                  <span className="text-[10px]">
                    {accountOpen ? "▲" : "▼"}
                  </span>
                </button>

                {accountOpen && (
                  <div className="rounded-lg border border-[#ead8bd] bg-white py-2 shadow-lg">

                    <a
                      href="/profile"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      My Profile
                    </a>

                    <a
                      href="/plans"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      Plans
                    </a>

                    <button
                      type="button"
                      onClick={async () => {
                        const currentToken =
                          localStorage.getItem(
                            "token"
                          );

                        if (!currentToken) {
                          alert(
                            "Please login first."
                          );

                          window.location.href =
                            "/login";

                          return;
                        }

                        try {
                          const response =
                            await fetch(
                              `${API_BASE_URL}/api/membership/my`,
                              {
                                headers: {
                                  Authorization: `Bearer ${currentToken}`,
                                },
                              }
                            );

                          const data =
                            await response.json();

                          const membership =
                            data.memberships?.[0];

                          if (
                            !response.ok ||
                            !data.success ||
                            !membership
                          ) {
                            alert(
                              "Please take a membership plan first."
                            );

                            window.location.href =
                              "/plans";

                            return;
                          }

                          const isActive =
                            membership.status?.toUpperCase() ===
                              "ACTIVE" &&
                            membership.end_date &&
                            new Date(
                              membership.end_date
                            ) >= new Date();

                          if (!isActive) {
                            alert(
                              "Your membership has expired. Please take a membership plan."
                            );

                            window.location.href =
                              "/plans";

                            return;
                          }

                          setOpen(false);

                          window.location.href =
                            "#profiles";
                        } catch (error) {
                          console.error(
                            "Profile Membership Check:",
                            error
                          );

                          alert(
                            "Unable to check membership."
                          );
                        }
                      }}
                      className="block w-full px-4 py-2 text-left text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                    >
                      Profiles
                    </button>

                    <a
                      href="/chat"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      💬 Chat
                    </a>

                    <a
                      href="/my-interests"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      ❤️ My Interests
                    </a>

                    <a
                      href="/my-membership"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      My Membership
                    </a>

                    <div className="my-1 border-t border-[#f0e2d3]" />

                    <a
                      href="/account-activity"
                      className="block px-4 py-2 text-[13px] text-[#563927] hover:bg-[#fff5e8]"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                    >
                      ⚙️ Account Activity
                    </a>
                  </div>
                )}

                {/* MOBILE LOGOUT */}

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