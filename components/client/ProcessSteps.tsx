"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../../data/clients";

type ProcessStepsProps = {
  client: Client;
};

function getProcessTheme(client: Client) {
  switch (client.slug) {
    case "noize":
      return {
        section: "bg-[#0D0D0D] text-white",
        border: "border-white/10",
        number: "text-white/25",
        body: "text-white/52",
      };
    case "tattoo-collective":
      return {
        section: "bg-[#1C1C1C] text-[#E8D5B7]",
        border: "border-[#E8D5B7]/12",
        number: "text-[#E8D5B7]/28",
        body: "text-[#E8D5B7]/52",
      };
    default:
      return {
        section: "bg-[#0D0D0D] text-white",
        border: "border-white/10",
        number: "text-white/25",
        body: "text-white/52",
      };
  }
}

export default function ProcessSteps({ client }: ProcessStepsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const theme = getProcessTheme(client);

  return (
    <section className={`${theme.section} px-[5vw] py-[120px]`}>
      <div ref={ref}>
        <h2 className="mb-20 text-[clamp(40px,5vw,72px)] font-[200] tracking-[-0.03em]">
          {client.processHeading}
        </h2>

        <div>
          {client.process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={false}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`grid gap-5 border-t py-10 md:grid-cols-[100px_1fr] lg:grid-cols-[100px_1fr_400px] lg:items-start ${theme.border}`}
            >
              <div className={`text-[11px] tracking-[0.1em] ${theme.number}`}>{step.number}</div>
              <div className="text-[24px] font-[300] tracking-[-0.02em]">{step.title}</div>
              <div className={`max-w-[400px] text-[15px] leading-[1.7] ${theme.body}`}>{step.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
