export const profiles = {
  joy: {
    key: "joy",
    siteName: "Joy AI",
    siteCoName: "AI",
    logo: "/logo.svg",
    siteDetails: "Personal AI assistant",
    brandInitials: "JA",
  },
  moshahed: {
    key: "moshahed",
    siteName: "Moshahed AI",
    siteCoName: "AI",
    logo: "/moshahed-logo.svg",
    siteDetails: "Research assistant",
    brandInitials: "MO",
  },
};

export function getSiteConfig() {
  const key = import.meta.env.VITE_SITE_PROFILE || "joy";
  return profiles[key] || profiles.joy;
}
