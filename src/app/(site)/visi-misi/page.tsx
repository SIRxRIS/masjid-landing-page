import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import VisiMisi from "@/components/VisiMisi";
import {
  getVisiMisiData,
  VisiMisiData,
} from "@/lib/services/supabase/visi-misi";

export const metadata: Metadata = {
  title: "Visi & Misi | Masjid Jawahiruzzarqa",
  description:
    "Visi dan misi Masjid Jawahiruzzarqa dalam melayani umat dan mengembangkan dakwah Islam di masyarakat. Komitmen kami untuk menjadi pusat ibadah dan pendidikan Islam yang berkualitas.",
  keywords:
    "visi misi masjid, Masjid Jawahiruzzarqa, visi masjid, misi masjid, tujuan masjid, komitmen masjid, dakwah Islam, pendidikan Islam",
  openGraph: {
    title: "Visi & Misi | Masjid Jawahiruzzarqa",
    description:
      "Visi dan misi Masjid Jawahiruzzarqa dalam melayani umat dan mengembangkan dakwah Islam di masyarakat.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

const VisiMisiPage = async () => {
  let initialData: VisiMisiData[] = [];

  try {
    const result = await getVisiMisiData();
    if (result.data) {
      initialData = result.data;
    }
  } catch (error) {
    console.error("Error fetching visi misi data:", error);
    // Component will handle the error state and fetch client-side
  }

  return (
    <>
      <Breadcrumb
        pageName="Visi & Misi"
        pageDescription="Visi dan misi Masjid Jawahiruzzarqa dalam melayani umat dan mengembangkan dakwah Islam di masyarakat. Komitmen kami untuk menjadi pusat ibadah dan pendidikan Islam yang berkualitas."
      />
      <VisiMisi initialData={initialData} />
    </>
  );
};

export default VisiMisiPage;
