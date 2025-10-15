import About from "@/components/About";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import SaldoServer from "@/components/SaldoMasjid/SaldoServer";
import KontenServer from "@/components/konten/KontenServer";
import PengurusServer from "@/components/PengurusMasjid/PengurusServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masjid Jawahiruzzarqa",
  description:
    "Selamat datang di Masjid Jawahiruzzarqa - Masjid yang menyediakan fasilitas, TPQ, dan kegiatan komunitas untuk umat Muslim. Bergabunglah dengan kami dalam menjalankan ibadah, kajian agama, dan membangun persaudaraan yang kuat dalam iman.",
};

export default function Home() {
  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <SaldoServer />
      <KontenServer />
      <PengurusServer />
      <Contact />
    </main>
  );
}
