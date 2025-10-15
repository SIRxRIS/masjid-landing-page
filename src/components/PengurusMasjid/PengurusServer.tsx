import { getPengurusData } from "@/lib/services/supabase/pengurus";
import PengurusClient from "./PengurusClient";

const PengurusServer = async () => {
  try {
    const { data: pengurusData, error } = await getPengurusData();
    
    if (error) {
      console.error("Error fetching pengurus data:", error);
      return <PengurusClient pengurusData={[]} />;
    }

    return <PengurusClient pengurusData={pengurusData || []} />;
  } catch (error) {
    console.error("Error fetching pengurus data:", error);
    // Fallback to empty data if there's an error
    return <PengurusClient pengurusData={[]} />;
  }
};

export default PengurusServer;