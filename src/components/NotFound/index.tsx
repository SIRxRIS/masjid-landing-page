import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    // Mengurangi Padding Atas dan Bawah menjadi pt-4/pb-4 (standar)
    // dan pt-8/pb-8 (di layar besar)
    <section className="dark:bg-gray-dark relative z-10 bg-white pb-4 pt-4 md:pb-8 md:pt-8 lg:pb-10 lg:pt-10">
      <div className="container">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <div className="mx-auto max-w-[400px]">
                <Image
                  src="/images/404-masjid.png"
                  alt="404 - Halaman Tidak Ditemukan"
                  width={350}
                  height={180}
                  // Mengurangi margin bawah pada gambar (dari mb-4/mb-3 menjadi mb-2)
                  className="mx-auto mb-2"
                />
              </div>

              {/* Mengurangi margin bawah pada H3 (dari mb-4/mb-3 menjadi mb-2) */}
              <h3 className="mb-2 text-2xl font-semibold text-primary dark:text-primary">
                Halaman Tidak Ditemukan
              </h3>

              {/* Mengurangi margin bawah pada paragraf (dari mb-6/mb-4 menjadi mb-3) */}
              <p className="mb-3 text-base text-body-color dark:text-dark-6">
                Assalamu&apos;alaikum. Maaf, halaman yang Anda cari sedang dalam
                tahap pengembangan. Fitur ini akan segera hadir untuk melayani
                kebutuhan jamaah dengan lebih baik. Mohon bersabar dan silakan
                kembali ke halaman utama.
              </p>
              <Link
                href="/"
                className="rounded-md bg-primary px-7 py-3 text-base font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
