import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKontenBySlug, incrementViewCount } from "@/lib/services/supabase/konten";
import KontenDetailClient from "@/components/konten/KontenDetailClient";

interface KontenDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: KontenDetailPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const konten = await getKontenBySlug(slug);
    
    return {
      title: `${konten.judul} | Masjid Jawahiruzzarqa`,
      description: konten.deskripsi.substring(0, 160),
      openGraph: {
        title: konten.judul,
        description: konten.deskripsi.substring(0, 160),
        images: konten.fotoUrl ? [konten.fotoUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Konten Tidak Ditemukan | Masjid Jawahiruzzarqa",
      description: "Konten yang Anda cari tidak ditemukan.",
    };
  }
}

export default async function KontenDetailPage({ params }: KontenDetailPageProps) {
  try {
    const { slug } = await params;
    const konten = await getKontenBySlug(slug);
    
    if (!konten) {
      notFound();
    }

    // Increment view count (fire and forget)
    incrementViewCount(konten.id).catch(console.error);

    return <KontenDetailClient konten={konten} />;
  } catch (error) {
    console.error("Error loading konten detail:", error);
    notFound();
  }
}