import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <AdminSidebar />

      <main className="min-h-screen lg:pl-[245px]">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;