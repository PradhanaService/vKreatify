import type { Client } from "../../data/clients";

type BriefSectionProps = {
  client: Client;
};

export default function BriefSection({ client }: BriefSectionProps) {
  return (
    <section className="bg-white px-[5vw] py-[120px] text-[#1D1D1F]">
      <div className="grid gap-14 lg:grid-cols-[40%_55%] lg:justify-between">
        <div>
          <p className="mb-8 text-[10px] uppercase tracking-[0.2em] text-[#86868B]">The Brief</p>
          <h2 className="max-w-[580px] text-[clamp(28px,3.5vw,48px)] font-[300] leading-[1.3] tracking-[-0.02em]">
            {client.briefHeading}
          </h2>
        </div>

        <div>
          {client.briefParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-6 text-[17px] font-[300] leading-[1.8] text-[#6E6E73] last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
