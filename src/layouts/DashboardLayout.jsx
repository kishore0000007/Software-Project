import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-grid-pattern min-h-screen bg-slate-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex min-h-screen flex-col lg:ml-64">
        <Navbar setIsOpen={setIsOpen} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
