"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../../data/clients";
import { SplitReveal } from "../MotionPrimitives";

type ProcessStepsProps = {
  client: Client;
};

function getProcessTheme(client: Client) {
  switch (client.slug) {
    case "noize":
      return {
        section: "bg-[#0D0D0D] text-white",
        border: "border-white/20",
        number: "text-white/60",
        body: "text-white/80",
      };
    case "tattoo-collective":
      return {
        section: "bg-[#1C1C1C] text-[#E8D5B7]",
        border: "border-[#E8D5B7]/24",
        number: "text-[#E8D5B7]/68",
        body: "text-[#E8D5B7]/84",
      };
    default:
      return {
        section: "bg-[#0D0D0D] text-white",
        border: "border-white/20",
        number: "text-white/60",
        body: "text-white/80",
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
        <SplitReveal as="h2" className="mb-20 text-[clamp(40px,5vw,72px)] font-[200] tracking-[-0.03em]">
          {client.processHeading}
        </SplitReveal>

        <div>
          {client.process.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120, scale: 0.94, filter: "blur(12px)" }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, x: index % 2 === 0 ? -120 : 120, scale: 0.94, filter: "blur(12px)" }
              }
              whileHover={{ x: 18, backgroundColor: "rgba(255,255,255,0.08)" }}
              transition={{ duration: 0.85, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className={`grid gap-5 border-t px-3 py-10 md:grid-cols-[100px_1fr] lg:grid-cols-[100px_1fr_400px] lg:items-start ${theme.border}`}
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
