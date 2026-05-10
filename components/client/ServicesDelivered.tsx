"use client";

import { motion } from "framer-motion";
import type { Client } from "../../data/clients";
import { Magnetic, Reveal, StaggerChildren } from "../MotionPrimitives";

type ServicesDeliveredProps = {
  client: Client;
};

export default function ServicesDelivered({ client }: ServicesDeliveredProps) {
  return (
    <section className="bg-[#F7FAFF] px-[5vw] py-[130px] text-[#1D1D1F]">
      <Reveal>
        <p className="mb-12 text-[10px] uppercase tracking-[0.2em] text-[#0066CC]">What We Built</p>
      </Reveal>

      <StaggerChildren className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {client.servicesDetailed.map((service) => (
          <Magnetic key={service.number} strength={0.08}>
            <motion.div
              whileHover={{ y: -14, scale: 1.03 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[10px] border border-black/10 bg-white p-7 shadow-[0_18px_55px_rgba(0,40,90,0.08)]"
            >
            <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full opacity-20 blur-2xl" style={{ backgroundColor: client.accentColor }} />
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[11px] font-medium text-[#64748B]">{service.number}</span>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-[500] text-white"
                style={{ backgroundColor: client.accentColor }}
              >
                {service.icon}
              </span>
            </div>
            <h3 className="text-[20px] font-[400] tracking-[-0.02em]">{service.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-[#475569]">{service.description}</p>
            </motion.div>
          </Magnetic>
        ))}
      </StaggerChildren>
    </section>
  );
}
