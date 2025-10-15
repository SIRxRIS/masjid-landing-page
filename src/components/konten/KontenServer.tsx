import { getKontenBeranda } from "@/lib/services/supabase/konten";
import KontenClient from "./KontenClient";

const KontenServer = async () => {
  try {
    const kontenData = await getKontenBeranda();
    return <KontenClient kontenData={kontenData} />;
  } catch (error) {
    console.error("Error fetching konten data:", error);
    // Fallback to empty data if there's an error
    return <KontenClient kontenData={[]} />;
  }
};

export default KontenServer;