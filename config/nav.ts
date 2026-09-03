export const publicNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Talent Development Center", href: "/services#talent" },
      { label: "HR One Stop Solution", href: "/services#hr" },
      { label: "Innovation & Event Management", href: "/services#innovation" },
      { label: "Creative & Digital Center", href: "/services#creative" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Video Recap", href: "/video-recap" },
  { label: "I-Magazine", href: "/e-magazine" },
  { label: "Contact", href: "/contact" },
] as const;

export const dashboardNav = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Events", href: "/dashboard/events", icon: "CalendarDays" },
  { label: "My QR Code", href: "/dashboard/qr", icon: "QrCode" },
  { label: "Payment Status", href: "/dashboard/payment", icon: "CreditCard" },
  { label: "Event History", href: "/dashboard/history", icon: "History" },
  { label: "Notifications", href: "/dashboard/notifications", icon: "Bell" },
  { label: "Profile", href: "/dashboard/profile", icon: "User" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

export const adminNav = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Event Management", href: "/admin/events", icon: "CalendarDays" },
  { label: "Registrations", href: "/admin/registrations", icon: "ClipboardList" },
  { label: "Participants", href: "/admin/participants", icon: "Users" },
  { label: "Payments", href: "/admin/payments", icon: "CreditCard" },
  { label: "QR Scanner", href: "/admin/scanner", icon: "QrCode" },
  { label: "Attendance", href: "/admin/attendance", icon: "CheckSquare" },
  { label: "Gallery", href: "/admin/gallery", icon: "Image" },
  { label: "Videos", href: "/admin/videos", icon: "Video" },
  { label: "Magazine", href: "/admin/magazine", icon: "BookOpen" },
  { label: "Reports", href: "/admin/reports", icon: "BarChart2" },
  { label: "Users", href: "/admin/users", icon: "UserCog" },
] as const;
