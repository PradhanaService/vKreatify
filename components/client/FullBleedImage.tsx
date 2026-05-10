"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Client } from "../../data/clients";

type FullBleedImageProps = {
  client: Client;
};

export default function FullBleedImage({ client }: FullBleedImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const image = client.images[client.fullBleed.imageIndex] ?? client.images[0];

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${client.accentColor}B3, transparent)`,
        }}
      />
      <div className="absolute bottom-12 left-6 z-10 max-w-3xl text-white md:bottom-16 md:left-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/65">{client.fullBleed.label}</p>
        <p className="text-[clamp(28px,3vw,32px)] font-[200] leading-[1.2] tracking-[-0.02em]">
          "{client.fullBleed.quote}"
        </p>
      </div>
    </section>
  );
}
