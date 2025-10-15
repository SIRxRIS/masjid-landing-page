"use client";

import Link from "next/link";

const Sitemap = () => {
  const sitemapData = [
    {
      category: "Halaman Utama",
      links: [
        { title: "Beranda", href: "/", description: "Halaman utama website Masjid Jawahiruzzarqa" },
        { title: "Tentang Kami", href: "/tentang", description: "Informasi tentang sejarah dan visi misi masjid" },
        { title: "Kontak", href: "/kontak", description: "Informasi kontak dan lokasi masjid" },
      ]
    },
    {
      category: "Kegiatan & Program",
      links: [
        { title: "Kegiatan", href: "/kegiatan", description: "Daftar kegiatan dan acara masjid" },
        { title: "Konten", href: "/konten", description: "Artikel dan konten edukasi Islam" },
        { title: "TPA/TPQ", href: "/tpa", description: "Program Taman Pendidikan Al-Quran" },
        { title: "Remaja Masjid", href: "/remaja-masjid", description: "Kegiatan untuk remaja muslim" },
        { title: "Pengajian Ibu-ibu", href: "/pengajian-ibu", description: "Kajian khusus untuk ibu-ibu" },
        { title: "Kegiatan Sosial", href: "/sosial", description: "Program sosial dan kemasyarakatan" },
      ]
    },
    {
      category: "Layanan Ibadah",
      links: [
        { title: "Jadwal Sholat", href: "/jadwal-sholat", description: "Jadwal waktu sholat harian dan bulanan" },
        { title: "Kajian Islam", href: "/kajian", description: "Kajian dan ceramah agama Islam" },
        { title: "Donasi", href: "/donasi", description: "Informasi donasi untuk masjid" },
        { title: "Zakat", href: "/zakat", description: "Layanan perhitungan dan penyaluran zakat" },
      ]
    },
    {
      category: "Informasi Legal",
      links: [
        { title: "Kebijakan Privasi", href: "/privacy", description: "Kebijakan privasi dan perlindungan data" },
        { title: "Syarat & Ketentuan", href: "/terms", description: "Syarat dan ketentuan penggunaan website" },
        { title: "Peta Situs", href: "/sitemap", description: "Peta navigasi lengkap website" },
      ]
    }
  ];

  return (
    <section className="pb-20 pt-20 lg:pb-[120px] lg:pt-[120px]">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Peta Situs
          </h1>
          <p className="mx-auto max-w-[600px] text-base text-body-color dark:text-dark-6">
            Navigasi lengkap untuk memudahkan Anda menemukan informasi yang dibutuhkan di website Masjid Jawahiruzzarqa.
          </p>
        </div>

        {/* Sitemap Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {sitemapData.map((section, index) => (
            <div
              key={index}
              className="wow fadeInUp rounded-lg bg-white p-8 shadow-lg dark:bg-dark-2"
              data-wow-delay={`${0.1 * (index + 1)}s`}
            >
              <h2 className="mb-6 text-xl font-semibold text-dark dark:text-white">
                {section.category}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group block rounded-md p-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-dark-3"
                    >
                      <h3 className="mb-1 font-medium text-dark transition-colors group-hover:text-primary dark:text-white">
                        {link.title}
                      </h3>
                      <p className="text-sm text-body-color dark:text-dark-6">
                        {link.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-lg bg-primary/5 p-8 text-center dark:bg-dark-2">
          <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
            Butuh Bantuan?
          </h3>
          <p className="mb-6 text-body-color dark:text-dark-6">
            Jika Anda tidak menemukan informasi yang dicari, jangan ragu untuk menghubungi kami.
          </p>
          <Link
            href="/kontak"
            className="inline-block rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <p className="text-sm text-body-color dark:text-dark-6">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sitemap;