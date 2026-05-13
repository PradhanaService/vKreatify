"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../../data/clients";
import { AnimatedStripes, Magnetic, WebGLDistortionField } from "../MotionPrimitives";

type ClientHeroProps = {
  client: Client;
};

type HeroConfig = {
  name: string;
  tagline: string;
  year: string;
  category: string;
  bgColor: string;
  textColor: string;
  marqueeItems: string[];
};

const heroOverrides: Record<string, HeroConfig> = {
  noize: {
    name: "NOIZE",
    tagline: "Sound. Identity. Culture.",
    year: "2023",
    category: "BRAND IDENTITY & E-COMMERCE",
    bgColor: "#e8470a",
    textColor: "#ffffff",
    marqueeItems: ["RETAIL", "BRAND IDENTITY", "E-COMMERCE", "MOTION DESIGN", "PACKAGING"],
  },
  "tattoo-collective": {
    name: "TATTOO COLLECTIVE",
    tagline: "Raw. Bold. Permanent.",
    year: "2024",
    category: "BRANDING & WEB DESIGN",
    bgColor: "#1a0a00",
    textColor: "#ffffff",
    marqueeItems: ["BRANDING", "WEB DESIGN", "IDENTITY", "PRINT", "DIGITAL"],
  },
  "company-one": {
    name: "AV SION",
    tagline: "Where sound meets vision.",
    year: "2024",
    category: "PLATFORM & BRANDING",
    bgColor: "#03001c",
    textColor: "#ffffff",
    marqueeItems: ["PLATFORM", "BRANDING", "WEB DESIGN", "IDENTITY"],
  },
  "company-two": {
    name: "STUDIO X",
    tagline: "Ideas turned into reality.",
    year: "2024",
    category: "CREATIVE DIRECTION",
    bgColor: "#f5f0e8",
    textColor: "#1a1a1a",
    marqueeItems: ["CREATIVE DIRECTION", "BRANDING", "MOTION", "DIGITAL"],
  },
};

function buildMarquee(items: string[]) {
  const sequence = `${items.join(" - ")} -`;
  return `${sequence} ${sequence} ${sequence}`;
}

