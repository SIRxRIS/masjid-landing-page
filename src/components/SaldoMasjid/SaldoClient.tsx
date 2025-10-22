"use client";
import { useState } from "react";

interface SaldoData {
  totalSaldo: number;
  totalPemasukan: number;
  totalPengeluaran: number;
  kotakAmalMasjidTotal: number;
  donasiKhususTotal: number;
  donaturTotal: number;
  kotakAmalLuarTotal: number;
  pemasukanBySumber: Record<string, number>;
  currentYear: number;
}

interface SaldoClientProps {
  saldoData: SaldoData;
}

const SaldoClient = ({ saldoData }: SaldoClientProps) => {
  const [activeTab, setActiveTab] = useState("saldo");

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section id="saldo" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Transparansi Keuangan Masjid
              </h2>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Kami berkomitmen untuk transparansi dalam pengelolaan keuangan masjid.
                Berikut adalah laporan keuangan terkini untuk kepercayaan jamaah.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[900px]">
          {/* Saldo Total */}
          <div className="mb-8 rounded-lg bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-white">
            <h3 className="mb-2 text-lg font-semibold">Saldo Bersih Masjid</h3>
            <p className="text-4xl font-bold">{formatRupiah(saldoData.totalSaldo)}</p>
            <p className="mt-2 text-sm opacity-90">Per tanggal {new Date().toLocaleDateString("id-ID")}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded bg-white/20 p-3">
                <p className="opacity-90">Total Pemasukan</p>
                <p className="text-lg font-semibold sm:text-xl md:text-2xl">{formatRupiah(saldoData.totalPemasukan)}</p>
              </div>
              <div className="rounded bg-white/20 p-3">
                <p className="opacity-90">Total Pengeluaran</p>
                <p className="text-lg font-semibold sm:text-xl md:text-2xl">{formatRupiah(saldoData.totalPengeluaran)}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab("saldo")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === "saldo"
                  ? "bg-white text-primary shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                Ringkasan
              </button>
              <button
                onClick={() => setActiveTab("pemasukan")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === "pemasukan"
                  ? "bg-white text-primary shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                Pemasukan
              </button>
              <button
                onClick={() => setActiveTab("pengeluaran")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === "pengeluaran"
                  ? "bg-white text-primary shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                Pengeluaran
              </button>
              <button
                onClick={() => setActiveTab("donatur")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === "donatur"
                  ? "bg-white text-primary shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                Donatur
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === "info"
                  ? "bg-white text-primary shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
              >
                Laporan Keuangan Jum&apos;at
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
            {activeTab === "saldo" && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
                  <h4 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-400">
                    Kotak Amal Masjid
                  </h4>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatRupiah(saldoData.kotakAmalMasjidTotal)}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-6 dark:bg-primary/20">
                  <h4 className="mb-2 text-lg font-semibold text-primary dark:text-primary">
                    Donasi Khusus
                  </h4>
                  <p className="text-xl font-bold text-primary dark:text-primary">
                    {formatRupiah(saldoData.donasiKhususTotal)}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
                  <h4 className="mb-2 text-lg font-semibold text-purple-800 dark:text-purple-400">
                    Donatur
                  </h4>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {formatRupiah(saldoData.donaturTotal)}
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-6 dark:bg-orange-900/20">
                  <h4 className="mb-2 text-lg font-semibold text-orange-800 dark:text-orange-400">
                    Kotak Amal Luar
                  </h4>
                  <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {formatRupiah(saldoData.kotakAmalLuarTotal)}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "pemasukan" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Sumber Pemasukan Tahun {saldoData.currentYear}
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-black dark:text-white">Kotak Amal Masjid</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Infaq harian jamaah di masjid</p>
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      {formatRupiah(saldoData.kotakAmalMasjidTotal)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-black dark:text-white">Donasi Khusus</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Donasi untuk program tertentu</p>
                    </div>
                    <p className="font-bold text-primary dark:text-primary">
                      {formatRupiah(saldoData.donasiKhususTotal)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-black dark:text-white">Donatur Tetap</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Kontribusi dari donatur tetap</p>
                    </div>
                    <p className="font-bold text-purple-600 dark:text-purple-400">
                      {formatRupiah(saldoData.donaturTotal)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-black dark:text-white">Kotak Amal Luar</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Kotak amal di luar masjid</p>
                    </div>
                    <p className="font-bold text-orange-600 dark:text-orange-400">
                      {formatRupiah(saldoData.kotakAmalLuarTotal)}
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-primary/10 dark:bg-primary/20 rounded-lg border-l-4 border-primary">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-primary dark:text-primary">Total Pemasukan</p>
                      <p className="text-xl font-bold text-primary dark:text-primary">
                        {formatRupiah(saldoData.totalPemasukan)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pengeluaran" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Pengeluaran Tahun {saldoData.currentYear}
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-red-700 dark:text-red-400">Total Pengeluaran</p>
                        <p className="text-sm text-red-600 dark:text-red-300">Semua pengeluaran masjid</p>
                      </div>
                      <p className="text-xl font-bold text-red-700 dark:text-red-400">
                        {formatRupiah(saldoData.totalPengeluaran)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Pengeluaran meliputi:
                    </p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Operasional masjid (listrik, air, kebersihan)</li>
                      <li>• Pemeliharaan dan perbaikan fasilitas</li>
                      <li>• Kegiatan dakwah dan sosial</li>
                      <li>• Honorarium pengurus dan imam</li>
                      <li>• Pembelian perlengkapan masjid</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "donatur" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Donatur Tetap
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-purple-700 dark:text-purple-400">Total Kontribusi Donatur</p>
                        <p className="text-sm text-purple-600 dark:text-purple-300">Donasi rutin dari donatur tetap</p>
                      </div>
                      <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                        {formatRupiah(saldoData.donaturTotal)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Donatur tetap adalah jamaah yang berkomitmen memberikan donasi rutin untuk:
                    </p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Operasional Masjid</li>
                      <li>• Pendidikan TPQ</li>
                      <li>• Pengembangan fasilitas masjid</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <p className="text-sm text-primary dark:text-primary font-medium">
                      Jazakallahu khairan kepada semua donatur yang telah berkontribusi untuk kemajuan masjid.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "informasi" && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  Informasi Keuangan
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <h5 className="font-medium text-primary dark:text-primary mb-2">
                      Transparansi Keuangan
                    </h5>
                    <p className="text-sm text-primary dark:text-primary">
                      Semua dana yang masuk dikelola dengan amanah dan transparan.
                      Laporan keuangan lengkap dapat dilihat di halaman khusus saldo masjid.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-medium text-green-800 dark:text-green-400 mb-2">
                      Cara Berdonasi
                    </h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Jamaah dapat berinfaq melalui kotak amal yang tersedia di masjid
                      atau melalui transfer bank untuk donasi khusus.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-medium text-purple-800 dark:text-purple-400 mb-2">
                      Penggunaan Dana
                    </h5>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Dana digunakan untuk operasional masjid, kegiatan dakwah,
                      pemeliharaan fasilitas, dan program sosial kemasyarakatan.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <a
              href="/saldo"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
            >
              Lihat Laporan Lengkap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaldoClient;