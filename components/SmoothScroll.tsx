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
      duration: 1.35,
      smoothWheel: true,
      lerp: 0.075,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.1,
      infinite: false,
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

    const jumpToTarget = () => {
      const hash = window.location.hash.replace("#", "");
      const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;

      lenis.scrollTo(target ?? 0, {
        immediate: true,
      });
    };

    const frameOne = window.requestAnimationFrame(jumpToTarget);
    const frameTwo = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(jumpToTarget);
    });

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.cancelAnimationFrame(frameTwo);
    };
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const lenis = lenisRef.current;
      const hash = window.location.hash.replace("#", "");
      const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;

      if (lenis && target) {
        lenis.scrollTo(target, {
          immediate: false,
        });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
