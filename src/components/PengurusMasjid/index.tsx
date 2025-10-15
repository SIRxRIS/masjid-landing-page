import Image from "next/image";

const PengurusMasjid = () => {
  const pengurusData = [
    {
      id: 1,
      nama: "H. Ahmad Suryadi",
      jabatan: "Ketua Takmir",
      foto: "/images/team/team-01.jpg",
      deskripsi: "Memimpin dan mengkoordinasikan seluruh kegiatan masjid",
      kontak: "ahmad.suryadi@email.com"
    },
    {
      id: 2,
      nama: "H. Muhammad Rahman",
      jabatan: "Wakil Ketua",
      foto: "/images/team/team-02.jpg",
      deskripsi: "Membantu ketua dalam menjalankan program masjid",
      kontak: "m.rahman@email.com"
    },
    {
      id: 3,
      nama: "Ustadz Abdullah",
      jabatan: "Imam Masjid",
      foto: "/images/team/team-03.jpg",
      deskripsi: "Memimpin sholat berjamaah dan memberikan tausiyah",
      kontak: "ustadz.abdullah@email.com"
    },
    {
      id: 4,
      nama: "H. Yusuf Hakim",
      jabatan: "Bendahara",
      foto: "/images/team/team-04.jpg",
      deskripsi: "Mengelola keuangan dan administrasi masjid",
      kontak: "yusuf.hakim@email.com"
    },
    {
      id: 5,
      nama: "Hj. Fatimah Zahra",
      jabatan: "Sekretaris",
      foto: "/images/team/team-01.jpg",
      deskripsi: "Menangani administrasi dan dokumentasi kegiatan",
      kontak: "fatimah.zahra@email.com"
    },
    {
      id: 6,
      nama: "H. Ibrahim Malik",
      jabatan: "Koordinator Kegiatan",
      foto: "/images/team/team-02.jpg",
      deskripsi: "Mengorganisir berbagai kegiatan dan program masjid",
      kontak: "ibrahim.malik@email.com"
    },
    {
      id: 7,
      nama: "Ustadz Ridwan",
      jabatan: "Koordinator Dakwah",
      foto: "/images/team/team-03.jpg",
      deskripsi: "Mengelola program dakwah dan kajian rutin",
      kontak: "ustadz.ridwan@email.com"
    },
    {
      id: 8,
      nama: "H. Nasir Udin",
      jabatan: "Koordinator Sosial",
      foto: "/images/team/team-04.jpg",
      deskripsi: "Menangani program sosial dan bantuan masyarakat",
      kontak: "nasir.udin@email.com"
    }
  ];

  return (
    <section id="pengurus" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Pengurus Masjid Jawahiruzzarqa
              </h2>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Tim pengurus yang berdedikasi untuk melayani jamaah dan memakmurkan masjid 
                dengan penuh amanah dan tanggung jawab.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pengurusData.map((pengurus) => (
            <div key={pengurus.id} className="w-full px-4 md:w-1/2 lg:w-1/4">
              <div className="mb-10 w-full">
                <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
                  {/* Photo */}
                  <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full">
                    <Image
                      src={pengurus.foto}
                      alt={pengurus.nama}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                      {pengurus.nama}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-primary">
                      {pengurus.jabatan}
                    </p>
                    <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">
                      {pengurus.deskripsi}
                    </p>

                    {/* Contact */}
                    <div className="flex justify-center">
                      <a
                        href={`mailto:${pengurus.kontak}`}
                        className="inline-flex items-center rounded-md bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Hubungi
                      </a>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5"></div>
                  <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-primary/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-[600px] rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
              Struktur Organisasi
            </h3>
            <p className="mb-6 text-base text-body-color dark:text-body-color-dark">
              Pengurus masjid dipilih melalui musyawarah jamaah dan bertugas selama 3 tahun. 
              Kami berkomitmen untuk melayani dengan transparansi dan akuntabilitas.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 dark:bg-gray-dark">
                <h4 className="mb-2 font-semibold text-primary">Periode Kepengurusan</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">2022 - 2025</p>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-gray-dark">
                <h4 className="mb-2 font-semibold text-primary">Rapat Rutin</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">Setiap Minggu Pertama</p>
              </div>
              <div className="rounded-lg bg-white p-4 dark:bg-gray-dark">
                <h4 className="mb-2 font-semibold text-primary">Laporan Kegiatan</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">Bulanan & Tahunan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PengurusMasjid;