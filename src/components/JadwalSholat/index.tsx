"use client";

import { useState, useEffect } from "react";
import { PrayerTimesService, PrayerTime, NextPrayerInfo } from "@/lib/services/prayerTimes";

const JadwalSholat = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate next prayer when prayer times or current time changes
  useEffect(() => {
    if (prayerTimes) {
      const nextPrayerInfo = PrayerTimesService.getNextPrayerInfo(prayerTimes);
      setNextPrayer(nextPrayerInfo);
    }
  }, [prayerTimes, currentTime]);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Service now always returns PrayerTime (never null)
      const times = await PrayerTimesService.getTodayPrayerTimes();
      setPrayerTimes(times);
      
      // Check if we're using fallback data (no way to detect this directly now)
      // The service will log a warning if using fallback
      
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setPrayerTimes(PrayerTimesService.getFallbackPrayerTimes());
      setError("Gagal memuat jadwal sholat. Menggunakan data cadangan.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const prayerSchedule = [
    { name: "Imsak", time: prayerTimes?.imsak, icon: "🌙" },
    { name: "Subuh", time: prayerTimes?.subuh, icon: "🌅" },
    { name: "Terbit", time: prayerTimes?.terbit, icon: "☀️" },
    { name: "Dhuha", time: prayerTimes?.dhuha, icon: "🌤️" },
    { name: "Dzuhur", time: prayerTimes?.dzuhur, icon: "☀️" },
    { name: "Ashar", time: prayerTimes?.ashar, icon: "🌇" },
    { name: "Maghrib", time: prayerTimes?.maghrib, icon: "🌆" },
    { name: "Isya", time: prayerTimes?.isya, icon: "🌃" },
  ];

  if (loading) {
    return (
      <section className="bg-gray-1 py-20 dark:bg-dark-2 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark-2 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center">
          <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
            Jadwal Sholat Hari Ini
          </h2>
          <p className="text-base text-body-color dark:text-dark-6">
            Jadwal waktu sholat untuk wilayah Makassar, Sulawesi Selatan
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {formatDate(currentDate)}
          </p>
          {error && (
            <div className="mt-4 rounded-lg bg-yellow-50 p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}
        </div>

        {/* Countdown to Next Prayer */}
        {nextPrayer && (
          <div className="wow fadeInUp mx-auto mb-14 max-w-[690px]">
            <div className="rounded-lg bg-gradient-to-r from-primary to-primary/80 p-8 text-white shadow-lg text-center">
              <h3 className="mb-2 text-lg font-medium">
                Sholat Selanjutnya {nextPrayer.name}
              </h3>
              <div className="mb-4 text-6xl font-bold tracking-wider">
                {String(nextPrayer.timeRemaining.hours).padStart(2, '0')}:
                {String(nextPrayer.timeRemaining.minutes).padStart(2, '0')}:
                {String(nextPrayer.timeRemaining.seconds).padStart(2, '0')}
              </div>
              <p className="text-lg opacity-90">
                Waktu Sholat: {nextPrayer.time} WITA
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prayerSchedule.map((prayer, index) => (
            <div
              key={index}
              className="wow fadeInUp group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark dark:shadow-card"
              data-wow-delay={`${0.1 * (index + 1)}s`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl">{prayer.icon}</span>
                  <div className="h-1 w-12 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300"></div>
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
                  {prayer.name}
                </h3>
                
                <div className="text-2xl font-bold text-primary">
                  {prayer.time || "--:--"}
                </div>
                
                <div className="mt-4 text-xs text-body-color dark:text-dark-6">
                  WITA
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="wow fadeInUp mt-16 rounded-lg bg-white p-8 shadow-lg dark:bg-dark dark:shadow-card">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                Informasi Lokasi
              </h3>
              <div className="space-y-2 text-body-color dark:text-dark-6">
                <p><strong>Kota:</strong> Makassar</p>
                <p><strong>Provinsi:</strong> Sulawesi Selatan</p>
                <p><strong>Zona Waktu:</strong> WITA (UTC+8)</p>
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                Catatan Penting
              </h3>
              <div className="space-y-2 text-sm text-body-color dark:text-dark-6">
                <p>• Waktu dapat berbeda 1-2 menit tergantung lokasi spesifik</p>
                <p>• Disarankan datang 10-15 menit sebelum waktu sholat</p>
                <p>• Jadwal diperbarui secara otomatis setiap hari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="wow fadeInUp mt-8 text-center">
          <button
            onClick={fetchPrayerTimes}
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white transition-colors duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Memuat...
              </>
            ) : (
              <>
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Perbarui Jadwal
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JadwalSholat;