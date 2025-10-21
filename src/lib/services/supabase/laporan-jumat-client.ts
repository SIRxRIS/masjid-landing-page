// src/lib/services/supabase/laporan-jumat-client.ts
import { supabaseAdmin } from "@/lib/supabase/admin";

export interface LaporanJumatMetadata {
  id?: string;
  tanggal: string;
  judul: string;
  file_name: string;
  file_path: string;
  file_size: number;
  uploaded_at?: string;
  uploaded_by?: string;
  is_public: boolean;
  saldo_kas_awal: number;
  total_pemasukan: number;
  total_pengeluaran: number;
  saldo_kas_akhir: number;
  khatib?: string;
  muadzdzin?: string;
  imam?: string;
  ketua_pengurus?: string;
  bendahara?: string;
}

/**
 * Get all public laporan Jumat for landing page
 * FIXED: Menggunakan supabaseAdmin karena dipanggil dari Server Component
 */
export async function getPublicLaporanJumat(
  limit: number = 10,
  offset: number = 0,
): Promise<{
  success: boolean;
  data?: (LaporanJumatMetadata & { public_url: string })[];
  error?: string;
}> {
  try {
    // ✅ GANTI: createClient() → supabaseAdmin
    const supabase = supabaseAdmin;

    const { data, error } = await supabase
      .from("laporan_jumat_files")
      .select("*")
      .eq("is_public", true)
      .order("tanggal", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Fetch error:", error);
      return { success: false, error: error.message };
    }

    // Add public URLs
    const reportsWithUrls = data.map((report) => ({
      ...report,
      public_url: supabase.storage
        .from("reports")
        .getPublicUrl(report.file_path).data.publicUrl,
    }));

    return { success: true, data: reportsWithUrls };
  } catch (error) {
    console.error("Get public laporan error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan tidak dikenal",
    };
  }
}
