"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Client } from "../../data/clients";
import { Magnetic } from "../MotionPrimitives";

type NextClientBlockProps = {
  client: Client;
};

export default function NextClientBlock({ client }: NextClientBlockProps) {
  return (
    <Magnetic strength={0.06}>
      <Link
        href={`/clients/${client.slug}`}
        prefetch={true}
        scroll={true}
        className="group relative flex h-[320px] items-center overflow-hidden bg-[#111111] px-[5vw] text-white"
    >
      <div
        className="absolute left-0 top-0 h-full w-0 transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"
        style={{ backgroundColor: client.accentColor }}
      />
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{ x: ["-10%", "10%"] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          background:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 32px)",
        }}
      />

      <div className="relative z-10 flex w-full items-center justify-between gap-10">
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 group-hover:text-white">
            Next Project
          </p>
          <h2 className="text-[clamp(32px,5vw,72px)] font-[200] tracking-[-0.03em] transition-colors duration-300 group-hover:text-white">
            {client.name}
          </h2>
        </div>

        <div className="text-[48px] text-white/70 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
          &rarr;
        </div>
      </div>
      </Link>
    </Magnetic>
  );
}