function ProjectTransitionGraphic({
  active,
  accentColor,
}: {
  active: boolean;
  accentColor: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={active ? { opacity: [0, 1, 0], scale: [0.82, 1, 1.08] } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute inset-0 z-[8] flex items-center justify-center"
    >
      <div className="relative h-[min(58vw,520px)] w-[min(58vw,520px)]">
        <div className="absolute inset-0 rounded-full border border-white/40" />
        <div className="absolute inset-[17%] rounded-full border border-white/30" />
        <div className="absolute left-1/2 top-[-8%] h-[116%] w-px -translate-x-1/2 bg-white/30" />
        <div className="absolute left-[-8%] top-1/2 h-px w-[116%] -translate-y-1/2 bg-white/30" />
        <div
          className="absolute left-1/2 top-1/2 h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </motion.div>
  );
}

export default function ClientHero({ client }: ClientHeroProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [cameFromCard, setCameFromCard] = useState(false);
  const hero = heroOverrides[client.slug] ?? {
    name: client.name.toUpperCase(),
    tagline: client.tagline,
    year: client.year,
    category: client.tags.join(" & "),
    bgColor: client.accentColor,
    textColor: "#ffffff",
    marqueeItems: client.tags,
  };

  const isLightText = hero.textColor.toLowerCase() === "#ffffff";
  const marqueeText = buildMarquee(hero.marqueeItems);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.84]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 130]);

  useEffect(() => {
    const incomingClient = window.sessionStorage.getItem("vk-enter-client");

    if (incomingClient !== client.slug) {
      return undefined;
    }

    window.sessionStorage.removeItem("vk-enter-client");
    setCameFromCard(true);

    const timeout = window.setTimeout(() => {
      setCameFromCard(false);
    }, 1250);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [client.slug]);

  return (
    <motion.section
      ref={ref}
      layoutId={`work-card-${client.slug}`}
      onPointerDownCapture={(event) => {
        if (event.clientX <= 190 && event.clientY <= 76) {
          window.location.href = "/#hall-of-fame";
        }
      }}
      style={{
        backgroundColor: hero.bgColor,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        layoutId={`work-card-color-${client.slug}`}
        className="absolute inset-0"
        style={{ backgroundColor: hero.bgColor }}
      />
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] opacity-85">
        <div className="absolute left-[-8%] top-[12%] h-[42vw] max-h-[640px] min-h-[300px] w-[42vw] min-w-[300px] rounded-full bg-white/20 blur-[80px]" />
        <div className="absolute right-[-8%] top-[22%] h-[34vw] max-h-[520px] min-h-[260px] w-[34vw] min-w-[260px] rounded-full bg-black/20 blur-[80px]" />
      </motion.div>
      <ProjectTransitionGraphic active={cameFromCard} accentColor={client.accentColor} />
      <WebGLDistortionField className="opacity-70 mix-blend-soft-light" />
      <AnimatedStripes className="absolute inset-x-0 bottom-[16%] h-[240px] text-white/40" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 40px",
          zIndex: 10,
        }}
      >
        <Magnetic>
          <form action="/#hall-of-fame" method="get" style={{ position: "relative", zIndex: 100001, pointerEvents: "auto" }}>
            <button
              type="submit"
              onPointerDown={() => {
                window.location.href = "/#hall-of-fame";
              }}
              style={{
                background: "#ffffff",
                border: 0,
                color: hero.bgColor,
                cursor: "pointer",
                padding: "10px 22px",
                pointerEvents: "auto",
                position: "relative",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
                zIndex: 100001,
                textDecoration: "none",
                boxShadow: "0 14px 36px rgba(0,0,0,0.18)",
              }}
            >
              Back to Work
            </button>
          </form>
        </Magnetic>
        <span
          style={{
            color: hero.textColor,
            fontSize: "12px",
            letterSpacing: "4px",
          }}
        >
          {hero.name}
        </span>
      </div>

      <motion.div
        style={{
          y: titleY,
          scale: titleScale,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
        initial={{ opacity: 0, y: 80, filter: "blur(18px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <p
          style={{
            color: isLightText ? "rgba(255,255,255,0.66)" : "rgba(26,26,26,0.62)",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          {hero.name} / {hero.year} &nbsp;&nbsp;&nbsp; {hero.category}
        </p>
        <motion.h1
          style={{
            fontSize: "clamp(72px, 14vw, 180px)",
            fontWeight: 900,
            color: hero.textColor,
            lineHeight: 1,
            letterSpacing: "-4px",
            textTransform: "uppercase",
            margin: 0,
          }}
          initial={{ clipPath: "inset(0 0 100% 0)", y: 70 }}
          animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          {hero.name}
        </motion.h1>
        <motion.p
          style={{
            color: isLightText ? "rgba(255,255,255,0.84)" : "rgba(26,26,26,0.82)",
            fontSize: "20px",
            fontWeight: 300,
            marginTop: "16px",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.tagline}
        </motion.p>
      </motion.div>

      <div
        style={{
          overflow: "hidden",
          padding: "16px 0",
          borderTop: isLightText ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(26,26,26,0.16)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={
            {
              display: "flex",
              whiteSpace: "nowrap",
              animation: "marquee 16s linear infinite",
            } as CSSProperties
          }
        >
          <span
            style={{
              color: isLightText ? "rgba(255,255,255,0.58)" : "rgba(26,26,26,0.58)",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              paddingRight: "40px",
            }}
          >
            {marqueeText}
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "62px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <div
          style={
            {
              width: "2px",
              height: "56px",
              background: isLightText ? "rgba(255,255,255,0.54)" : "rgba(26,26,26,0.5)",
              animation: "scrollLine 1.35s ease-in-out infinite",
            } as CSSProperties
          }
        />
        <span
          style={{
            color: isLightText ? "rgba(255,255,255,0.68)" : "rgba(26,26,26,0.62)",
            fontSize: "10px",
            letterSpacing: "3px",
          }}
        >
          SCROLL
        </span>
      </div>
    </motion.section>
  );
}
