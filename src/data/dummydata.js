// Shared "recent alerts" feed for the customer Navbar bell — kept in one
// place so the unread badge count always matches what's shown in the dropdown.
export const customerAlerts = [
  { id: 1, message: "Mirpur outage expected at 5:00 PM", time: "5 min ago", level: "high" },
  { id: 2, message: "High grid load detected in Uttara", time: "22 min ago", level: "medium" },
  { id: 3, message: "Dhanmondi prediction updated", time: "1 hr ago", level: "low" },
];

export const dashboardData = {
  totalCompanies: 215,
  totalUsers: 1248,
  monthlyRevenue: 8950,
  yearlyRevenue: 107400,
  activeSubscriptions: 184,
  predictionsToday: 1532,
  activeAlerts: 34,
  backupSystems: 89,
};

export const companies = [
  {
    id: 1,
    name: "ABC Company",
    plan: "Business",
    status: "Active",
    revenue: 29.99,
  },
  {
    id: 2,
    name: "XYZ Ltd",
    plan: "Enterprise",
    status: "Active",
    revenue: 99.99,
  },
];