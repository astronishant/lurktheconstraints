import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lurktheconstraints.vercel.app/ctf/sitemap.xml",
  };
}
