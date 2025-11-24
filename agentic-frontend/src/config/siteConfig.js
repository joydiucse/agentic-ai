export const profiles = {
  joy: {
    key: "joy",
    siteName: "Joy AI",
    siteCoName: "AI",
    logo: "/logo.svg",
    siteDetails: "Personal AI assistant",
    brandInitials: "JA",
    title: "Joy AI",
    metaDescription: "Joy AI – your personal AI assistant",
    favicon: "/fav.svg",
  },
  moshahed: {
    key: "moshahed",
    siteName: "Moshahed AI",
    siteCoName: "AI",
    logo: "/moshahed-logo.svg",
    siteDetails: "Research assistant",
    brandInitials: "MO",
    title: "Moshahed AI",
    metaDescription: "Moshahed AI – research and insights assistant",
    favicon: "/vite.svg",
  },
};

export function getSiteConfig() {
  const key = import.meta.env.VITE_SITE_PROFILE || "joy";
  return profiles[key] || profiles.joy;
}
