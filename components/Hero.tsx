"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { AnimatedStripes, Magnetic, ParallaxLayer, SplitReveal, WebGLDistortionField } from "./MotionPrimitives";

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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

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
        className="absolute inset-0 z-0 h-[112%] w-full scale-105 object-cover object-center"
      />

      <WebGLDistortionField className="z-[1] mix-blend-screen opacity-65 dark:opacity-90" />

      <div
        className={`absolute inset-0 z-[2] ${
          theme === "dark"
            ? "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.5)_60%,rgba(0,0,0,1)_100%)]"
            : "bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(238,247,255,0.54)_42%,rgba(255,255,255,0.92)_100%)]"
        }`}
      />

      <div className="absolute left-[-10%] top-[12%] z-[3] h-[34vw] max-h-[520px] min-h-[280px] w-[34vw] min-w-[280px] rounded-full bg-[#00A3FF]/22 blur-[72px] dark:bg-[#0066CC]/18" />
      <div className="absolute right-[-8%] top-[26%] z-[3] h-[30vw] max-h-[460px] min-h-[260px] w-[30vw] min-w-[260px] rounded-full bg-[#FF7A1A]/18 blur-[78px] dark:bg-[#6B4EFF]/20" />
      <div className="absolute bottom-[4%] left-[32%] z-[3] h-[18vw] max-h-[300px] min-h-[180px] w-[28vw] min-w-[280px] rounded-full bg-[#00C48C]/14 blur-[64px] dark:bg-[#00D4AA]/12" />

      <AnimatedStripes className="absolute bottom-[8%] left-0 right-0 z-[4] h-[220px] text-[#0066CC]/45 dark:text-white/20" />

      <motion.div className="relative z-10 max-w-5xl" style={{ y: contentY, opacity: contentOpacity }}>
        <ParallaxLayer distance={34}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#475569] dark:text-white/72"
          >
          Strategic Design Studio
          </motion.p>
        </ParallaxLayer>
        <SplitReveal
          as="h1"
          className="max-w-[12ch] text-[clamp(48px,7vw,96px)] font-[200] leading-[1.05] tracking-[-0.03em] text-[#1D1D1F] dark:text-white"
        >
          We build digital experiences that define categories.
        </SplitReveal>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[480px] text-[19px] font-[300] leading-8 text-[#374151] dark:text-white/78"
        >
          From bold startups to global brands. Design that moves people.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic className="inline-flex">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-[980px] bg-[#1D1D1F] px-7 py-3.5 text-[17px] text-white transition-transform duration-200 hover:scale-[1.02] dark:bg-white dark:text-[#1D1D1F]"
            >
              Start a Project
            </Link>
          </Magnetic>
          <Magnetic className="inline-flex" strength={0.18}>
            <Link
              href="#hall-of-fame"
              className="group inline-flex items-center gap-2 text-[17px] text-[#0066CC] transition-colors duration-200 dark:text-white/80"
            >
              <span>See our work</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
