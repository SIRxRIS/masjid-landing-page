import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import JadwalSholat from "@/components/JadwalSholat";

export const metadata: Metadata = {
  title: "Jadwal Sholat | Masjid Jawahiruzzarqa",
  description: "Jadwal waktu sholat 5 waktu untuk wilayah Makassar, Sulawesi Selatan. Dapatkan informasi waktu sholat yang akurat dan terkini.",
  keywords: "jadwal sholat, waktu sholat, masjid, makassar, sulawesi selatan, sholat 5 waktu",
  openGraph: {
    title: "Jadwal Sholat | Masjid Jawahiruzzarqa",
    description: "Jadwal waktu sholat 5 waktu untuk wilayah Makassar, Sulawesi Selatan",
    type: "website",
  },
};

const JadwalSholatPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Jadwal Sholat"
        pageDescription="Jadwal waktu sholat 5 waktu untuk wilayah Makassar, Sulawesi Selatan. Informasi waktu sholat yang akurat dan selalu terkini."
      />
      <JadwalSholat />
    </>
  );
};

export default JadwalSholatPage;