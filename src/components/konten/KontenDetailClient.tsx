"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { KontenData } from "@/lib/services/supabase/konten";

interface KontenDetailClientProps {
  konten: KontenData;
}

const KontenDetailClient = ({ konten }: KontenDetailClientProps) => {
  const [imageError, setImageError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const formatTanggal = (tanggal: Date | string) => {
    const date = typeof tanggal === 'string' ? new Date(tanggal) : tanggal;
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatWaktu = (waktu: string | null) => {
    if (!waktu) return null;
    return waktu;
  };

  const getCategoryColor = (kategoriId: number) => {
    const colorMap: { [key: number]: string } = {
      1: "bg-green-500", // kegiatan
      2: "bg-red-500",   // pengumuman
      3: "bg-primary",  // kajian
      4: "bg-purple-500", // tpq
      5: "bg-yellow-500", // lomba
      6: "bg-indigo-500", // ramadhan
      7: "bg-pink-500",   // idul-fitri
      8: "bg-orange-500", // idul-adha
      9: "bg-teal-500"    // sosial
    };
    return colorMap[kategoriId] || "bg-gray-500";
  };

  const getCategoryName = (kategoriId: number) => {
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

  // Helper function to validate and get proper image URL
  const getValidImageUrl = (fotoUrl: string | null): string => {
    if (!fotoUrl) {
      return "/images/masjid/bg1.jpg";
    }
    
    // Check if it's a valid URL (starts with http/https or /)
    if (fotoUrl.startsWith('http://') || fotoUrl.startsWith('https://') || fotoUrl.startsWith('/')) {
      return fotoUrl;
    }
    
    // If it's just a filename or invalid URL, return default image
    return "/images/masjid/bg1.jpg";
  };

  // Prepare images for gallery
  const getAllImages = () => {
    const images = [];
    
    // Add main image if exists
    if (konten.fotoUrl && !imageError) {
      images.push({
        url: konten.fotoUrl,
        caption: "Gambar Utama",
        isUtama: true
      });
    }
    
    // Add additional images from gambar relation
    if (konten.gambar && konten.gambar.length > 0) {
      const additionalImages = konten.gambar
        .filter(img => img.url !== konten.fotoUrl) // Avoid duplicates
        .sort((a, b) => a.urutan - b.urutan)
        .map(img => ({
          url: img.url,
          caption: img.caption || `Gambar ${img.urutan}`,
          isUtama: img.isUtama
        }));
      images.push(...additionalImages);
    }
    
    return images;
  };

  const allImages = getAllImages();
  const hasMultipleImages = allImages.length > 1;

  return (
    <div className="pt-[120px] pb-[120px]">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-body-color dark:text-body-color-dark">
            <li>
              <Link href="/" className="hover:text-primary">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/konten" className="hover:text-primary">
                Konten
              </Link>
            </li>
            <li>/</li>
            <li className="text-primary">{konten.judul}</li>
          </ol>
        </nav>

        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${getCategoryColor(konten.kategoriId)}`}>
                {getCategoryName(konten.kategoriId)}
              </span>
              {konten.penting && (
                <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  Penting
                </span>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
              {konten.judul}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-body-color dark:text-body-color-dark">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatTanggal(konten.tanggal)}</span>
              </div>

              {konten.waktu && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatWaktu(konten.waktu)}</span>
                </div>
              )}

              {konten.lokasi && (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{konten.lokasi}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{konten.penulis || "Admin Masjid"}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{konten.viewCount || 0} views</span>
              </div>
            </div>
          </div>

          {/* Featured Image / Image Gallery */}
          {allImages.length > 0 && (
            <div className="mb-8">
              {/* Main Image */}
              <div className="mb-4 overflow-hidden rounded-lg">
                <div className="relative h-64 w-full md:h-96">
                  <Image
                    src={getValidImageUrl(allImages[selectedImageIndex]?.url || konten.fotoUrl)}
                    alt={allImages[selectedImageIndex]?.caption || konten.judul}
                    fill
                    className="object-cover cursor-pointer"
                    onError={() => setImageError(true)}
                    onClick={() => setShowGallery(true)}
                  />
                  {hasMultipleImages && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                  )}
                </div>
                {allImages[selectedImageIndex]?.caption && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {allImages[selectedImageIndex].caption}
                  </p>
                )}
              </div>

              {/* Image Thumbnails */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 relative h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index 
                          ? "border-primary" 
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.caption}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-base leading-relaxed text-body-color dark:text-body-color-dark">
              {konten.deskripsi}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Link
                href="/konten"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Konten
              </Link>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: konten.judul,
                        text: konten.deskripsi.substring(0, 100),
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link berhasil disalin!");
                    }
                  }}
                  className="inline-flex items-center text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
                >
                  <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕
            </button>

            {/* Navigation Buttons */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === 0 ? allImages.length - 1 : prev - 1
                  )}
                  className="absolute left-4 text-white text-3xl hover:text-gray-300 z-10"
                >
                  ‹
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => 
                    prev === allImages.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 text-white text-3xl hover:text-gray-300 z-10"
                >
                  ›
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={getValidImageUrl(allImages[selectedImageIndex]?.url || konten.fotoUrl)}
                alt={allImages[selectedImageIndex]?.caption || konten.judul}
                width={800}
                height={600}
                className="object-contain max-h-[80vh] w-auto"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-center">
                  {allImages[selectedImageIndex]?.caption}
                </p>
                {hasMultipleImages && (
                  <p className="text-center text-sm mt-1">
                    {selectedImageIndex + 1} dari {allImages.length} gambar
                  </p>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative h-12 w-12 rounded overflow-hidden border-2 ${
                      selectedImageIndex === index 
                        ? "border-white" 
                        : "border-gray-400"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KontenDetailClient;