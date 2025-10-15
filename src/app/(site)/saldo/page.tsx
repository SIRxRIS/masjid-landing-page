import Breadcrumb from "@/components/Common/Breadcrumb";
import SaldoServer from "@/components/SaldoMasjid/SaldoServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saldo Masjid | Masjid Jawahiruzzarqa",
  description:
    "Transparansi keuangan Masjid Jawahiruzzarqa - laporan pemasukan, pengeluaran, dan saldo terkini.",
};

export const dynamic = "force-dynamic";

const SaldoPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Saldo Masjid" />
      <SaldoServer />
    </main>
  );
};

export default SaldoPage;
