import Image from "next/image";
import type { Client } from "../../data/clients";

type PhotoGridProps = {
  client: Client;
};

function sectionClass(client: Client) {
  switch (client.slug) {
    case "noize":
      return "bg-[#0D0D0D] text-white";
    case "tattoo-collective":
      return "bg-[#111111] text-[#E8D5B7]";
    default:
      return "bg-white text-[#1D1D1F]";
  }
}

function mutedClass(client: Client) {
  switch (client.slug) {
    case "noize":
      return "text-white/76";
    case "tattoo-collective":
      return "text-[#E8D5B7]/76";
    default:
      return "text-[#475569]";
  }
}

export default function PhotoGrid({ client }: PhotoGridProps) {
  const imageA = client.images[0];
  const imageB = client.images[1] ?? client.images[0];
  const imageC = client.images[2] ?? client.images[0];
  const imageD = client.images[3] ?? client.images[1] ?? client.images[0];

  return (
    <section className={`${sectionClass(client)} px-[5vw] py-[120px]`}>
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${mutedClass(client)}`}>More Images</p>
          <h2 className="mt-4 text-[clamp(28px,4vw,52px)] font-[200] tracking-[-0.03em]">{client.photoGridLabel}</h2>
        </div>
        <p className={`max-w-xl text-[15px] leading-[1.7] ${mutedClass(client)}`}>{client.photoGridNote}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
            <Image src={imageA.src} alt={imageA.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
            <Image src={imageB.src} alt={imageB.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        <div className="space-y-6 pt-0 lg:pt-20">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
            <Image src={imageC.src} alt={imageC.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
            <Image src={imageD.src} alt={imageD.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
