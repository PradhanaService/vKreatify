"use client";

import { motion } from "framer-motion";
import type { Client } from "../../data/clients";
import { Reveal, SplitReveal } from "../MotionPrimitives";

type BriefSectionProps = {
  client: Client;
};

export default function BriefSection({ client }: BriefSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white px-[5vw] py-[140px] text-[#1D1D1F]">
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-full"
        style={{ backgroundColor: client.accentColor }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="grid gap-14 lg:grid-cols-[40%_55%] lg:justify-between">
        <Reveal>
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#475569]">The Brief</p>
          <SplitReveal as="h2" className="max-w-[580px] text-[clamp(28px,3.5vw,48px)] font-[300] leading-[1.3] tracking-[-0.02em]">
            {client.briefHeading}
          </SplitReveal>
        </Reveal>

        <div className="space-y-6">
          {client.briefParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.1}>
              <p className="text-[17px] font-[300] leading-[1.8] text-[#374151]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
