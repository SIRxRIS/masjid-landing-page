// src/components/ProgramKerja/index.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Types untuk ProgramKerja
interface ProgramKerjaData {
  id: number;
  kategori: "PENGURUS_MASJID" | "REMAS" | "MAJLIS_TALIM";
  seksi: string;
  judul: string;
  deskripsi?: string | null;
  urutan: number;
  tahun?: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProgramKerjaProps {
  initialData?: ProgramKerjaData[];
}

const ProgramKerja = ({ initialData = [] }: ProgramKerjaProps) => {
  const [programKerjaData, setProgramKerjaData] = useState<ProgramKerjaData[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);
  const [activeKategori, setActiveKategori] = useState<string>("PENGURUS_MASJID");

  useEffect(() => {
    if (!initialData.length) {
      fetchProgramKerjaData();
    }
  }, [initialData.length]);

  const fetchProgramKerjaData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/program-kerja");
      const result = await response.json();

      if (result.success) {
        setProgramKerjaData(result.data || []);
      } else {
        setError(result.message || "Gagal mengambil data program kerja");
      }
    } catch (err) {
      console.error("Error fetching program kerja:", err);
      setError("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  // Group data by kategori and seksi
  const groupedData = programKerjaData
    .filter(item => item.isActive)
    .reduce(
      (acc, item) => {
        if (!acc[item.kategori]) {
          acc[item.kategori] = {};
        }
        if (!acc[item.kategori][item.seksi]) {
          acc[item.kategori][item.seksi] = [];
        }
        acc[item.kategori][item.seksi].push(item);
        return acc;
      },
      {} as Record<string, Record<string, ProgramKerjaData[]>>,
    );

  // Sort items by urutan
  Object.keys(groupedData).forEach((kategori) => {
    Object.keys(groupedData[kategori]).forEach((seksi) => {
      groupedData[kategori][seksi].sort((a, b) => a.urutan - b.urutan);
    });
  });

  const getKategoriTitle = (kategori: string) => {
    switch (kategori) {
      case "PENGURUS_MASJID":
        return "Pengurus Masjid";
      case "REMAS":
        return "Remaja Masjid (Remas)";
      case "MAJLIS_TALIM":
        return "Majlis Ta'lim";
      default:
        return kategori;
    }
  };

  const kategoriList = [
    { value: "PENGURUS_MASJID", label: "Pengurus Masjid" },
    { value: "REMAS", label: "Remas" },
    { value: "MAJLIS_TALIM", label: "Majlis Ta'lim" },
  ];

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
        {/* Tabs Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {kategoriList.map((kategori) => (
            <button
              key={kategori.value}
              onClick={() => setActiveKategori(kategori.value)}
              className={`rounded-lg px-6 py-3 font-medium transition-all duration-300 ${activeKategori === kategori.value
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-body-color hover:bg-primary/10 dark:bg-dark-2 dark:text-dark-6"
                }`}
            >
              {kategori.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {groupedData[activeKategori] ? (
            Object.entries(groupedData[activeKategori]).map(([seksi, programs]) => (
              <div key={seksi} className="wow fadeInUp" data-wow-delay=".1s">
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-dark-2 lg:p-8">
                  {/* Seksi Header */}
                  <div className="mb-6 flex items-center border-b border-gray-200 pb-4 dark:border-dark-3">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dark dark:text-white">
                        Seksi {seksi}
                      </h3>
                      <p className="text-sm text-body-color dark:text-dark-6">
                        {programs.length} Program Kerja
                      </p>
                    </div>
                  </div>

                  {/* Programs List */}
                  <div className="space-y-4">
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className="flex items-start gap-4 rounded-lg border border-gray-100 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md dark:border-dark-3"
                      >
                        {/* Number Badge */}
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                          {program.urutan}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4 className="mb-2 font-semibold text-dark dark:text-white">
                            {program.judul}
                          </h4>
                          {program.deskripsi && (
                            <p className="text-sm text-body-color dark:text-dark-6">
                              {program.deskripsi}
                            </p>
                          )}
                          {program.tahun && (
                            <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              Tahun {program.tahun}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg bg-white p-12 text-center shadow-lg dark:bg-dark-2">
              <svg
                className="mx-auto mb-4 h-16 w-16 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-body-color dark:text-dark-6">
                Belum ada program kerja untuk kategori ini
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-lg bg-primary/5 p-8 text-center dark:bg-dark-2">
          <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
            Mari Bergabung dalam Program Kami
          </h3>
          <p className="mb-6 text-body-color dark:text-dark-6">
            Jadilah bagian dari pelaksanaan program kerja Masjid Jawahiruzzarqa
            untuk kemajuan umat dan masyarakat.
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

export default ProgramKerja;
