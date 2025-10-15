"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PrayerTimesService, PrayerTime } from "@/lib/services/prayerTimes";

const Footer = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      // Service now always returns PrayerTime (never null)
      const times = await PrayerTimesService.getTodayPrayerTimes();
      setPrayerTimes(times);
    } catch (error) {
      console.error("Error fetching prayer times in footer:", error);
      // Fallback is already handled in the service
      setPrayerTimes(PrayerTimesService.getFallbackPrayerTimes());
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Informasi Masjid */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12">
            <div className="mb-10 w-full">
              <Link href="/" className="mb-6 inline-block max-w-[200px]">
                <Image
                  src="/images/logo/logo-dark.png"
                  alt="Masjid Jawahiruzzarqa"
                  width={200}
                  height={60}
                  className="h-auto w-auto max-w-[200px]"
                />
              </Link>
              <p className="mb-6 max-w-[300px] text-base text-gray-7">
                Masjid yang berkomitmen untuk menjadi pusat ibadah, pendidikan,
                dan pemberdayaan umat Islam.
              </p>

              {/* Informasi Kontak */}
              <div className="mb-6 space-y-3">
                <div className="flex items-start">
                  <svg
                    className="mr-3 mt-1 h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-7">
                    Villa Mutiara Biru XVIII No. 1
                    <br />
                    Kota Makassar, Sulawesi Selatan, 90243
                  </p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <p className="text-sm text-gray-7">+62 813-5488-6540</p>
                </div>
                <div className="flex items-center">
                  <svg
                    className="mr-3 h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <p className="text-sm text-gray-7">masjidjawahiruzzarqa17@gmail.com</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="-mx-3 flex items-center">
                <Link
                  aria-label="Facebook Masjid"
                  href="#"
                  className="px-3 text-gray-7 transition-colors hover:text-primary"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M16.294 8.86875H14.369H13.6815V8.18125V6.05V5.3625H14.369H15.8128C16.1909 5.3625 16.5003 5.0875 16.5003 4.675V1.03125C16.5003 0.653125 16.2253 0.34375 15.8128 0.34375H13.3034C10.5878 0.34375 8.69714 2.26875 8.69714 5.12187V8.1125V8.8H8.00964H5.67214C5.19089 8.8 4.74402 9.17812 4.74402 9.72812V12.2031C4.74402 12.6844 5.12214 13.1313 5.67214 13.1313H7.94089H8.62839V13.8188V20.7281C8.62839 21.2094 9.00652 21.6562 9.55652 21.6562H12.7878C12.994 21.6562 13.1659 21.5531 13.3034 21.4156C13.4409 21.2781 13.544 21.0375 13.544 20.8312V13.8531V13.1656H14.2659H15.8128C16.2596 13.1656 16.6034 12.8906 16.6721 12.4781V12.4438V12.4094L17.1534 10.0375C17.1878 9.79688 17.1534 9.52187 16.9471 9.24687C16.8784 9.075 16.569 8.90312 16.294 8.86875Z" />
                  </svg>
                </Link>
                <Link
                  aria-label="Instagram Masjid"
                  href="#"
                  className="px-3 text-gray-7 transition-colors hover:text-primary"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M11.0297 14.4305C12.9241 14.4305 14.4598 12.8948 14.4598 11.0004C14.4598 9.10602 12.9241 7.57031 11.0297 7.57031C9.13529 7.57031 7.59958 9.10602 7.59958 11.0004C7.59958 12.8948 9.13529 14.4305 11.0297 14.4305Z" />
                    <path d="M14.7554 1.8335H7.24463C4.25807 1.8335 1.83334 4.25823 1.83334 7.24479V14.6964C1.83334 17.7421 4.25807 20.1668 7.24463 20.1668H14.6962C17.7419 20.1668 20.1667 17.7421 20.1667 14.7555V7.24479C20.1667 4.25823 17.7419 1.8335 14.7554 1.8335ZM11.0296 15.4948C8.51614 15.4948 6.53496 13.4545 6.53496 11.0002C6.53496 8.54586 8.54571 6.50554 11.0296 6.50554C13.4839 6.50554 15.4946 8.54586 15.4946 11.0002C15.4946 13.4545 13.5134 15.4948 11.0296 15.4948ZM17.2393 6.91952C16.9436 7.24479 16.5 7.42221 15.9973 7.42221C15.5538 7.42221 15.1102 7.24479 14.7554 6.91952C14.4301 6.59425 14.2527 6.18027 14.2527 5.67758C14.2527 5.17489 14.4301 4.79049 14.7554 4.43565C15.0807 4.08081 15.4946 3.90339 15.9973 3.90339C16.4409 3.90339 16.914 4.08081 17.2393 4.40608C17.535 4.79049 17.7419 5.23403 17.7419 5.70715C17.7124 6.18027 17.535 6.59425 17.2393 6.91952Z" />
                    <path d="M16.0276 4.96777C15.6432 4.96777 15.318 5.29304 15.318 5.67745C15.318 6.06186 15.6432 6.38713 16.0276 6.38713C16.412 6.38713 16.7373 6.06186 16.7373 5.67745C16.7373 5.29304 16.4416 4.96777 16.0276 4.96777Z" />
                  </svg>
                </Link>
                <Link
                  aria-label="YouTube Masjid"
                  href="#"
                  className="px-3 text-gray-7 transition-colors hover:text-primary"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M21.543 6.498C21.346 5.85 20.847 5.351 20.201 5.154C18.986 4.8 12 4.8 12 4.8s-6.986 0-8.201.346C3.153 5.351 2.654 5.85 2.457 6.498C2.111 7.713 2.111 10.2 2.111 10.2s0 2.487.346 3.702c.197.648.696 1.147 1.342 1.344C4.814 15.6 12 15.6 12 15.6s7.186 0 8.401-.354c.646-.197 1.145-.696 1.342-1.344C21.889 12.687 21.889 10.2 21.889 10.2s0-2.487-.346-3.702zM9.75 13.05V7.35L15.45 10.2 9.75 13.05z" />
                  </svg>
                </Link>
                <Link
                  aria-label="WhatsApp Masjid"
                  href="#"
                  className="px-3 text-gray-7 transition-colors hover:text-primary"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path d="M18.671 3.329C16.612 1.27 13.89 0.11 11.001 0.11c-5.434 0-9.847 4.413-9.847 9.847 0 1.735.453 3.428 1.317 4.92L.11 21.89l7.194-1.888c1.44.786 3.057 1.2 4.697 1.2 5.434 0 9.847-4.413 9.847-9.847 0-2.63-1.024-5.105-2.887-6.968l-.29-.058zm-7.67 15.157c-1.471 0-2.91-.396-4.17-1.145l-.299-.178-3.096.812.826-3.017-.195-.31c-.825-1.312-1.26-2.83-1.26-4.391 0-4.54 3.694-8.234 8.234-8.234 2.2 0 4.267.857 5.82 2.41 1.553 1.553 2.41 3.62 2.41 5.82 0 4.54-3.694 8.233-8.234 8.233l-.036.001zm4.52-6.177c-.248-.124-1.469-.725-1.698-.808-.228-.083-.394-.124-.56.124-.166.248-.642.808-.787.975-.145.166-.29.187-.538.062-.248-.124-1.048-.386-1.996-1.233-.738-.659-1.236-1.472-1.381-1.72-.145-.248-.015-.383.109-.507.111-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.35-.768-1.846-.203-.483-.41-.418-.56-.426-.145-.007-.31-.009-.476-.009-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073 0 1.223.89 2.404 1.014 2.57.124.166 1.735 2.649 4.203 3.715.588.255 1.048.407 1.405.521.59.187 1.127.161 1.552.098.473-.071 1.469-.6 1.677-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29l.001-.001z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Navigasi */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                Navigasi
              </h4>
              <ul>
                <li>
                  <Link
                    href="/"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tentang"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kegiatan"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Kegiatan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontak"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Layanan */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Layanan</h4>
              <ul>
                <li>
                  <Link
                    href="/jadwal-sholat"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Jadwal Sholat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kajian"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Kajian Islam
                  </Link>
                </li>
                <li>
                  <Link
                    href="/donasi"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Donasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/zakat"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Zakat
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Program */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Program</h4>
              <ul>
                <li>
                  <Link
                    href="/tpa"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    TPA/TPQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/remaja-masjid"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Remaja Masjid
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pengajian-ibu"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Pengajian Ibu-ibu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sosial"
                    className="mb-3 inline-block text-base text-gray-7 transition-colors hover:text-primary"
                  >
                    Kegiatan Sosial
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Jadwal Sholat */}
          <div className="w-full px-4 md:w-2/3 lg:w-6/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                Jadwal Sholat Hari Ini
              </h4>
              <div className="space-y-2">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-7">Subuh</span>
                      <span className="font-medium text-white">{prayerTimes?.subuh || "--:--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-7">Dzuhur</span>
                      <span className="font-medium text-white">{prayerTimes?.dzuhur || "--:--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-7">Ashar</span>
                      <span className="font-medium text-white">{prayerTimes?.ashar || "--:--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-7">Maghrib</span>
                      <span className="font-medium text-white">{prayerTimes?.maghrib || "--:--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-7">Isya</span>
                      <span className="font-medium text-white">{prayerTimes?.isya || "--:--"}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/jadwal-sholat"
                  className="inline-block rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  Lihat Jadwal Lengkap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#13165F] py-8">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-between">
            <div className="w-full px-4 md:w-1/2">
              <p className="text-base text-gray-7">
                &copy; 2025 Masjid Jawahiruzzarqa. Semua hak cipta dilindungi.
              </p>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="flex items-center justify-center space-x-6 md:justify-end">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-7 transition-colors hover:text-primary"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-7 transition-colors hover:text-primary"
                >
                  Syarat & Ketentuan
                </Link>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray-7 transition-colors hover:text-primary"
                >
                  Peta Situs
                </Link>
              </div>
            </div>
          </div>

          {/* Islamic Quote */}
          <div className="mt-6 border-t border-gray-600 pt-6">
            <div className="text-center">
              <p className="text-sm italic text-gray-7">
                &ldquo;Dan dirikan shalat, tunaikanlah zakat dan ruku&apos;lah
                beserta orang-orang yang ruku&apos;&rdquo;
              </p>
              <p className="mt-2 text-xs text-white">- QS. Al-Baqarah: 43 -</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
