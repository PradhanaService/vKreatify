"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../../data/clients";

type TestimonialQuoteProps = {
  client: Client;
};

function sectionTheme(client: Client) {
  switch (client.slug) {
    case "noize":
      return "bg-[#F5F5F7] text-[#1D1D1F]";
    case "tattoo-collective":
      return "bg-[#1A1A1A] text-white";
    default:
      return "bg-[#F5F5F7] text-[#1D1D1F] dark:bg-[#111111] dark:text-white";
  }
}

export default function TestimonialQuote({ client }: TestimonialQuoteProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const initial = client.testimonial.name.charAt(0);

  return (
    <section className={`${sectionTheme(client)} relative overflow-hidden px-[5vw] py-[120px]`}>
      <div className="pointer-events-none absolute left-10 top-0 text-[120px] font-[800] leading-none opacity-[0.15]" style={{ color: client.accentColor }}>
        "
      </div>

      <motion.div
        ref={ref}
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mx-auto max-w-4xl text-[clamp(22px,3vw,36px)] font-[200] leading-[1.4] tracking-[-0.02em]">
          {client.testimonial.quote}
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-[18px] font-[500] text-white"
            style={{ backgroundColor: client.accentColor }}
          >
            {initial}
          </div>
          <div className="text-left">
            <p className="text-[15px] font-[500]">{client.testimonial.name}</p>
            <p className="text-[13px] text-[#86868B] dark:text-white/40">{client.testimonial.role}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
