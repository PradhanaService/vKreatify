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
      <motion.div
        aria-hidden="true"
        initial={{ x: "-120%", opacity: 0 }}
        whileInView={{ x: "120%", opacity: [0, 0.45, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-y-0 left-0 z-10 w-1/3 skew-x-[-14deg] bg-white/20 blur-[1px]"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${client.accentColor}B3, transparent)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-6 z-10 max-w-3xl text-white md:bottom-16 md:left-12"
      >
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/70">{client.fullBleed.label}</p>
        <p className="text-[clamp(28px,3vw,32px)] font-[200] leading-[1.2] tracking-[-0.02em]">
          "{client.fullBleed.quote}"
        </p>
      </motion.div>
    </section>
  );
}
