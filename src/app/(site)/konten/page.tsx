import Breadcrumb from "@/components/Common/Breadcrumb";
import { getKontenForPublic } from "@/lib/services/supabase/konten";
import KontenListingClient from "@/components/konten/KontenListingClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konten & Informasi | Masjid Jawahiruzzarqa",
  description:
    "Artikel, pengumuman, dan informasi terbaru dari Masjid Jawahiruzzarqa.",
};

export const dynamic = "force-dynamic";

const KontenPage = async () => {
  try {
    const kontenData = await getKontenForPublic(20, 0); // Load 20 items initially

    return (
      <main>
        <Breadcrumb pageName="Konten & Informasi" />
        <section className="pb-[120px] pt-[120px]">
          <div className="container">
            <KontenListingClient initialData={kontenData} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error loading konten page:", error);
    return (
      <main>
        <Breadcrumb pageName="Konten & Informasi" />
        <section className="pb-[120px] pt-[120px]">
          <div className="container">
            <div className="text-center">
              <p className="dark:text-body-color-dark text-body-color">
                Maaf, terjadi kesalahan saat memuat konten.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default KontenPage;
