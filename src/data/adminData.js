export const stats = {
  totalCompanies: 215,
  totalUsers: 1248,
  activeSubscriptions: 184,
  monthlyRevenue: 8950,
  yearlyRevenue: 107400,
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
    revenue: "$29.99",
  },
  {
    id: 2,
    name: "XYZ Ltd",
    email: "xyz@gmail.com",
    plan: "Enterprise",
    status: "Active",
    revenue: "$99.99",
  },
  {
    id: 3,
    name: "PowerTech",
    email: "power@tech.com",
    plan: "Basic",
    status: "Pending",
    revenue: "$9.99",
  },
  {
    id: 4,
    name: "Green Energy",
    email: "green@gmail.com",
    plan: "Business",
    status: "Active",
    revenue: "$29.99",
  },
  {
    id: 5,
    name: "Future Grid",
    email: "future@gmail.com",
    plan: "Free",
    status: "Inactive",
    revenue: "$0",
  },
];

 
export const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 7000 },
  { month: "Apr", revenue: 8100 },
  { month: "May", revenue: 9000 },
  { month: "Jun", revenue: 9500 },
  { month: "Jul", revenue: 10200 },
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
    price: "$0",
    billing: "-",
    subscribers: 80,
    status: "Active",
  },
  {
    id: 2,
    plan: "Basic",
    price: "$9.99",
    billing: "Monthly",
    subscribers: 60,
    status: "Active",
  },
  {
    id: 3,
    plan: "Business",
    price: "$29.99",
    billing: "Monthly",
    subscribers: 45,
    status: "Active",
  },
  {
    id: 4,
    plan: "Enterprise",
    price: "$99.99",
    billing: "Monthly",
    subscribers: 30,
    status: "Active",
  },
];
export const monthlyRevenue = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 6200 },
  { month: "Mar", revenue: 7000 },
  { month: "Apr", revenue: 8100 },
  { month: "May", revenue: 9200 },
  { month: "Jun", revenue: 9800 },
  { month: "Jul", revenue: 10400 },
];

export const yearlyRevenue = [
  { year: "2022", revenue: 42000 },
  { year: "2023", revenue: 68000 },
  { year: "2024", revenue: 92000 },
  { year: "2025", revenue: 107400 },
];

export const payments = [
  {
    id: 1,
    company: "ABC Company",
    plan: "Business",
    amount: "$29.99",
    date: "01 Aug 2026",
    status: "Paid",
  },
  {
    id: 2,
    company: "XYZ Ltd",
    plan: "Enterprise",
    amount: "$99.99",
    date: "31 Jul 2026",
    status: "Paid",
  },
  {
    id: 3,
    company: "PowerTech",
    plan: "Basic",
    amount: "$9.99",
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