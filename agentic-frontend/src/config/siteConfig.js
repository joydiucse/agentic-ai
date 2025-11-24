export const profiles = {
  joy: {
    key: "joy",
    siteName: "Joy AI",
    siteCoName: "AI",
    logo: "/logo.svg",
    logoBg: "/logo-bg.svg",
    siteDetails: "Personal AI assistant",
    brandInitials: "JA",
    metaTitle: "Joy AI",
    metaDescription: "Joy AI – your personal AI assistant",
    metaImage: "https://chat.joynal.me/logo-bg.png",
    favicon: "/fav.svg",
  },
  moshahed: {
    key: "moshahed",
    siteName: "Moshahed AI",
    siteCoName: "AI",
    logo: "/moshahed-logo.svg",
    logoBg: "/logo.svg",
    siteDetails: "Research assistant",
    brandInitials: "MO",
    metaTitle: "Moshahed AI",
    metaDescription: "Moshahed AI – research and insights assistant",
    metaImage: "/logo-bg.png",
    favicon: "/vite.svg",
  },
};

export function getSiteConfig() {
  const key = import.meta.env.VITE_SITE_PROFILE || "joy";
  return profiles[key] || profiles.joy;
}
