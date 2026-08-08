// Central translation dictionary for the English <-> Bangla toggle.
// Add new keys here as more of the app gets translated; components
// just call t("someKey") and both languages stay in sync in one place.
const translations = {
  en: {
    // Sidebar
    adminPanel: "Admin Panel",
    dashboard: "Dashboard",
    companies: "Companies",
    users: "Users",
    subscriptions: "Subscriptions",
    notifications: "Notifications",
    revenue: "Revenue",
    settings: "Settings",
    logout: "Logout",

    // Navbar
    adminDashboard: "Admin Dashboard",
    systemOverview: "System Overview",
    viewProfile: "View Profile",
    systemAdmin: "System Admin",
    administrator: "Administrator",
    viewAllNotifications: "View all notifications",
    noNewNotifications: "No new notifications",
    darkMode: "Dark mode",
    lightMode: "Light mode",

    // Subscriptions page
    subscriptionManagement: "Subscription Management",
    manageSubscriptionsDesc: "Manage subscription plans and pricing.",
    searchSubscription: "Search subscription...",
    billing: "Billing",
    subscribers: "Subscribers",
    monthly: "Monthly",

    // Notifications page
    alertChannels: "Alert Channels",
    alertChannelsDesc: "Configure and test the channels used to notify customers about outages.",
    emailAlerts: "Email Alerts",
    smsAlerts: "SMS Alerts",
    whatsappAlerts: "WhatsApp Alerts",
    discordAlerts: "Discord Alerts",
    enable: "Enable",
    saveChannelSettings: "Save Channel Settings",
    settingsSaved: "Settings saved",
    recentAlertsSent: "Recent Alerts Sent",

    // Settings page
    systemSettings: "System Settings",
    systemSettingsDesc: "Manage platform configuration and preferences.",
    preferences: "Preferences",
    preferencesDesc: "Personalize how the admin panel looks and reads for you.",
    language: "Language",
    english: "English",
    bangla: "Bangla",

    // Companies page
    manageCompaniesDesc: "Manage all registered companies.",
    searchCompany: "Search company...",
    company: "Company",
    email: "Email",
    plan: "Plan",
    status: "Status",
    revenueCol: "Revenue",
    actions: "Actions",

    // Users page
    userManagement: "User Management",
    manageUsersDesc: "Manage all registered users.",
    searchUser: "Search user...",
    name: "Name",
    role: "Role",

    // Revenue page
    revenueOverview: "Revenue Overview",
    revenueOverviewDesc: "Track platform earnings across months and years.",

    // Customer sidebar / navbar
    appName: "PowerPredict",
    predictionNav: "Prediction",
    subscriptionNav: "Subscription",
    backupPowerNav: "Backup Power",
    reportsNav: "Reports",
    profileNav: "Profile",
    welcomeBack: "Welcome back",
    gridStatusStable: "Grid Status: Stable",
    viewLiveAreaRisk: "View live area risk",
    searchPlaceholder: "Search areas, reports...",

    // Customer dashboard
    customerDashboardDesc: "Monitor your business electricity status and AI predictions.",
    todaysPrediction: "Today's Prediction",
    highestRiskArea: "Highest Risk Area",
    backupPowerStat: "Backup Power",
    alertsStat: "Alerts",
    weeklyPredictionTrend: "Weekly Prediction Trend",
    topAtRiskAreas: "Top At-Risk Areas",
    liveAreaRiskOverview: "Live Area Risk Overview",
    upgradePlan: "Upgrade Plan",
  },

  bn: {
    // Sidebar
    adminPanel: "অ্যাডমিন প্যানেল",
    dashboard: "ড্যাশবোর্ড",
    companies: "কোম্পানিসমূহ",
    users: "ইউজারগণ",
    subscriptions: "সাবস্ক্রিপশন",
    notifications: "নোটিফিকেশন",
    revenue: "রাজস্ব",
    settings: "সেটিংস",
    logout: "লগ আউট",

    // Navbar
    adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
    systemOverview: "সিস্টেম ওভারভিউ",
    viewProfile: "প্রোফাইল দেখুন",
    systemAdmin: "সিস্টেম অ্যাডমিন",
    administrator: "অ্যাডমিনিস্ট্রেটর",
    viewAllNotifications: "সব নোটিফিকেশন দেখুন",
    noNewNotifications: "কোনো নতুন নোটিফিকেশন নেই",
    darkMode: "ডার্ক মোড",
    lightMode: "লাইট মোড",

    // Subscriptions page
    subscriptionManagement: "সাবস্ক্রিপশন ব্যবস্থাপনা",
    manageSubscriptionsDesc: "সাবস্ক্রিপশন প্ল্যান এবং মূল্য পরিচালনা করুন।",
    searchSubscription: "সাবস্ক্রিপশন খুঁজুন...",
    billing: "বিলিং",
    subscribers: "সাবস্ক্রাইবার",
    monthly: "মাসিক",

    // Notifications page
    alertChannels: "অ্যালার্ট চ্যানেল",
    alertChannelsDesc: "গ্রাহকদের বিদ্যুৎ বিভ্রাট সম্পর্কে জানাতে ব্যবহৃত চ্যানেলগুলো কনফিগার ও পরীক্ষা করুন।",
    emailAlerts: "ইমেইল অ্যালার্ট",
    smsAlerts: "এসএমএস অ্যালার্ট",
    whatsappAlerts: "হোয়াটসঅ্যাপ অ্যালার্ট",
    discordAlerts: "ডিসকর্ড অ্যালার্ট",
    enable: "চালু করুন",
    saveChannelSettings: "চ্যানেল সেটিংস সংরক্ষণ করুন",
    settingsSaved: "সেটিংস সংরক্ষিত হয়েছে",
    recentAlertsSent: "সাম্প্রতিক পাঠানো অ্যালার্ট",

    // Settings page
    systemSettings: "সিস্টেম সেটিংস",
    systemSettingsDesc: "প্ল্যাটফর্মের কনফিগারেশন এবং পছন্দসমূহ পরিচালনা করুন।",
    preferences: "পছন্দসমূহ",
    preferencesDesc: "অ্যাডমিন প্যানেলটি আপনার জন্য কেমন দেখাবে তা নিজের মতো করে সাজান।",
    language: "ভাষা",
    english: "ইংরেজি",
    bangla: "বাংলা",

    // Companies page
    manageCompaniesDesc: "সমস্ত নিবন্ধিত কোম্পানি পরিচালনা করুন।",
    searchCompany: "কোম্পানি খুঁজুন...",
    company: "কোম্পানি",
    email: "ইমেইল",
    plan: "প্ল্যান",
    status: "অবস্থা",
    revenueCol: "রাজস্ব",
    actions: "কার্যক্রম",

    // Users page
    userManagement: "ইউজার ব্যবস্থাপনা",
    manageUsersDesc: "সমস্ত নিবন্ধিত ইউজার পরিচালনা করুন।",
    searchUser: "ইউজার খুঁজুন...",
    name: "নাম",
    role: "ভূমিকা",

    // Revenue page
    revenueOverview: "রাজস্ব ওভারভিউ",
    revenueOverviewDesc: "মাস এবং বছর অনুযায়ী প্ল্যাটফর্মের আয় ট্র্যাক করুন।",

    // Customer sidebar / navbar
    appName: "পাওয়ারপ্রেডিক্ট",
    predictionNav: "প্রেডিকশন",
    subscriptionNav: "সাবস্ক্রিপশন",
    backupPowerNav: "ব্যাকআপ পাওয়ার",
    reportsNav: "রিপোর্ট",
    profileNav: "প্রোফাইল",
    welcomeBack: "স্বাগতম",
    gridStatusStable: "গ্রিড অবস্থা: স্থিতিশীল",
    viewLiveAreaRisk: "লাইভ এলাকা ঝুঁকি দেখুন",
    searchPlaceholder: "এলাকা, রিপোর্ট খুঁজুন...",

    // Customer dashboard
    customerDashboardDesc: "আপনার ব্যবসার বিদ্যুৎ পরিস্থিতি এবং এআই ভবিষ্যদ্বাণী পর্যবেক্ষণ করুন।",
    todaysPrediction: "আজকের ভবিষ্যদ্বাণী",
    highestRiskArea: "সর্বোচ্চ ঝুঁকিপূর্ণ এলাকা",
    backupPowerStat: "ব্যাকআপ পাওয়ার",
    alertsStat: "অ্যালার্ট",
    weeklyPredictionTrend: "সাপ্তাহিক ভবিষ্যদ্বাণী প্রবণতা",
    topAtRiskAreas: "শীর্ষ ঝুঁকিপূর্ণ এলাকা",
    liveAreaRiskOverview: "লাইভ এলাকা ঝুঁকি ওভারভিউ",
    upgradePlan: "প্ল্যান আপগ্রেড করুন",
  },
};

export default translations;
