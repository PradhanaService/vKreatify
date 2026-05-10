"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";

type ClientNavProps = {
  clientName: string;
  clientSlug: string;
};

export default function ClientNav({ clientName, clientSlug }: ClientNavProps) {
  const { theme } = useThemeContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed left-0 right-0 top-0 z-[120] transition-all duration-300 ${
        isScrolled
          ? isDark
            ? "bg-black/70 backdrop-blur-xl"
            : "bg-white/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-[60px] items-center justify-between px-5 md:px-16 lg:px-24 xl:px-32">
        <Link
          href="/#hall-of-fame"
          onClick={() => {
            window.sessionStorage.setItem("vk-highlight-client", clientSlug);
          }}
          className={`inline-flex items-center gap-3 rounded-[980px] px-4 py-2 text-[14px] backdrop-blur-xl transition-colors duration-200 ${
            isDark
              ? "border border-white/15 bg-black/55 text-white hover:bg-white/10"
              : "border border-black/10 bg-white/85 text-[#1D1D1F] hover:bg-[#F5F5F7]"
          }`}
        >
          <span>&larr;</span>
          <span>All Work</span>
        </Link>

        <p className={`text-[12px] uppercase tracking-[0.18em] ${isDark ? "text-white/55" : "text-[#1D1D1F]/55"}`}>
          {clientName}
        </p>
      </div>
    </motion.div>
  );
}
