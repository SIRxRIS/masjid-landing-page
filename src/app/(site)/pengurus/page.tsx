import Breadcrumb from "@/components/Common/Breadcrumb";
import PengurusServer from "@/components/PengurusMasjid/PengurusServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengurus Masjid | Masjid Jawahiruzzarqa",
  description:
    "Profil lengkap pengurus dan takmir Masjid Jawahiruzzarqa beserta struktur organisasi.",
};

export const dynamic = "force-dynamic";

const PengurusPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Pengurus Masjid" />
      <PengurusServer />
    </main>
  );
};

export default PengurusPage;
