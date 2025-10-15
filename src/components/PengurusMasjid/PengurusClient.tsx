import Image from "next/image";
import { PengurusData } from "@/lib/schema/pengurus/schema";

interface PengurusClientProps {
  pengurusData: PengurusData[];
}

const PengurusClient = ({ pengurusData }: PengurusClientProps) => {
  return (
    <section id="pengurus" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
                Pengurus Masjid Jawahiruzzarqa
              </h2>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Tim pengurus yang berdedikasi untuk melayani jamaah dan memakmurkan masjid 
                dengan penuh amanah dan tanggung jawab.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pengurusData.length > 0 ? (
            pengurusData.map((pengurus) => (
              <div key={pengurus.id} className="w-full px-4 md:w-1/2 lg:w-1/4">
                <div className="mb-10 w-full">
                  <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark">
                    {/* Photo */}
                    <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={pengurus.fotoUrl || "/images/team/team-01.jpg"}
                        alt={pengurus.nama}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="text-center">
                      <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                        {pengurus.nama}
                      </h3>
                      <p className="mb-3 text-sm font-medium text-primary">
                        {pengurus.jabatan}
                      </p>
                      <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">
                        Periode: {pengurus.periode}
                      </p>
                    </div>

                    {/* Contact Button */}
                    <div className="text-center">
                      <button className="inline-flex items-center justify-center rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Hubungi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full px-4">
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Data pengurus belum tersedia.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PengurusClient;