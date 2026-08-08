export const stats = {
  totalCompanies: 215,
  totalUsers: 1248,
  activeSubscriptions: 184,
  monthlyRevenue: 895000,
  yearlyRevenue: 10740000,
  predictionsToday: 1532,
  notificationsSent: 487,
  activeGenerators: 89,
};
export const companies = [
  {
    id: 1,
    name: "ABC Company",
    email: "abc@company.com",
    plan: "Business",
    status: "Active",
    revenue: "৳2,500",
  },
  {
    id: 2,
    name: "XYZ Ltd",
    email: "xyz@gmail.com",
    plan: "Enterprise",
    status: "Active",
    revenue: "৳9,999",
  },
  {
    id: 3,
    name: "PowerTech",
    email: "power@tech.com",
    plan: "Basic",
    status: "Pending",
    revenue: "৳999",
  },
  {
    id: 4,
    name: "Green Energy",
    email: "green@gmail.com",
    plan: "Business",
    status: "Active",
    revenue: "৳2,500",
  },
  {
    id: 5,
    name: "Future Grid",
    email: "future@gmail.com",
    plan: "Free",
    status: "Inactive",
    revenue: "৳0",
  },
];

 
export const revenueData = [
  { month: "Jan", revenue: 500000 },
  { month: "Feb", revenue: 620000 },
  { month: "Mar", revenue: 700000 },
  { month: "Apr", revenue: 810000 },
  { month: "May", revenue: 900000 },
  { month: "Jun", revenue: 950000 },
  { month: "Jul", revenue: 1020000 },
];

export const subscriptionData = [
  { name: "Free", value: 80 },
  { name: "Basic", value: 60 },
  { name: "Business", value: 45 },
  { name: "Enterprise", value: 30 },
];
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    company: "ABC Company",
    role: "Manager",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    email: "sarah@xyz.com",
    company: "XYZ Ltd",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "David Smith",
    email: "david@green.com",
    company: "Green Energy",
    role: "Employee",
    status: "Pending",
  },
  {
    id: 4,
    name: "Michael Lee",
    email: "michael@future.com",
    company: "Future Grid",
    role: "Manager",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma@power.com",
    company: "PowerTech",
    role: "Employee",
    status: "Active",
  },
];
 export const subscriptions = [
  {
    id: 1,
    plan: "Free",
    price: "৳0",
    billing: "-",
    subscribers: 80,
    status: "Active",
  },
  {
    id: 2,
    plan: "Basic",
    price: "৳999",
    billing: "Monthly",
    subscribers: 60,
    status: "Active",
  },
  {
    id: 3,
    plan: "Business",
    price: "৳2,500",
    billing: "Monthly",
    subscribers: 45,
    status: "Active",
  },
  {
    id: 4,
    plan: "Enterprise",
    price: "৳9,999",
    billing: "Monthly",
    subscribers: 30,
    status: "Active",
  },
];

// Shared "recent alerts" feed used by both the AdminNavbar notification
// bell and the full Alert Channels page, so the unread badge count and
// the list the admin sees always match.
export const adminAlerts = [
  {
    id: 1,
    message: "Mirpur outage expected at 5 PM.",
    time: "5 min ago",
    level: "high",
  },
  {
    id: 2,
    message: "High grid load detected.",
    time: "22 min ago",
    level: "medium",
  },
  {
    id: 3,
    message: "Dhanmondi prediction updated.",
    time: "1 hr ago",
    level: "low",
  },
];
export const monthlyRevenue = [
  { month: "Jan", revenue: 500000 },
  { month: "Feb", revenue: 620000 },
  { month: "Mar", revenue: 700000 },
  { month: "Apr", revenue: 810000 },
  { month: "May", revenue: 920000 },
  { month: "Jun", revenue: 980000 },
  { month: "Jul", revenue: 1040000 },
];

export const yearlyRevenue = [
  { year: "2022", revenue: 4200000 },
  { year: "2023", revenue: 6800000 },
  { year: "2024", revenue: 9200000 },
  { year: "2025", revenue: 10740000 },
];

export const payments = [
  {
    id: 1,
    company: "ABC Company",
    plan: "Business",
    amount: "৳2,500",
    date: "01 Aug 2026",
    status: "Paid",
  },
  {
    id: 2,
    company: "XYZ Ltd",
    plan: "Enterprise",
    amount: "৳9,999",
    date: "31 Jul 2026",
    status: "Paid",
  },
  {
    id: 3,
    company: "PowerTech",
    plan: "Basic",
    amount: "৳999",
    date: "30 Jul 2026",
    status: "Pending",
  },
];

export const activities = [
  "ABC Company registered",
  "XYZ upgraded to Enterprise",
  "Monthly payment received",
  "AI Prediction generated",
  "SMS notifications sent",
];