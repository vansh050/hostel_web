import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lalpurhostels.com/sitemap.xml", // TODO: Replace with your actual domain
  };
}
