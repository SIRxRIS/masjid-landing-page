import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami | Masjid Jawahiruzzarqa",
  description: "Hubungi Masjid Jawahiruzzarqa untuk informasi kegiatan, kajian, dan layanan masjid lainnya.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Kontak Kami" />

      <Contact />
    </>
  );
};

export default ContactPage;
