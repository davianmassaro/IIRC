export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  href: string;
}

export const services: Service[] = [
  {
    id: "talent",
    title: "Talent Development Center",
    description:
      "Unlock human potential through world-class learning programs, leadership development, executive education, and professional certification.",
    icon: "GraduationCap",
    color: "lilac",
    features: [
      "Leadership Development",
      "Executive Education",
      "Professional Certification",
      "Technical & Functional Training",
    ],
    href: "/services#talent",
  },
  {
    id: "hr",
    title: "HR One Stop Solution",
    description:
      "End-to-end HR solutions that drive organisational excellence, talent assessment, performance management, and HR strategy consulting.",
    icon: "Users",
    color: "blue",
    features: [
      "Talent Assessment",
      "Organizational Development",
      "Performance Management",
      "HR Strategy & Consulting",
    ],
    href: "/services#hr",
  },
  {
    id: "innovation",
    title: "Innovation & Event Management",
    description:
      "Transformative events and research that spark breakthrough ideas, business insights, and corporate innovation programs.",
    icon: "Lightbulb",
    color: "gold",
    features: [
      "Business Research",
      "Innovation Programs",
      "Event Management",
      "Strategic Insights",
    ],
    href: "/services#innovation",
  },
  {
    id: "creative",
    title: "Creative & Digital Center",
    description:
      "Bold digital storytelling that elevates your brand to new heights through branding, social media, and digital content production.",
    icon: "Palette",
    color: "green",
    features: [
      "Branding & Communication",
      "Social Media Management",
      "Digital Content Production",
      "Event Management",
    ],
    href: "/services#creative",
  },
];

