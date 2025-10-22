// Prayer Times API Service
export interface PrayerTime {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export interface NextPrayerInfo {
  name: string;
  time: string;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface PrayerScheduleResponse {
  status: boolean;
  data: {
    id: string;
    lokasi: string;
    daerah: string;
    koordinat: {
      lat: number;
      lon: number;
      lintang: string;
      bujur: string;
    };
    jadwal: {
      tanggal: string;
      imsak: string;
      subuh: string;
      terbit: string;
      dhuha: string;
      dzuhur: string;
      ashar: string;
      maghrib: string;
      isya: string;
    };
  };
}

const API_BASE_URL = "/api/prayer-times";
const CITY_ID = "741"; // Makassar

export class PrayerTimesService {
  /**
   * Fetch today's prayer times for Makassar
   * Returns fallback data jika API tidak tersedia
   */
  static async getTodayPrayerTimes(): Promise<PrayerTime> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PrayerScheduleResponse = await response.json();

      if (!data.status || !data.data) {
        throw new Error("Invalid response format");
      }

      return {
        imsak: data.data.jadwal.imsak,
        subuh: data.data.jadwal.subuh,
        terbit: data.data.jadwal.terbit,
        dhuha: data.data.jadwal.dhuha,
        dzuhur: data.data.jadwal.dzuhur,
        ashar: data.data.jadwal.ashar,
        maghrib: data.data.jadwal.maghrib,
        isya: data.data.jadwal.isya,
      };
    } catch (error) {
      console.warn(
        "API tidak tersedia, menggunakan jadwal fallback untuk Makassar:",
        error,
      );
      return this.getFallbackPrayerTimes();
    }
  }

  /**
   * Fetch prayer times for a specific date
   * Returns fallback data jika API tidak tersedia
   */
  static async getPrayerTimesByDate(
    year: number,
    month: number,
    day: number,
  ): Promise<PrayerTime> {
    try {
      const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${API_BASE_URL}?date=${encodeURIComponent(formattedDate)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PrayerScheduleResponse = await response.json();

      if (!data.status || !data.data) {
        throw new Error("Invalid response format");
      }

      return {
        imsak: data.data.jadwal.imsak,
        subuh: data.data.jadwal.subuh,
        terbit: data.data.jadwal.terbit,
        dhuha: data.data.jadwal.dhuha,
        dzuhur: data.data.jadwal.dzuhur,
        ashar: data.data.jadwal.ashar,
        maghrib: data.data.jadwal.maghrib,
        isya: data.data.jadwal.isya,
      };
    } catch (error) {
      console.warn(
        "API tidak tersedia, menggunakan jadwal fallback untuk Makassar:",
        error,
      );
      return this.getFallbackPrayerTimes();
    }
  }

  /**
   * Get fallback prayer times (accurate data based on jadwal-sholat.net for Makassar)
   */
  static getFallbackPrayerTimes(): PrayerTime {
    // Data akurat berdasarkan jadwal-sholat.net untuk Makassar
    return {
      imsak: "04:41",
      subuh: "04:51",
      terbit: "05:50",
      dhuha: "06:20",
      dzuhur: "11:54",
      ashar: "16:10",
      maghrib: "17:57",
      isya: "19:02",
    };
  }

  /**
   * Calculate next prayer time and countdown
   */
  static getNextPrayerInfo(prayerTimes: PrayerTime): NextPrayerInfo | null {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: "Subuh", time: prayerTimes.subuh },
      { name: "Dzuhur", time: prayerTimes.dzuhur },
      { name: "Ashar", time: prayerTimes.ashar },
      { name: "Maghrib", time: prayerTimes.maghrib },
      { name: "Isya", time: prayerTimes.isya },
    ];

    // Convert prayer times to minutes
    const prayerMinutes = prayers.map((prayer) => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      return {
        ...prayer,
        minutes: hours * 60 + minutes,
      };
    });

    // Find next prayer
    let nextPrayer = prayerMinutes.find(
      (prayer) => prayer.minutes > currentTime,
    );

    // If no prayer found today, next prayer is Subuh tomorrow
    if (!nextPrayer) {
      nextPrayer = {
        name: "Subuh",
        time: prayerTimes.subuh,
        minutes: prayerMinutes[0].minutes + 24 * 60, // Add 24 hours
      };
    }

    // Calculate time remaining
    const minutesRemaining = nextPrayer.minutes - currentTime;
    const hours = Math.floor(minutesRemaining / 60);
    const minutes = minutesRemaining % 60;
    const seconds = 60 - now.getSeconds();

    return {
      name: nextPrayer.name,
      time: nextPrayer.time,
      timeRemaining: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
    };
  }

  /**
   * Get current prayer time (which prayer time has passed)
   */
  static getCurrentPrayer(prayerTimes: PrayerTime): string {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { name: "Isya", time: prayerTimes.isya },
      { name: "Maghrib", time: prayerTimes.maghrib },
      { name: "Ashar", time: prayerTimes.ashar },
      { name: "Dzuhur", time: prayerTimes.dzuhur },
      { name: "Subuh", time: prayerTimes.subuh },
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (currentTime >= prayerMinutes) {
        return prayer.name;
      }
    }

    return "Malam"; // Before Subuh
  }
}
