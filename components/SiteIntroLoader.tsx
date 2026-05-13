"use client";

import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const logo = "vKreatify";
const phrases = ["Design Beyond Ordinary", "Building Digital Presence", "Crafted for Visionaries"];

export default function SiteIntroLoader() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: 6 + ((index * 17) % 88),
        top: 10 + ((index * 23) % 78),
        size: 2 + (index % 3),
        delay: (index % 7) * 0.08,
      })),
    [],
  );

  useLayoutEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem("vk-intro-seen") === "true";

    if (pathname !== "/" || hasSeenIntro) {
      setIsVisible(false);
      return undefined;
    }

    if (!isVisible) {
      setIsVisible(true);
      return undefined;
    }

    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    setIsVisible(true);
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const introDuration = prefersReducedMotion ? 0.35 : 1;
      const logoLetters = gsap.utils.toArray<HTMLElement>(".intro-logo-letter");
      const phraseLines = gsap.utils.toArray<HTMLElement>(".intro-phrase");
      const trails = gsap.utils.toArray<HTMLElement>(".intro-trail");
      const particlesEls = gsap.utils.toArray<HTMLElement>(".intro-particle");
      const lineEls = gsap.utils.toArray<HTMLElement>(".intro-line");

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(".intro-atmosphere", { autoAlpha: 0, scale: 1.08 });
      gsap.set(logoLetters, { yPercent: 115, autoAlpha: 0, filter: "blur(18px)", rotateX: -55 });
      gsap.set(phraseLines, { y: 38, autoAlpha: 0, filter: "blur(14px)", clipPath: "inset(0 0 100% 0)" });
      gsap.set(trails, { xPercent: -120, autoAlpha: 0, scaleX: 0.2 });
      gsap.set(lineEls, { scaleX: 0, transformOrigin: "left center", autoAlpha: 0 });
      gsap.set(particlesEls, { autoAlpha: 0, scale: 0 });

      gsap.to(".intro-grain", {
        x: prefersReducedMotion ? 0 : 24,
        y: prefersReducedMotion ? 0 : -18,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".intro-blob", {
        x: (index) => (index % 2 === 0 ? 80 : -70),
        y: (index) => (index % 2 === 0 ? 42 : -36),
        scale: (index) => 1.08 + index * 0.04,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(particlesEls, {
        y: (index) => -18 - (index % 5) * 6,
        x: (index) => (index % 2 === 0 ? 12 : -12),
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.035,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.documentElement.style.overflow = originalOverflow;
          document.body.style.overflow = originalBodyOverflow;
          window.sessionStorage.setItem("vk-intro-seen", "true");
          setIsVisible(false);
        },
      });

      tl.to(".intro-atmosphere", {
        autoAlpha: 1,
        scale: 1,
        duration: introDuration * 1.05,
      })
        .to(
          particlesEls,
          {
            autoAlpha: 0.72,
            scale: 1,
            duration: introDuration * 0.9,
            stagger: 0.018,
          },
          "-=0.72",
        )
        .to(
          lineEls,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: introDuration * 1.15,
            stagger: 0.11,
          },
          "-=0.72",
        )
        .to(
          logoLetters,
          {
            yPercent: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: introDuration * 1.05,
            stagger: 0.055,
          },
          "-=0.45",
        )
        .to(
          logoRef.current,
          {
            scale: 1.035,
            duration: introDuration * 1.2,
            ease: "sine.inOut",
          },
          "-=0.45",
        )
        .to(
          trails,
          {
            xPercent: 110,
            scaleX: 1,
            autoAlpha: 1,
            duration: introDuration * 1.35,
            stagger: 0.09,
            ease: "power3.inOut",
          },
          "-=0.7",
        );

      phraseLines.forEach((phrase, index) => {
        tl.to(
          phrase,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: introDuration * 0.72,
          },
          index === 0 ? "-=0.35" : "+=0.02",
        ).to(phrase, {
          autoAlpha: 0,
          y: -28,
          filter: "blur(12px)",
          clipPath: "inset(100% 0 0 0)",
          duration: introDuration * 0.56,
          ease: "power3.in",
        });
      });

      tl.to(
        logoRef.current,
        {
          scale: 1.12,
          filter: "blur(0px) drop-shadow(0 0 34px rgba(255,255,255,0.34))",
          duration: introDuration * 0.55,
          ease: "power2.inOut",
        },
        "-=0.08",
      )
        .to(
          ".intro-final-wipe",
          {
            scaleY: 1,
            duration: introDuration * 0.72,
            ease: "power4.inOut",
          },
          "-=0.25",
        )
        .to(root, {
          yPercent: -100,
          autoAlpha: 0,
          duration: introDuration * 0.82,
          ease: "power4.inOut",
        });
    }, root);

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
      ctx.revert();
    };
  }, [isVisible, pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100000] overflow-hidden bg-[#030507] text-white opacity-0"
      aria-label="vKreatify cinematic loading intro"
    >
      <div className="intro-atmosphere absolute inset-0">
        <div className="intro-blob absolute left-[-12%] top-[-18%] h-[52vw] max-h-[720px] min-h-[320px] w-[52vw] min-w-[320px] rounded-full bg-white/10 blur-[110px]" />
        <div className="intro-blob absolute bottom-[-18%] right-[-12%] h-[48vw] max-h-[680px] min-h-[320px] w-[48vw] min-w-[320px] rounded-full bg-[#C9CED6]/10 blur-[112px]" />
        <div className="intro-blob absolute left-[38%] top-[32%] h-[26vw] max-h-[360px] min-h-[220px] w-[26vw] min-w-[220px] rounded-full bg-white/6 blur-[84px]" />

        <div className="intro-grain pointer-events-none absolute inset-[-60px] opacity-[0.18]" />

        {[12, 42, 68].map((top, index) => (
          <div
            key={top}
            className="intro-line absolute left-[-8%] h-px w-[116%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),rgba(185,190,200,0.30),transparent)]"
            style={{ top: `${top}%`, transform: `rotate(${index === 1 ? -4 : 3}deg)` }}
          />
        ))}

        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="intro-trail absolute left-0 h-[2px] w-[58vw] origin-left rounded-full blur-[1px]"
            style={{
              top: `${28 + index * 12}%`,
              background:
                index % 2 === 0
                  ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.86), rgba(198,203,212,0.72), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(148,154,166,0.58), rgba(255,255,255,0.82), transparent)",
              transform: `rotate(${index % 2 === 0 ? -8 : 7}deg)`,
            }}
          />
        ))}

        {particles.map((particle) => (
          <span
            key={particle.id}
            className="intro-particle absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.32)]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_34%,rgba(0,0,0,0.74)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          ref={logoRef}
          className="flex overflow-hidden pb-3 text-[clamp(54px,9vw,142px)] font-[800] uppercase leading-none tracking-normal [perspective:900px]"
        >
          {logo.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="intro-logo-letter inline-block bg-[linear-gradient(120deg,#FFFFFF_0%,#BFC4CD_42%,#F7F7F7_70%,#8F96A3_100%)] bg-clip-text text-transparent [text-shadow:0_0_34px_rgba(255,255,255,0.18)]"
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="relative mt-7 h-12 w-full max-w-[720px] overflow-hidden">
          {phrases.map((phrase) => (
            <div
              key={phrase}
              className="intro-phrase absolute inset-0 flex items-center justify-center text-[clamp(14px,2vw,22px)] font-[300] uppercase tracking-[0.22em] text-white/80"
            >
              {phrase}
            </div>
          ))}
        </div>
      </div>

      <div className="intro-final-wipe pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full origin-bottom scale-y-0 bg-white" />
    </div>
  );
}
