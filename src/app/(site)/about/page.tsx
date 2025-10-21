import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Masjid Jawahiruzzarqa",
  description: "Pelajari lebih lanjut tentang sejarah, visi misi, dan pengurus Masjid Jawahiruzzarqa.",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Tentang Kami" />
      <About />
    </main>
  );
};

export default AboutPage;
