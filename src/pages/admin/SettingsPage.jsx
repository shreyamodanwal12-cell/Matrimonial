import { useState } from "react";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    siteName: "Shiva Parvati Matrimonial",
    tagline: "Where beautiful stories begin",
    email: "admin@shivaparavatimatrimonial.com",
    phone: "+91 98765 43210",
    notifications: true,
    emailNotifications: true,
    newMemberAlerts: true,
    requestAlerts: true,
    profileVerification: true,
    twoFactor: false,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: "⚙",
    },
    {
      id: "profile",
      label: "Admin Profile",
      icon: "👤",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
    },
    {
      id: "security",
      label: "Security",
      icon: "🔐",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c2415]">

      {/* ================= TOPBAR ================= */}
      <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#eadfce] bg-white/95 px-4 backdrop-blur sm:px-7">

        <div>
          <p className="text-[9px] uppercase tracking-[2px] text-[#a67c35]">
            Admin Workspace
          </p>

          <h1 className="font-serif text-[24px] font-semibold text-[#4a1712]">
            Settings
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfce] text-[14px] text-[#6d5142]"
          >
            🔔

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d92c2c]" />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] font-semibold text-[#4a1712]">
              Administrator
            </p>

            <p className="text-[8px] text-[#9a806f]">
              Super Admin
            </p>
          </div>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-[1200px] p-4 sm:p-7">

        {/* Heading */}
        <div className="mb-6">

          <h2 className="font-serif text-[28px] font-semibold text-[#4a1712]">
            Manage Settings
          </h2>

          <p className="mt-1 text-[11px] text-[#8c7566]">
            Configure your matrimonial platform and administrator preferences.
          </p>

        </div>


        {/* ================= SETTINGS LAYOUT ================= */}
        <div className="grid gap-5 lg:grid-cols-[230px_1fr]">


          {/* ================= SIDEBAR ================= */}
          <aside className="h-fit rounded-xl border border-[#eadfce] bg-white p-2">

            {tabs.map((tab) => (

              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  mb-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[10px] font-medium transition
                  ${
                    activeTab === tab.id
                      ? "bg-[#8c1d18] text-white shadow-sm"
                      : "text-[#806653] hover:bg-[#fff7ed] hover:text-[#8c1d18]"
                  }
                `}
              >

                <span className="text-[13px]">
                  {tab.icon}
                </span>

                {tab.label}

              </button>

            ))}

          </aside>


          {/* ================= CONTENT ================= */}
          <section className="rounded-xl border border-[#eadfce] bg-white shadow-[0_4px_18px_rgba(73,38,20,0.04)]">


            {/* ================= GENERAL ================= */}
            {activeTab === "general" && (

              <div>

                <div className="border-b border-[#eadfce] px-5 py-5 sm:px-7">

                  <h3 className="font-serif text-[22px] font-semibold text-[#4a1712]">
                    General Settings
                  </h3>

                  <p className="mt-1 text-[9px] text-[#9a806f]">
                    Manage basic information about your matrimonial platform.
                  </p>

                </div>


                <div className="space-y-6 p-5 sm:p-7">

                  {/* Site Name */}
                  <div>

                    <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                      Website Name
                    </label>

                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        updateSetting("siteName", e.target.value)
                      }
                      className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none transition focus:border-[#c58a25] focus:ring-2 focus:ring-[#e7c77e]/30"
                    />

                  </div>


                  {/* Tagline */}
                  <div>

                    <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                      Website Tagline
                    </label>

                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) =>
                        updateSetting("tagline", e.target.value)
                      }
                      className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none transition focus:border-[#c58a25]"
                    />

                  </div>


                  {/* Email + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        Support Email
                      </label>

                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          updateSetting("email", e.target.value)
                        }
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
                      />

                    </div>


                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        Support Phone
                      </label>

                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) =>
                          updateSetting("phone", e.target.value)
                        }
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] text-[#563927] outline-none focus:border-[#c58a25]"
                      />

                    </div>

                  </div>


                  {/* Platform Status */}
                  <div className="rounded-xl border border-[#eadfce] bg-[#fffaf5] p-4">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] font-semibold text-[#4f3425]">
                          Platform Status
                        </p>

                        <p className="mt-1 text-[8px] text-[#9a806f]">
                          Your matrimonial website is currently available to members.
                        </p>

                      </div>

                      <span className="rounded-full bg-[#e7f6ed] px-3 py-1 text-[8px] font-semibold text-[#287b51]">
                        ● Live
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            )}


            {/* ================= PROFILE ================= */}
            {activeTab === "profile" && (

              <div>

                <div className="border-b border-[#eadfce] px-5 py-5 sm:px-7">

                  <h3 className="font-serif text-[22px] font-semibold text-[#4a1712]">
                    Admin Profile
                  </h3>

                  <p className="mt-1 text-[9px] text-[#9a806f]">
                    Manage your administrator account information.
                  </p>

                </div>


                <div className="p-5 sm:p-7">

                  {/* Profile Header */}
                  <div className="flex flex-col items-center gap-4 rounded-xl bg-[#fffaf5] p-6 sm:flex-row">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[28px] font-semibold text-[#f5c45e] shadow-md">
                      A
                    </div>

                    <div className="text-center sm:text-left">

                      <h4 className="font-serif text-[22px] font-semibold text-[#4a1712]">
                        Administrator
                      </h4>

                      <p className="mt-1 text-[9px] text-[#9a806f]">
                        Super Administrator
                      </p>

                      <button
                        type="button"
                        className="mt-3 rounded-md border border-[#d7a744] px-4 py-2 text-[9px] font-semibold text-[#8c1d18] hover:bg-[#fff0c9]"
                      >
                        Change Profile Photo
                      </button>

                    </div>

                  </div>


                  {/* Profile Form */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">

                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        First Name
                      </label>

                      <input
                        type="text"
                        defaultValue="Administrator"
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] outline-none focus:border-[#c58a25]"
                      />

                    </div>


                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        Last Name
                      </label>

                      <input
                        type="text"
                        defaultValue=""
                        placeholder="Enter last name"
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] outline-none focus:border-[#c58a25]"
                      />

                    </div>


                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        Email Address
                      </label>

                      <input
                        type="email"
                        defaultValue={settings.email}
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] outline-none focus:border-[#c58a25]"
                      />

                    </div>


                    <div>

                      <label className="mb-1.5 block text-[10px] font-semibold text-[#563927]">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        defaultValue={settings.phone}
                        className="h-11 w-full rounded-lg border border-[#eadfce] bg-[#fffaf5] px-3 text-[10px] outline-none focus:border-[#c58a25]"
                      />

                    </div>

                  </div>

                </div>

              </div>

            )}


            {/* ================= NOTIFICATIONS ================= */}
            {activeTab === "notifications" && (

              <div>

                <div className="border-b border-[#eadfce] px-5 py-5 sm:px-7">

                  <h3 className="font-serif text-[22px] font-semibold text-[#4a1712]">
                    Notification Settings
                  </h3>

                  <p className="mt-1 text-[9px] text-[#9a806f]">
                    Choose which activities should send notifications to administrators.
                  </p>

                </div>


                <div className="divide-y divide-[#eadfce]">

                  {/* Main notifications */}
                  <div className="flex items-center justify-between gap-4 p-5 sm:px-7">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        Enable Notifications
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Receive important platform activity notifications.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.notifications}
                      onChange={(value) =>
                        updateSetting("notifications", value)
                      }
                    />

                  </div>


                  {/* Email */}
                  <div className="flex items-center justify-between gap-4 p-5 sm:px-7">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        Email Notifications
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Receive important alerts through email.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.emailNotifications}
                      onChange={(value) =>
                        updateSetting("emailNotifications", value)
                      }
                    />

                  </div>


                  {/* New Members */}
                  <div className="flex items-center justify-between gap-4 p-5 sm:px-7">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        New Member Alerts
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Get notified whenever a new member registers.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.newMemberAlerts}
                      onChange={(value) =>
                        updateSetting("newMemberAlerts", value)
                      }
                    />

                  </div>


                  {/* Requests */}
                  <div className="flex items-center justify-between gap-4 p-5 sm:px-7">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        Interest Request Alerts
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Receive alerts for important connection requests.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.requestAlerts}
                      onChange={(value) =>
                        updateSetting("requestAlerts", value)
                      }
                    />

                  </div>


                  {/* Verification */}
                  <div className="flex items-center justify-between gap-4 p-5 sm:px-7">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        Profile Verification Alerts
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Notify admins when profiles need verification.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.profileVerification}
                      onChange={(value) =>
                        updateSetting("profileVerification", value)
                      }
                    />

                  </div>

                </div>

              </div>

            )}


            {/* ================= SECURITY ================= */}
            {activeTab === "security" && (

              <div>

                <div className="border-b border-[#eadfce] px-5 py-5 sm:px-7">

                  <h3 className="font-serif text-[22px] font-semibold text-[#4a1712]">
                    Security Settings
                  </h3>

                  <p className="mt-1 text-[9px] text-[#9a806f]">
                    Protect your administrator account and platform access.
                  </p>

                </div>


                <div className="p-5 sm:p-7">

                  {/* Change password */}
                  <div className="rounded-xl border border-[#eadfce] bg-[#fffaf5] p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8e9e7] text-[14px]">
                        🔑
                      </div>

                      <div>

                        <h4 className="text-[11px] font-semibold text-[#4f3425]">
                          Change Password
                        </h4>

                        <p className="mt-1 text-[8px] text-[#9a806f]">
                          Update your administrator password regularly for better security.
                        </p>

                      </div>

                    </div>


                    <div className="mt-5 grid gap-4 sm:grid-cols-2">

                      <input
                        type="password"
                        placeholder="Current password"
                        className="h-10 rounded-lg border border-[#eadfce] bg-white px-3 text-[9px] outline-none focus:border-[#c58a25]"
                      />

                      <input
                        type="password"
                        placeholder="New password"
                        className="h-10 rounded-lg border border-[#eadfce] bg-white px-3 text-[9px] outline-none focus:border-[#c58a25]"
                      />

                    </div>


                    <button
                      type="button"
                      className="mt-4 rounded-md bg-[#8c1d18] px-5 py-2.5 text-[9px] font-semibold text-white hover:bg-[#701510]"
                    >
                      Update Password
                    </button>

                  </div>


                  {/* 2FA */}
                  <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[#eadfce] p-5">

                    <div>

                      <p className="text-[10px] font-semibold text-[#4f3425]">
                        Two-Factor Authentication
                      </p>

                      <p className="mt-1 text-[8px] text-[#9a806f]">
                        Add an extra layer of security to your admin account.
                      </p>

                    </div>

                    <Toggle
                      enabled={settings.twoFactor}
                      onChange={(value) =>
                        updateSetting("twoFactor", value)
                      }
                    />

                  </div>


                  {/* Session */}
                  <div className="mt-5 rounded-xl border border-[#eadfce] p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] font-semibold text-[#4f3425]">
                          Active Admin Session
                        </p>

                        <p className="mt-1 text-[8px] text-[#9a806f]">
                          Windows • Chrome • Current Session
                        </p>

                      </div>

                      <span className="rounded-full bg-[#e7f6ed] px-3 py-1 text-[8px] font-semibold text-[#287b51]">
                        Active
                      </span>

                    </div>


                    <button
                      type="button"
                      className="mt-4 rounded-md border border-[#d9a0a0] px-4 py-2 text-[9px] font-semibold text-[#b63b3b] hover:bg-[#fff4f4]"
                    >
                      Sign Out Other Sessions
                    </button>

                  </div>

                </div>

              </div>

            )}

          </section>

        </div>


        {/* ================= SAVE ================= */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-xl border border-[#eadfce] bg-white p-4 sm:flex-row">

          <div>

            {saved ? (
              <p className="text-[9px] font-medium text-[#287b51]">
                ✓ Changes saved successfully
              </p>
            ) : (
              <p className="text-[9px] text-[#9a806f]">
                Remember to save your changes before leaving this page.
              </p>
            )}

          </div>


          <button
            type="button"
            onClick={handleSave}
            className="w-full rounded-lg bg-[#8c1d18] px-7 py-2.5 text-[10px] font-semibold text-white shadow-[0_5px_15px_rgba(140,29,24,0.15)] transition hover:bg-[#701510] sm:w-auto"
          >
            Save Changes
          </button>

        </div>

      </main>

    </div>
  );
}


/* ================= TOGGLE COMPONENT ================= */

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`
        relative h-6 w-11 shrink-0 rounded-full transition
        ${enabled ? "bg-[#8c1d18]" : "bg-[#d8cfc5]"}
      `}
    >

      <span
        className={`
          absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition
          ${enabled ? "left-6" : "left-1"}
        `}
      />

    </button>
  );
}

export default SettingsPage;