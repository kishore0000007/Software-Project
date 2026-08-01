 import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Notifications from "./pages/Notifications";
import BackupPower from "./pages/BackupPower";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Public */}
      {<Route path="/" element={<Login />} />}
      <Route path="/register" element={<Register />} />

      {/* Protected Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/backup" element={<BackupPower />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;