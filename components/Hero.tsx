"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useThemeContext } from "../context/ThemeContext";

const lightHeroImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop";
const darkHeroImage =
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80&auto=format&fit=crop";

export default function Hero() {
  const { theme } = useThemeContext();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end overflow-hidden bg-white px-5 pb-14 pt-28 dark:bg-black md:px-16 md:pb-20 md:pt-32 lg:px-24 xl:px-32"
    >
      <motion.img
        key={theme}
        src={theme === "dark" ? darkHeroImage : lightHeroImage}
        alt={
          theme === "dark"
            ? "Night sky background for the vKreatify hero section"
            : "Mountain landscape background for the vKreatify hero section"
        }
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ y: imageY }}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      <div
        className={`absolute inset-0 z-[1] ${
          theme === "dark"
            ? "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,1)_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.6)_60%,rgba(255,255,255,1)_100%)]"
        }`}
      />

      <div className="relative z-10 max-w-5xl">
        <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#86868B] dark:text-white/50">
          Strategic Design Studio
        </p>
        <h1 className="text-[clamp(48px,7vw,96px)] font-[200] leading-[1.05] tracking-[-0.03em] text-[#1D1D1F] dark:text-white">
          We build digital
          <br />
          experiences that
          <br />
          define categories.
        </h1>
        <p className="mt-6 max-w-[480px] text-[19px] font-[300] leading-8 text-[#6E6E73] dark:text-white/60">
          From bold startups to global brands. Design that moves people.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-[980px] bg-[#1D1D1F] px-7 py-3.5 text-[17px] text-white transition-transform duration-200 hover:scale-[1.02] dark:bg-white dark:text-[#1D1D1F]"
          >
            Start a Project
          </Link>
          <Link
            href="#hall-of-fame"
            className="group inline-flex items-center gap-2 text-[17px] text-[#0066CC] transition-colors duration-200 dark:text-white/80"
          >
            <span>See our work</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
