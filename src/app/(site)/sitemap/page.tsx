import { Metadata } from "next";
import Sitemap from "@/components/Sitemap";

export const metadata: Metadata = {
  title: "Peta Situs | Masjid Jawahiruzzarqa",
  description: "Peta navigasi lengkap website Masjid Jawahiruzzarqa. Temukan semua halaman dan informasi yang Anda butuhkan dengan mudah.",
  keywords: [
    "peta situs",
    "sitemap", 
    "navigasi",
    "masjid jawahiruzzarqa",
    "halaman website",
    "daftar halaman"
  ],
  openGraph: {
    title: "Peta Situs | Masjid Jawahiruzzarqa",
    description: "Peta navigasi lengkap website Masjid Jawahiruzzarqa. Temukan semua halaman dan informasi yang Anda butuhkan dengan mudah.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Peta Situs | Masjid Jawahiruzzarqa",
    description: "Peta navigasi lengkap website Masjid Jawahiruzzarqa. Temukan semua halaman dan informasi yang Anda butuhkan dengan mudah.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitemapPage() {
  return (
    <>
      <Sitemap />
    </>
  );
}