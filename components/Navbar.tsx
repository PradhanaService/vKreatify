"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { Magnetic } from "./MotionPrimitives";

const navItems = [
  { label: "Hall of Fame", href: "#hall-of-fame", id: "hall-of-fame" },
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { theme } = useThemeContext();
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setVisible(true);
        setAtTop(true);
        setLastScrollY(currentScrollY);
        return;
      }

      setAtTop(false);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      }

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 ${
          atTop
            ? "bg-transparent border-transparent backdrop-blur-0 shadow-none"
            : "bg-white/90 border-b border-black/10 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-black/75"
        }`}
      >
        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-8 lg:px-12">
          <Link
            href="/"
            aria-label="vKreatify homepage"
            className="text-[16px] font-semibold text-[#1D1D1F] dark:text-white"
          >
            <span className="hidden md:inline">vKreatify</span>
            <span className="md:hidden">vK</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-[15px] transition-colors duration-200 ${
                    isActive
                      ? "font-medium text-[#1D1D1F] dark:text-white"
                      : "font-normal text-[#1D1D1F] hover:text-[#6E6E73] dark:text-white/90 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mr-6 flex items-center lg:mr-10">
            <Magnetic className="mr-[96px] hidden md:block lg:mr-[104px]" strength={0.18}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-[980px] bg-[#1D1D1F] px-5 py-2 text-[14px] font-medium tracking-[-0.01em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-[#3D3D3F] dark:bg-white dark:text-[#1D1D1F] dark:shadow-[0_6px_18px_rgba(255,255,255,0.08)] dark:hover:bg-[#F5F5F7]"
              >
                <span className="inline-flex items-center gap-[6px] text-[10px] text-white dark:text-[#1D1D1F]">
                  ✦
                </span>
                <span>Start Project &rarr;</span>
              </Link>
              </motion.div>
            </Magnetic>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center bg-transparent md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="flex flex-col gap-[5px]">
                <span className={`block h-px w-[18px] ${isDark ? "bg-white" : "bg-[#1D1D1F]"}`} />
                <span className={`block h-px w-[18px] ${isDark ? "bg-white" : "bg-[#1D1D1F]"}`} />
                <span className={`block h-px w-[18px] ${isDark ? "bg-white" : "bg-[#1D1D1F]"}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[110] flex justify-center bg-white transition-all duration-300 dark:bg-black ${
          isMenuOpen ? "visible translate-y-0 opacity-1 pointer-events-auto" : "invisible -translate-y-6 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="absolute right-5 top-5 bg-transparent text-[38px] font-light leading-none text-[#1D1D1F] dark:text-white"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          &times;
        </button>

        <div className="flex flex-col items-center justify-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-[32px] tracking-[-0.03em] transition-colors duration-200 ${
                activeSection === item.id
                  ? "font-medium text-[#1D1D1F] dark:text-white"
                  : "font-normal text-[#1D1D1F] hover:text-[#6E6E73] dark:text-white/90 dark:hover:text-white"
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-3">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[980px] bg-[#1D1D1F] px-5 py-2 text-[14px] font-medium tracking-[-0.01em] text-white transition-all duration-200 hover:bg-[#3D3D3F] dark:bg-white dark:text-[#1D1D1F] dark:hover:bg-[#F5F5F7]"
              onClick={closeMenu}
            >
              <span className="inline-flex items-center gap-[6px] text-[10px] text-white dark:text-[#1D1D1F]">
                ✦
              </span>
              <span>Start Project &rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
