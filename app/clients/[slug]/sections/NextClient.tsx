import Link from "next/link";
import type { Client } from "../../../../data/clients";

type NextClientProps = {
  client: Client;
};

export default function NextClient({ client }: NextClientProps) {
  return (
    <Link
      href={`/clients/${client.slug}`}
      className="group relative flex h-[280px] items-center overflow-hidden bg-[#F5F5F7] px-[5vw] dark:bg-[#111111]"
    >
      <div
        className="absolute left-0 top-0 h-full w-0 transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"
        style={{ backgroundColor: client.accentColor }}
      />

      <div className="relative z-10 flex w-full items-center justify-between gap-10">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#AEAEB2] transition-colors duration-300 group-hover:text-white/70 dark:text-white/35">
            Next Project
          </p>
          <h2 className="text-[clamp(32px,5vw,72px)] font-[200] tracking-[-0.03em] text-[#1D1D1F] transition-colors duration-300 group-hover:text-white dark:text-white">
            {client.name}
          </h2>
        </div>

        <div className="text-[48px] text-[#C7C7CC] transition-all duration-300 group-hover:translate-x-2 group-hover:text-white dark:text-white/25">
          &rarr;
        </div>
      </div>
    </Link>
  );
}
