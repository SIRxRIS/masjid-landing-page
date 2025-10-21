// src/app/(site)/program-kerja/page.tsx

import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import ProgramKerja from "@/components/ProgramKerja";
import {
  getProgramKerjaData,
  ProgramKerjaData,
} from "@/lib/services/supabase/program-kerja";

export const metadata: Metadata = {
  title: "Program Kerja | Masjid Jawahiruzzarqa",
  description:
    "Program kerja Masjid Jawahiruzzarqa untuk Pengurus Masjid, Remaja Masjid (Remas), dan Majlis Ta'lim. Berbagai program kegiatan untuk kemajuan umat dan masyarakat.",
  keywords:
    "program kerja masjid, Masjid Jawahiruzzarqa, program masjid, kegiatan masjid, remas, majlis talim, program dakwah, program pendidikan Islam",
  openGraph: {
    title: "Program Kerja | Masjid Jawahiruzzarqa",
    description:
      "Program kerja Masjid Jawahiruzzarqa untuk Pengurus Masjid, Remaja Masjid (Remas), dan Majlis Ta'lim.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const ProgramKerjaPage = async () => {
  let initialData: ProgramKerjaData[] = [];

  try {
    const result = await getProgramKerjaData();
    if (result.data) {
      // Filter only active items for public display
      initialData = result.data.filter(item => item.isActive);
    }
  } catch (error) {
    console.error("Error fetching program kerja data:", error);
    // Component will handle the error state and fetch client-side
  }

  return (
    <>
      <Breadcrumb
        pageName="Program Kerja"
        pageDescription="Program kerja Masjid Jawahiruzzarqa untuk Pengurus Masjid, Remaja Masjid (Remas), dan Majlis Ta'lim. Berbagai program kegiatan untuk kemajuan umat dan masyarakat."
      />
      <ProgramKerja initialData={initialData} />
    </>
  );
};

export default ProgramKerjaPage;