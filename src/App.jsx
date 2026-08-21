import AdminLayout from "./pages/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MembersPage from "./pages/admin/MembersPage";
import ProfilesPage from "./pages/admin/ProfilesPage";
import RequestsPage from "./pages/admin/RequestsPage";
import MatchesPage from "./pages/admin/MatchesPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import PlansPage from "./pages/payment/PlansPage";
import PaymentPage from "./pages/payment/PaymentPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";
import FamilyDetailsPage from "./pages/auth/FamilyDetailsPage";
import EducationDetailsPage from "./pages/auth/EducationDetailsPage";
import LifestylePage from "./pages/auth/LifestylePage";
import MyProfilePage from "./pages/MyProfilePage";
import MyMembershipPage from "./pages/MyMembershipPage";

function App() {
  const path = window.location.pathname;

  // Login
  if (path === "/login") {
    return <LoginPage />;
  }

  // Register
  if (path === "/register") {
    return <RegisterPage />;
  }
if (path === "/register/family") {
  return <FamilyDetailsPage />;
}
if (path === "/register/education") {
  return <EducationDetailsPage />;
}
if (path === "/register/lifestyle") {
  return <LifestylePage />;
}

  // Payment
  if (path === "/plans") {
    return <PlansPage />;
  }

  if (path === "/payment") {
    return <PaymentPage />;
  }

  if (path === "/payment-success") {
    return <PaymentSuccessPage />;
  }
  if (path === "/my-membership") {
  return <MyMembershipPage />;
}
if (path === "/profile") {
  return <MyProfilePage />;
}
  // ================================
  // ADMIN PROTECTION
  // ================================

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  let user = null;

  if (userData) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Invalid user data:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  const isAdmin = token && user?.role === "admin";

  // Admin Dashboard
  if (path === "/admin") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    );
  }

  // Admin Members
  if (path === "/admin/members") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <MembersPage />
      </AdminLayout>
    );
  }

  // Admin Profiles
  if (path === "/admin/profiles") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <ProfilesPage />
      </AdminLayout>
    );
  }

  // Admin Requests
  if (path === "/admin/requests") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <RequestsPage />
      </AdminLayout>
    );
  }

  // Admin Matches
  if (path === "/admin/matches") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <MatchesPage />
      </AdminLayout>
    );
  }

  // Admin Reports
  if (path === "/admin/reports") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <ReportsPage />
      </AdminLayout>
    );
  }

  // Admin Settings
  if (path === "/admin/settings") {
    if (!isAdmin) {
      window.location.href = "/login";
      return null;
    }

    return (
      <AdminLayout>
        <SettingsPage />
      </AdminLayout>
    );
  }

  return <HomePage />;
}

export default App;
