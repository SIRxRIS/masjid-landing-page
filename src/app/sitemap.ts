import { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/markdown";

const BASE_URL = "https://masjidjawahiruzzarqa.siraf.my.id";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/tentang`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/kontak`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/konten`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/jadwal-sholat`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/pengurus`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/program-kerja`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/saldo`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: `${BASE_URL}/pricing`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/sitemap`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts(["slug", "date"]).map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogPosts];
}
