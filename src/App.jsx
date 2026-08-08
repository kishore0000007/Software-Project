 import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import MyPlan from "./pages/MyPlan";
import BackupPower from "./pages/BackupPower";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Companies from "./pages/Companies";
import User from "./pages/User";
import Subscription from "./pages/Subscription";
import Revenue from "./pages/Revenue";
import Settings from "./pages/Settings";
import AdminNotifications from "./pages/AdminNotifications";
 

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes - regular users */}
      <Route element={<ProtectedRoute allowedRoles={["business"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/subscription" element={<MyPlan />} />
          <Route path="/backup" element={<BackupPower />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Protected Routes - admin only */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="users" element={<User />} />
          <Route path="subscriptions" element={<Subscription />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;