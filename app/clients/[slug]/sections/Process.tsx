"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../../../../data/clients";

type ProcessProps = {
  client: Client;
};

export default function Process({ client }: ProcessProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#FFFFFF] px-[5vw] py-[120px] dark:bg-black">
      <div ref={ref}>
        <h2 className="mb-20 text-[clamp(36px,5vw,64px)] font-[200] tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
          How we did it.
        </h2>

        <div>
          {client.process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              className="grid border-t border-black/5 py-8 dark:border-white/10 md:grid-cols-[80px_1fr] md:gap-8 lg:grid-cols-[80px_1fr_320px] lg:items-start"
            >
              <div className="text-[11px] tracking-[0.1em] text-[#AEAEB2] dark:text-white/40">
                {step.number}
              </div>
              <div className="mt-3 text-[22px] font-[300] text-[#1D1D1F] dark:text-white md:mt-0">
                {step.title}
              </div>
              <div className="mt-4 max-w-[300px] text-[14px] leading-[1.7] text-[#86868B] dark:text-white/50 lg:mt-0">
                {step.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
