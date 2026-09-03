export const publicNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Corporate Training", href: "/services#corporate-training" },
      { label: "Public Program", href: "/services#public-program" },
      { label: "Certification", href: "/services#certification" },
      { label: "Leadership Development", href: "/services#leadership" },
      { label: "ESG & Sustainability", href: "/services#esg" },
      { label: "AI & Digital Transformation", href: "/services#ai-digital" },
      { label: "Executive Learning", href: "/services#executive" },
      { label: "Consulting Program", href: "/services#consulting" },
      { label: "Event Management", href: "/services#event-management" },
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
