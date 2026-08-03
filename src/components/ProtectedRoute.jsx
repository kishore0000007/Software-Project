import { Navigate, Outlet } from "react-router-dom";

/**
 * Guards a set of routes behind authentication, and optionally behind role.
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>            // any logged-in user
 *   <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>  // admin only
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const storedUser = localStorage.getItem("user");
    const role = storedUser ? JSON.parse(storedUser).role : null;

    if (!allowedRoles.includes(role)) {
      // Logged in, but not allowed to see this section.
      // Send them to the area their role actually has access to.
      return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
