import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div className="bg-grid-pattern min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="ml-64 flex min-h-screen flex-col">
        <AdminNavbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
