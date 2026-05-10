"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Client } from "../data/clients";

type TestimonialCardProps = {
  client: Client;
};

export default function TestimonialCard({ client }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F7] px-[5vw] py-[120px] dark:bg-[#111111]">
      <div ref={ref} className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px] px-6 py-16 md:px-12">
        <div
          className="absolute left-10 top-0 text-[120px] font-extrabold leading-none"
          style={{ color: client.accentColor, opacity: 0.15 }}
        >
          "
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="mx-auto max-w-[800px] text-center text-[clamp(22px,3vw,36px)] font-[200] leading-[1.4] tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
            {client.testimonial.quote}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-[18px] text-white"
              style={{ backgroundColor: client.accentColor }}
            >
              {client.testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#1D1D1F] dark:text-white">
                {client.testimonial.name}
              </p>
              <p className="text-[13px] text-[#86868B] dark:text-white/40">
                {client.testimonial.role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
