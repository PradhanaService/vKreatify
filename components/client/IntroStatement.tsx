"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../../data/clients";

type IntroStatementProps = {
  client: Client;
};

function getIntroTheme(client: Client) {
  switch (client.slug) {
    case "noize":
      return {
        section: "bg-[#0D0D0D] text-white",
        muted: "text-white/70",
      };
    case "tattoo-collective":
      return {
        section: "bg-[#1C1C1C] text-[#E8D5B7]",
        muted: "text-[#E8D5B7]/72",
      };
    case "company-one":
      return {
        section: "bg-[#F0F4FF] text-[#050A1A]",
        muted: "text-[#050A1A]/68",
      };
    case "company-two":
      return {
        section: "bg-[#F8F4EE] text-[#1A3D2B]",
        muted: "text-[#1A3D2B]/68",
      };
    case "company-three":
      return {
        section: "bg-[#F5F3FF] text-[#24154F]",
        muted: "text-[#24154F]/68",
      };
    case "company-four":
      return {
        section: "bg-[#FFF8F5] text-[#1A1A2E]",
        muted: "text-[#1A1A2E]/68",
      };
    default:
      return {
        section: "bg-white text-[#1D1D1F]",
        muted: "text-[#475569]",
      };
  }
}

export default function IntroStatement({ client }: IntroStatementProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const words = client.introStatement.split(" ");
  const theme = getIntroTheme(client);

  return (
    <section className={`relative overflow-hidden ${theme.section} px-[5vw] py-[140px]`}>
      <div
        className="absolute right-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full opacity-25 blur-[72px]"
        style={{ backgroundColor: client.accentColor }}
      />
      <div ref={ref} className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-end">
        <div className="max-w-5xl text-[clamp(36px,5vw,72px)] font-[200] leading-[1.12] tracking-[-0.03em]">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0.08, y: 68, filter: "blur(12px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0.08, y: 68, filter: "blur(12px)" }}
              transition={{ duration: 0.7, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.78, y: 60 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.78, y: 60 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="xl:pb-2"
        >
          <div className="text-[clamp(72px,8vw,96px)] font-[200] leading-none tracking-[-0.05em]" style={{ color: client.accentColor }}>
            {client.introStat.value}
          </div>
          <p className={`mt-4 text-[12px] uppercase tracking-[0.1em] ${theme.muted}`}>
            {client.introStat.label}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
