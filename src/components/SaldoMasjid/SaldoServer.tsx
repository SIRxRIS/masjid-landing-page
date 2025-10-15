import { getTotalKotakAmalMasjid } from "@/lib/services/supabase/kotak-amal-masjid";
import { getDonasiKhususTahunan } from "@/lib/services/supabase/donasi-khusus";
import { getPengeluaranTahunan } from "@/lib/services/supabase/pengeluaran/pengeluaran";
import { getDonaturTahunan } from "@/lib/services/supabase/donatur";
import { getTotalKotakAmal } from "@/lib/services/supabase/kotak-amal";
import { getTotalPemasukanBySumber } from "@/lib/services/supabase/pemasukan/pemasukan";
import SaldoClient from "./SaldoClient";

const SaldoServer = async () => {
  try {
    const currentYear = new Date().getFullYear();
    
    // Fetch comprehensive financial data
    const [
      kotakAmalMasjidTotal,
      donasiKhususTotal,
      pengeluaranTotal,
      donaturTotal,
      kotakAmalLuarTotal,
      pemasukanBySumber
    ] = await Promise.all([
      getTotalKotakAmalMasjid(currentYear),
      getDonasiKhususTahunan(currentYear),
      getPengeluaranTahunan(currentYear),
      getDonaturTahunan(currentYear),
      getTotalKotakAmal(currentYear),
      getTotalPemasukanBySumber(currentYear)
    ]);

    // Calculate total pemasukan from all sources
    const totalPemasukan = kotakAmalMasjidTotal + donasiKhususTotal + donaturTotal + kotakAmalLuarTotal;
    
    // Calculate net saldo (pemasukan - pengeluaran)
    const totalSaldo = totalPemasukan - pengeluaranTotal;

    const saldoData = {
      totalSaldo,
      totalPemasukan,
      totalPengeluaran: pengeluaranTotal,
      kotakAmalMasjidTotal,
      donasiKhususTotal,
      donaturTotal,
      kotakAmalLuarTotal,
      pemasukanBySumber,
      currentYear
    };

    return <SaldoClient saldoData={saldoData} />;
  } catch (error) {
    console.error("Error fetching saldo data:", error);
    // Fallback to default data if there's an error
    const fallbackData = {
      totalSaldo: 0,
      totalPemasukan: 0,
      totalPengeluaran: 0,
      kotakAmalMasjidTotal: 0,
      donasiKhususTotal: 0,
      donaturTotal: 0,
      kotakAmalLuarTotal: 0,
      pemasukanBySumber: {},
      currentYear: new Date().getFullYear()
    };
    return <SaldoClient saldoData={fallbackData} />;
  }
};

export default SaldoServer;