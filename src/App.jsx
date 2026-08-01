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
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Companies from "./pages/Companies";
import User from "./pages/User";
import Subscription from "./pages/Subscription";
import Revenue from "./pages/Revenue";
import Settings from "./pages/Settings";
 

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/backup" element={<BackupPower />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>

  <Route index element={<AdminDashboard />} />
   <Route path="companies" element={<Companies />} />
   <Route path="users" element={<User />} />
   <Route path="subscriptions" element={<Subscription />} />
   <Route path="revenue" element={<Revenue />} />
   <Route path="settings" element={<Settings />} />


</Route>
    </Routes>

  );
}

export default App;