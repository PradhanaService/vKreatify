"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Client } from "../../../../data/clients";

type VisualProps = {
  client: Client;
};

export default function Visual({ client }: VisualProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const visualImage = client.images[1] ?? client.images[0];

  return (
    <section className="border-y border-black/5 bg-[#F5F5F7] px-[5vw] py-[120px] dark:border-white/10 dark:bg-[#111111]">
      <div ref={ref} className="relative mx-auto max-w-[1700px]">
        <div className="mb-8 flex items-end justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#AEAEB2] dark:text-white/40">
              04 - Full Bleed Visual
            </p>
            <h2 className="mt-4 text-[clamp(32px,5vw,56px)] font-[200] tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
              One image that carries the whole atmosphere.
            </h2>
          </div>
        </div>

        <div className="relative h-[80vh] overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-[#1A1A1A]">
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <Image
              src={visualImage.src}
              alt={visualImage.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.06),rgba(0,0,0,0.18))] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.34))]" />

          <div className="absolute right-6 top-6 z-10 flex flex-wrap justify-end gap-2">
            {client.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/20 px-3 py-[5px] text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-xl"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Project Visual</p>
              <h3 className="mt-5 text-[clamp(48px,8vw,110px)] font-[800] tracking-[-0.05em] text-white/10">
                {client.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
