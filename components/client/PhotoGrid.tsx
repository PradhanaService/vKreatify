import { motion } from "framer-motion";
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
      return "text-white/75";
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
      <motion.div
        initial={{ opacity: 0, y: 46, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className={`text-[10px] uppercase tracking-[0.2em] ${mutedClass(client)}`}>More Images</p>
          <h2 className="mt-4 text-[clamp(28px,4vw,52px)] font-[200] tracking-[-0.03em]">{client.photoGridLabel}</h2>
        </div>
        <p className={`max-w-xl text-[15px] leading-[1.7] ${mutedClass(client)}`}>{client.photoGridNote}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            whileHover={{ scale: 0.985 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[8px]"
          >
            <Image src={imageA.src} alt={imageA.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            whileHover={{ scale: 0.985 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] overflow-hidden rounded-[8px]"
          >
            <Image src={imageB.src} alt={imageB.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
        </div>
        <div className="space-y-6 pt-0 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            whileHover={{ scale: 0.985 }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] overflow-hidden rounded-[8px]"
          >
            <Image src={imageC.src} alt={imageC.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            whileHover={{ scale: 0.985 }}
            transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[8px]"
          >
            <Image src={imageD.src} alt={imageD.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
