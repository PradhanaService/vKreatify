"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../data/clients";
import { Magnetic } from "./MotionPrimitives";

type HallOfFameCardProps = {
  client: Client;
};

export default function HallOfFameCard({ client }: HallOfFameCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const isLeftColumn = client.column === "left";
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], isLeftColumn ? [90, -40] : [140, -70]);
  const graphicRotate = useTransform(scrollYProgress, [0, 1], isLeftColumn ? [-7, 7] : [8, -8]);

  const updatePointer = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  useEffect(() => {
    const highlightedSlug = window.sessionStorage.getItem("vk-highlight-client");

    if (highlightedSlug === client.slug) {
      setIsHighlighted(true);
      window.sessionStorage.removeItem("vk-highlight-client");

      const timeout = window.setTimeout(() => {
        setIsHighlighted(false);
      }, 1100);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return undefined;
  }, [client.slug]);

  return (
    <motion.div
      initial={false}
      style={{ y: cardY }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.15, x: isLeftColumn ? -80 : 80, scale: 0.9 }}
      transition={{
        duration: 1,
        ease: "easeOut",
        delay: isLeftColumn ? 0 : 0.15,
      }}
      className="relative"
      ref={cardRef}
    >
      <motion.div
        animate={
          isHighlighted
            ? {
                scale: [1, 1.015, 1],
                boxShadow: [
                  "0 0 0 rgba(0,0,0,0)",
                  "0 0 0 1px rgba(0,0,0,0.12)",
                  "0 0 0 rgba(0,0,0,0)",
                ],
              }
            : { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
        }
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="rounded-[4px]"
      >
        <Magnetic strength={0.08}>
          <Link
            ref={ref}
            href={`/clients/${client.slug}`}
            prefetch={true}
            scroll={true}
            onMouseMove={updatePointer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group block cursor-pointer rounded-xl p-3 transition-colors duration-300 hover:bg-[#F5F5F7] dark:hover:bg-white/5"
          >
          <div className="overflow-hidden rounded-[4px]">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={isInView ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
              whileHover={{ scale: 1.04, rotateX: isHovering ? -2 : 0, rotateY: isHovering ? 2 : 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full overflow-hidden rounded-[4px]"
              style={{
                background: client.accentColor,
                aspectRatio: isLeftColumn ? "3 / 4" : "4 / 5",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-85"
                animate={{
                  background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.52), rgba(255,255,255,0.08) 22%, transparent 48%)`,
                }}
                transition={{ duration: 0.18 }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: isHovering ? 1 : 0.72 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.26), transparent 34%), repeating-linear-gradient(115deg, rgba(255,255,255,0.24) 0 1px, transparent 1px 24px)",
                }}
              />
              <motion.div
                style={{ rotate: graphicRotate }}
                animate={{ scale: isHovering ? 1.12 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
              >
                <div className="absolute inset-[14%] rounded-full border border-white/25" />
                <div className="absolute left-1/2 top-[-10%] h-[120%] w-px -translate-x-1/2 bg-white/22" />
                <div className="absolute left-[-10%] top-1/2 h-px w-[120%] -translate-y-1/2 bg-white/22" />
              </motion.div>
              <motion.div
                animate={{ x: isHovering ? "8%" : "0%", opacity: isHovering ? 0.9 : 0.5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-8 left-6 right-6 h-px bg-white/60"
              />
              <div className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-2">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/30 bg-white/20 px-[10px] py-[5px] text-[10px] uppercase tracking-[0.12em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.div
                style={{ y: mediaY }}
                className="absolute inset-[-8%] flex items-center justify-center text-center text-[clamp(40px,7vw,96px)] font-[800] uppercase leading-none tracking-[-0.06em] text-white/18"
              >
                {client.name}
              </motion.div>
              <motion.div
                animate={{ y: isHovering ? 0 : 18, opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 left-6 z-10 text-[11px] uppercase tracking-[0.18em] text-white"
              >
                Open case study
              </motion.div>
            </motion.div>
          </div>

          <h3 className="mt-4 text-[20px] font-normal tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
            {client.name}
          </h3>
          <p className="mt-[6px] max-w-[30ch] text-[13px] leading-[1.6] text-[#475569] dark:text-white/72">
            {client.description}
          </p>
          </Link>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
}
