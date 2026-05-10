"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Client } from "../../data/clients";

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
  const sequence = `${items.join(" — ")} —`;
  return `${sequence} ${sequence} ${sequence}`;
}

export default function ClientHero({ client }: ClientHeroProps) {
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

  return (
    <section
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
        <Link
          href="/#hall-of-fame"
          style={{
            background: "#ffffff",
            color: hero.bgColor,
            padding: "10px 22px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          ← All Work
        </Link>
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

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <p
          style={{
            color: isLightText ? "rgba(255,255,255,0.6)" : "rgba(26,26,26,0.6)",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          {hero.name} / {hero.year} &nbsp;&nbsp;&nbsp; {hero.category}
        </p>
        <h1
          style={{
            fontSize: "clamp(72px, 14vw, 180px)",
            fontWeight: 900,
            color: hero.textColor,
            lineHeight: 1,
            letterSpacing: "-4px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {hero.name}
        </h1>
        <p
          style={{
            color: isLightText ? "rgba(255,255,255,0.8)" : "rgba(26,26,26,0.8)",
            fontSize: "20px",
            fontWeight: 300,
            marginTop: "16px",
          }}
        >
          {hero.tagline}
        </p>
      </div>

      <div
        style={{
          overflow: "hidden",
          padding: "16px 0",
          borderTop: isLightText
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(26,26,26,0.1)",
        }}
      >
        <div
          style={
            {
              display: "flex",
              whiteSpace: "nowrap",
              animation: "marquee 20s linear infinite",
            } as CSSProperties
          }
        >
          <span
            style={{
              color: isLightText ? "rgba(255,255,255,0.4)" : "rgba(26,26,26,0.45)",
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
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={
            {
              width: "1px",
              height: "40px",
              background: isLightText ? "rgba(255,255,255,0.3)" : "rgba(26,26,26,0.3)",
              animation: "scrollLine 2s ease-in-out infinite",
            } as CSSProperties
          }
        />
        <span
          style={{
            color: isLightText ? "rgba(255,255,255,0.4)" : "rgba(26,26,26,0.4)",
            fontSize: "10px",
            letterSpacing: "3px",
          }}
        >
          SCROLL
        </span>
      </div>
    </section>
  );
}
