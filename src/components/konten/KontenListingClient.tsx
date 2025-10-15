"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { KontenData } from "@/lib/services/supabase/konten";

interface KontenListingClientProps {
  initialData: KontenData[];
}

const KontenListingClient = ({ initialData }: KontenListingClientProps) => {
  const [kontenData, setKontenData] = useState<KontenData[]>(initialData);
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length >= 20);

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

  const getCategoryDisplayName = (kategoriId: number) => {
    const categoryMap: { [key: number]: string } = {
      1: "Kegiatan",
      2: "Pengumuman", 
      3: "Kajian",
      4: "TPQ",
      5: "Lomba",
      6: "Ramadhan",
      7: "Idul Fitri",
      8: "Idul Adha",
      9: "Sosial"
    };
    return categoryMap[kategoriId] || "Lainnya";
  };

  const categories = [
    { id: "semua", label: "Semua" },
    { id: "pengumuman", label: "Pengumuman" },
    { id: "kegiatan", label: "Kegiatan" },
    { id: "kajian", label: "Kajian" },
    { id: "sosial", label: "Sosial" },
    { id: "tpq", label: "TPQ" }
  ];

  const filteredKonten = kontenData.filter(item => {
    const matchesCategory = activeCategory === "semua" || getCategoryName(item.kategoriId) === activeCategory;
    const matchesSearch = searchQuery === "" || 
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
      return "/images/masjid/bg5.jpg";
    }
    
    // Check if it's a valid URL (starts with http/https or /)
    if (fotoUrl.startsWith('http://') || fotoUrl.startsWith('https://') || fotoUrl.startsWith('/')) {
      return fotoUrl;
    }
    
    // If it's just a filename or invalid URL, return default image
    return "/images/masjid/bg5.jpg";
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/konten?limit=20&offset=${kontenData.length}`);
      if (response.ok) {
        const newData = await response.json();
        if (newData.length < 20) {
          setHasMore(false);
        }
        setKontenData(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.error("Error loading more content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              placeholder="Cari konten..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center">
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
      </div>

      {/* Results Count */}
      <div className="mb-8 text-center">
        <p className="text-body-color dark:text-body-color-dark">
          Menampilkan {filteredKonten.length} konten
          {activeCategory !== "semua" && ` dalam kategori "${categories.find(c => c.id === activeCategory)?.label}"`}
          {searchQuery && ` untuk pencarian "${searchQuery}"`}
        </p>
      </div>

      {/* Content Grid */}
      <div className="-mx-4 flex flex-wrap">
        {filteredKonten.length > 0 ? (
          filteredKonten.map((item) => (
            <div key={item.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mb-10 h-full w-full">
                <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark">
                  <Link href={`/konten/${item.slug}`}>
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
                          getCategoryName(item.kategoriId) === "tpq" ? "bg-indigo-500" :
                          "bg-green-500"
                        }`}>
                          {getCategoryDisplayName(item.kategoriId)}
                        </span>
                      </div>
                      {item.penting && (
                        <div className="absolute right-4 top-4">
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            Penting
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatTanggal(item.tanggal)}</span>
                      <span className="mx-2">•</span>
                      <span>{item.penulis || "Admin Masjid"}</span>
                      {item.viewCount && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.viewCount} views</span>
                        </>
                      )}
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
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                Tidak ada konten yang ditemukan
              </p>
              <p className="text-gray-400 dark:text-gray-500">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && filteredKonten.length > 0 && activeCategory === "semua" && !searchQuery && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memuat...
              </>
            ) : (
              "Muat Lebih Banyak"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default KontenListingClient;