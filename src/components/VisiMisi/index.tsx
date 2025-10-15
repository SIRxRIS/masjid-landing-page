"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Types untuk VisiMisi
interface VisiMisiData {
  id: number;
  kategori: "MASJID" | "REMAS" | "MAJLIS_TALIM";
  jenis: "VISI" | "MISI";
  konten: string;
  divisi?: string | null;
  urutan: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface VisiMisiProps {
  initialData?: VisiMisiData[];
}

const VisiMisi = ({ initialData = [] }: VisiMisiProps) => {
  const [visiMisiData, setVisiMisiData] = useState<VisiMisiData[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData.length) {
      fetchVisiMisiData();
    }
  }, [initialData.length]);

  const fetchVisiMisiData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/visi-misi");
      const result = await response.json();

      if (result.success) {
        setVisiMisiData(result.data || []);
      } else {
        setError(result.message || "Gagal mengambil data visi misi");
      }
    } catch (err) {
      console.error("Error fetching visi misi:", err);
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  // Group data by kategori and jenis
  const groupedData = visiMisiData.reduce(
    (acc, item) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = { VISI: [], MISI: [] };
      }
      acc[item.kategori][item.jenis].push(item);
      return acc;
    },
    {} as Record<string, { VISI: VisiMisiData[]; MISI: VisiMisiData[] }>,
  );

  // Sort items by urutan
  Object.keys(groupedData).forEach((kategori) => {
    groupedData[kategori].VISI.sort((a, b) => a.urutan - b.urutan);
    groupedData[kategori].MISI.sort((a, b) => a.urutan - b.urutan);
  });

  const getKategoriTitle = (kategori: string) => {
    switch (kategori) {
      case "MASJID":
        return "Masjid Jawahiruzzarqa";
      case "REMAS":
        return "Remaja Masjid";
      case "MAJLIS_TALIM":
        return "Majlis Talim";
      default:
        return kategori;
    }
  };

  if (loading) {
    return (
      <section className="pb-20 pt-20 lg:pb-[120px] lg:pt-[120px]">
        <div className="container">
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pb-20 pt-20 lg:pb-[120px] lg:pt-[120px]">
        <div className="container">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-20 pt-20 lg:pb-[120px] lg:pt-[120px]">
      <div className="container">
        {/* Content */}
        <div className="space-y-16">
          {Object.entries(groupedData).map(([kategori, data]) => (
            <div key={kategori} className="space-y-12">
              <div className="grid gap-12 lg:grid-cols-2">
                {/* Visi */}
                {data.VISI.length > 0 && (
                  <div className="wow fadeInUp" data-wow-delay=".1s">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2">
                      <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-dark dark:text-white">
                          Visi
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {data.VISI.map((item) => (
                          <div key={item.id} className="flex items-start">
                            <div className="mr-3 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"></div>
                            <div>
                              <p className="text-body-color dark:text-dark-6">
                                {item.konten}
                              </p>
                              {item.divisi && (
                                <span className="mt-1 inline-block text-xs font-medium text-primary">
                                  {item.divisi}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Misi */}
                {data.MISI.length > 0 && (
                  <div className="wow fadeInUp" data-wow-delay=".2s">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2">
                      <div className="mb-6 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <svg
                            className="h-8 w-8 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-dark dark:text-white">
                          Misi
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {data.MISI.map((item, index) => (
                          <div key={item.id} className="flex items-start">
                            <div className="mr-3 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-body-color dark:text-dark-6">
                                {item.konten}
                              </p>
                              {item.divisi && (
                                <span className="mt-1 inline-block text-xs font-medium text-primary">
                                  {item.divisi}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-lg bg-primary/5 p-8 text-center dark:bg-dark-2">
          <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
            Mari Bergabung Bersama Kami
          </h3>
          <p className="mb-6 text-body-color dark:text-dark-6">
            Jadilah bagian dari komunitas Masjid Jawahiruzzarqa dalam mewujudkan
            visi dan misi bersama.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/konten"
              className="inline-block rounded-md border border-primary px-6 py-3 text-base font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Lihat Kegiatan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
