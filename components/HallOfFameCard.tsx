"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../data/clients";

type HallOfFameCardProps = {
  client: Client;
};

export default function HallOfFameCard({ client }: HallOfFameCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const isLeftColumn = client.column === "left";

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
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: isLeftColumn ? 0 : 0.15,
      }}
      className="relative"
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
        <Link
          ref={ref}
          href={`/clients/${client.slug}`}
          prefetch={true}
          scroll={true}
          className="group block cursor-pointer rounded-xl p-3 transition-colors duration-300 hover:bg-[#F5F5F7] dark:hover:bg-white/5"
        >
          <div className="overflow-hidden rounded-[4px]">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full overflow-hidden rounded-[4px]"
              style={{
                background: client.accentColor,
                aspectRatio: isLeftColumn ? "3 / 4" : "4 / 5",
              }}
            >
              <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-2">
                {client.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-black/10 bg-black/5 px-[10px] py-[5px] text-[10px] uppercase tracking-[0.12em] text-[#1D1D1F] backdrop-blur-[8px] dark:border-white/20 dark:bg-white/15 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-center text-xl font-normal tracking-[-0.03em] text-white/10">
                {client.name}
              </div>
            </motion.div>
          </div>

          <h3 className="mt-4 text-[20px] font-normal tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
            {client.name}
          </h3>
          <p className="mt-[6px] max-w-[30ch] text-[13px] leading-[1.6] text-[#86868B] dark:text-white/45">
            {client.description}
          </p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
