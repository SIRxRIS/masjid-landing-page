"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KontenData } from "@/lib/services/supabase/konten";

interface KontenClientProps {
  kontenData: KontenData[];
}

const KontenClient = ({ kontenData }: KontenClientProps) => {
  const [activeCategory, setActiveCategory] = useState("semua");

  // Map kategori IDs to category names (you may need to adjust based on your kategori data)
  const getCategoryName = (kategoriId: number) => {
    const categoryMap: { [key: number]: string } = {
      1: "kegiatan",
      2: "pengumuman", 
      3: "kajian",
      4: "tpq",
      5: "lomba",
      6: "ramadhan",
      7: "idul-fitri",
      8: "idul-adha",
      9: "sosial"
    };
    return categoryMap[kategoriId] || "lainnya";
  };

  const categories = [
    { id: "semua", label: "Semua" },
    { id: "pengumuman", label: "Pengumuman" },
    { id: "kegiatan", label: "Kegiatan" },
    { id: "kajian", label: "Kajian" },
    { id: "sosial", label: "Sosial" }
  ];

  const filteredKonten = activeCategory === "semua" 
    ? kontenData 
    : kontenData.filter(item => getCategoryName(item.kategoriId) === activeCategory);

  const formatTanggal = (tanggal: Date | string) => {
    const date = typeof tanggal === 'string' ? new Date(tanggal) : tanggal;
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Helper function to validate and get proper image URL
  const getValidImageUrl = (fotoUrl: string | null): string => {
    if (!fotoUrl) {
      return "/images/masjid/bg4.jpg";
    }
    
    // Check if it's a valid URL (starts with http/https or /)
    if (fotoUrl.startsWith('http://') || fotoUrl.startsWith('https://') || fotoUrl.startsWith('/')) {
      return fotoUrl;
    }
    
    // If it's just a filename or invalid URL, return default image
    return "/images/masjid/bg4.jpg";
  };

  return (
    <section id="konten" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Konten & Informasi Masjid
              </h2>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Dapatkan informasi terbaru tentang kegiatan, pengumuman, dan artikel islami 
                dari Masjid Jawahiruzzarqa.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex justify-center">
          <div className="flex flex-wrap gap-2 rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="-mx-4 flex flex-wrap">
          {filteredKonten.length > 0 ? (
            filteredKonten.map((item) => (
              <div key={item.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-10 h-full w-full">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark">
                    <div className="relative h-48 w-full flex-shrink-0">
                      <Image
                        src={getValidImageUrl(item.fotoUrl)}
                        alt={item.judul}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-4 top-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
                          getCategoryName(item.kategoriId) === "pengumuman" ? "bg-red-500" :
                          getCategoryName(item.kategoriId) === "kajian" ? "bg-primary" :
                          getCategoryName(item.kategoriId) === "sosial" ? "bg-purple-500" :
                          "bg-green-500"
                        }`}>
                          {item.kategori?.nama || getCategoryName(item.kategoriId)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{formatTanggal(item.tanggal)}</span>
                        <span className="mx-2">•</span>
                        <span>{item.penulis || "Admin Masjid"}</span>
                      </div>
                      
                      <h3 className="mb-3 text-xl font-semibold text-black dark:text-white hover:text-primary">
                        <Link href={`/konten/${item.slug}`} className="block">
                          {item.judul}
                        </Link>
                      </h3>
                      
                      <p className="mb-4 flex-1 text-base text-body-color dark:text-body-color-dark">
                        {item.deskripsi.length > 120 
                          ? `${item.deskripsi.substring(0, 120)}...` 
                          : item.deskripsi}
                      </p>
                      
                      <Link
                        href={`/konten/${item.slug}`}
                        className="mt-auto inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Baca Selengkapnya
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full px-4">
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Belum ada konten yang tersedia.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredKonten.length > 0 && (
          <div className="text-center">
            <Link 
              href="/konten"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
            >
              Lihat Konten Lainnya
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default KontenClient;