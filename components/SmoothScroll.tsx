"use client";

import Lenis from "lenis";
import { useAnimationFrame } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (!lenis) {
      return;
    }

    const jumpToTop = () => {
      lenis.scrollTo(0, {
        immediate: true,
      });
    };

    const frameOne = window.requestAnimationFrame(jumpToTop);
    const frameTwo = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(jumpToTop);
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [pathname]);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
