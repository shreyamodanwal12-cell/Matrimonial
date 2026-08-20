import { useState } from "react";

function AdminSidebar() {
  const [open, setOpen] = useState(false);

  const currentPath = window.location.pathname;

  const menuItems = [
    {
      label: "Dashboard",
      icon: "🏠",
      path: "/admin",
    },
    {
      label: "Members",
      icon: "👥",
      path: "/admin/members",
    },
    {
      label: "Profiles",
      icon: "👤",
      path: "/admin/profiles",
    },
    {
      label: "Requests",
      icon: "💌",
      path: "/admin/requests",
    },
    {
      label: "Matches",
      icon: "💞",
      path: "/admin/matches",
    },
    {
      label: "Reports",
      icon: "📊",
      path: "/admin/reports",
    },
    {
      label: "Settings",
      icon: "⚙️",
      path: "/admin/settings",
    },
  ];

  const navigate = (path) => {
    window.location.href = path;
  };
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#8c1d18] text-white shadow-lg lg:hidden"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[245px] flex-col
          border-r border-[#eadfce] bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Brand */}
        <div className="border-b border-[#eadfce] px-5 py-6">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d7a744] bg-[#8c1d18] font-serif text-[20px] text-[#f5c45e]">
              ॐ
            </div>

            <div>
              <h1 className="font-serif text-[17px] font-semibold text-[#8c1d18]">
                Shiva Parvati
              </h1>

              <p className="text-[8px] uppercase tracking-[2px] text-[#a67c35]">
                Matrimonial
              </p>
            </div>

          </div>

        </div>


        {/* Admin */}
        <div className="mx-4 mt-5 rounded-xl bg-[#fff8ef] p-3">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8c1d18] font-serif text-[14px] font-semibold text-[#f5c45e]">
              A
            </div>

            <div className="min-w-0">

              <p className="truncate text-[10px] font-semibold text-[#4a1712]">
                Administrator
              </p>

              <p className="text-[8px] text-[#9a806f]">
                Super Admin
              </p>

            </div>

          </div>

        </div>


        {/* Navigation */}
        <nav className="mt-5 flex-1 overflow-y-auto px-3">

          <p className="mb-2 px-3 text-[8px] font-semibold uppercase tracking-[2px] text-[#b09a89]">
            Main Menu
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const isActive =
                item.path === "/admin"
                  ? currentPath === "/admin"
                  : currentPath.startsWith(item.path);

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`
                    group flex w-full items-center gap-3 rounded-lg px-3 py-3
                    text-left text-[10px] font-medium transition
                    ${
                      isActive
                        ? "bg-[#8c1d18] text-white shadow-[0_4px_12px_rgba(140,29,24,0.15)]"
                        : "text-[#806653] hover:bg-[#fff7ed] hover:text-[#8c1d18]"
                    }
                  `}
                >

                  <span
                    className={`
                      flex h-7 w-7 items-center justify-center rounded-md text-[13px]
                      ${
                        isActive
                          ? "bg-white/10"
                          : "bg-[#fff8ef] group-hover:bg-[#fbe9d8]"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="text-[13px] text-[#f5c45e]">
                      ›
                    </span>
                  )}

                </button>
              );
            })}

          </div>

        </nav>


        {/* Bottom */}
        <div className="border-t border-[#eadfce] p-3">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[10px] font-medium text-[#806653] transition hover:bg-[#fff4f0] hover:text-[#8c1d18]"
          >

            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#fff8ef] text-[13px]">
              🌐
            </span>

            View Website

          </button>


          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[10px] font-medium text-[#b63b3b] transition hover:bg-[#fff4f4]"
          >

            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#fff4f4] text-[13px]">
              🚪
            </span>

            logout

          </button>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;