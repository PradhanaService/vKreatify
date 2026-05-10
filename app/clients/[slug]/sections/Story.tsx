import type { Client } from "../../../../data/clients";

type StoryProps = {
  client: Client;
};

export default function Story({ client }: StoryProps) {
  return (
    <section className="bg-[#FFFFFF] px-[5vw] py-[120px] dark:bg-black">
      <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[#AEAEB2] dark:text-white/35">
            01 - The Brief
          </p>
          <p className="text-[17px] font-[300] leading-[1.8] text-[#6E6E73] dark:text-white/60">
            {client.brief}
          </p>
        </div>

        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[#AEAEB2] dark:text-white/35">
            02 - What We Built
          </p>
          <div>
            {client.services.map((service) => (
              <div
                key={service}
                className="border-b border-black/5 py-3 text-[15px] text-[#1D1D1F] transition-all duration-200 hover:bg-[#F5F5F7] hover:pl-2 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[#AEAEB2] dark:text-white/35">
            03 - The Impact
          </p>
          <p
            className="text-[72px] font-[200] leading-none tracking-[-0.03em]"
            style={{ color: client.accentColor }}
          >
            {client.stat}
          </p>
          <p className="mt-3 text-[13px] text-[#86868B] dark:text-white/45">{client.statLabel}</p>
          <div className="mt-8 inline-flex rounded-full border border-black/10 bg-black/[0.04] px-[14px] py-[6px] text-[12px] text-[#86868B] dark:border-white/10 dark:bg-white/5 dark:text-white/45">
            {client.year}
          </div>
        </div>
      </div>
    </section>
  );
}
