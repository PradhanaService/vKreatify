"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Client } from "../../../../data/clients";

type HeroProps = {
  client: Client;
};

function GrainLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
      style={{
        opacity: 0.08,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220' viewBox='0 0 220 220'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function HeroShell({
  client,
  children,
  backgroundClassName,
  overlayClassName,
  textClassName = "text-white",
}: {
  client: Client;
  children: React.ReactNode;
  backgroundClassName: string;
  overlayClassName: string;
  textClassName?: string;
}) {
  return (
    <motion.section
      layoutId={`card-${client.slug}`}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${backgroundClassName} ${textClassName}`}
    >
      <motion.div
        layoutId={`card-color-${client.slug}`}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className={`absolute inset-0 ${backgroundClassName}`}
      />

      <div className="absolute inset-0 opacity-30">
        <Image
          src={client.images[0].src}
          alt={client.images[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <GrainLayer />

      <div className="absolute left-5 right-5 top-24 z-10 flex items-center justify-between text-[12px] uppercase tracking-[0.18em] md:left-16 md:right-16 lg:left-24 xl:left-32">
        <span className="opacity-60">{client.name}</span>
        <span className="opacity-60">{client.year}</span>
      </div>

      {children}
    </motion.section>
  );
}

function NoizeHero({ client }: HeroProps) {
  const letters = "NOIZE".split("");

  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[#FF3B00]"
      overlayClassName="bg-[linear-gradient(135deg,rgba(255,59,0,0.82),rgba(26,10,0,0.55))]"
    >
      <div className="relative z-10 flex w-full flex-col items-center px-5 text-center">
        <div className="flex flex-wrap justify-center gap-x-1">
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(72px,12vw,160px)] font-[200] leading-[0.9] tracking-[-0.04em] text-white"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-[18px] font-[300] text-white/70"
        >
          {client.tagline}
        </motion.p>
      </div>

      <div className="absolute bottom-24 left-0 right-0 overflow-hidden border-y border-white/15 py-4 text-[14px] uppercase tracking-[0.26em] text-white/58">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex min-w-max gap-10 whitespace-nowrap"
        >
          <span>SOUND · IDENTITY · CULTURE · BRAND · SOUND · IDENTITY</span>
          <span>SOUND · IDENTITY · CULTURE · BRAND · SOUND · IDENTITY</span>
        </motion.div>
      </div>
    </HeroShell>
  );
}

function TattooHero({ client }: HeroProps) {
  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[#1C1C1C]"
      overlayClassName="bg-[linear-gradient(160deg,rgba(28,28,28,0.74),rgba(28,28,28,0.88))]"
      textClassName="text-[#E8D5B7]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 px-5 text-center"
      >
        <div className="mb-8 flex items-center justify-center gap-5 text-[#E8D5B7]/72">
          <span className="h-px w-20 bg-current" />
          <span className="text-[18px]">✦</span>
          <span className="h-px w-20 bg-current" />
        </div>
        <h1 className="text-[clamp(64px,11vw,148px)] font-[300] leading-[0.92] tracking-[-0.04em] [font-family:Georgia,serif]">
          {client.name}
        </h1>
        <p className="mt-5 text-[12px] uppercase tracking-[0.28em] text-[#E8D5B7]/38">
          Est. 2019 · Cape Town · 24 Artists
        </p>
      </motion.div>
    </HeroShell>
  );
}

function FintechHero({ client }: HeroProps) {
  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[#050A1A]"
      overlayClassName="bg-[linear-gradient(160deg,rgba(5,10,26,0.78),rgba(5,10,26,0.92))]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,85,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,85,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,85,255,0.15),transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 px-5 text-center"
      >
        <h1 className="text-[clamp(72px,12vw,160px)] font-[200] leading-[0.9] tracking-[-0.04em]">
          {client.name}
        </h1>
        <div className="mx-auto mt-8 h-px w-[60px] bg-white/40" />
        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-[300] leading-8 text-white/60">
          {client.tagline}
        </p>
      </motion.div>
    </HeroShell>
  );
}

function RealEstateHero({ client }: HeroProps) {
  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[linear-gradient(160deg,#1A3D2B,#2D6A4F)]"
      overlayClassName="bg-[linear-gradient(160deg,rgba(26,61,43,0.56),rgba(45,106,79,0.78))]"
      textClassName="text-[#F8F4EE]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 px-5 text-center"
      >
        <h1 className="text-[clamp(72px,12vw,160px)] font-[200] leading-[0.9] tracking-[-0.04em]">
          {client.name}
        </h1>
        <div className="mt-8 flex justify-center">
          <div className="relative h-7 w-5">
            <div className="mx-auto h-5 w-5 rounded-full border-2 border-[#D4A853]" />
            <div className="absolute left-1/2 top-4 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#D4A853]" />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-[300] leading-8 text-[#F8F4EE]/70">
          {client.tagline}
        </p>
      </motion.div>
    </HeroShell>
  );
}

function HealthcareHero({ client }: HeroProps) {
  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[linear-gradient(135deg,#2D1B69,#6B4EFF)]"
      overlayClassName="bg-[linear-gradient(135deg,rgba(45,27,105,0.56),rgba(107,78,255,0.76))]"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(107,78,255,0.3)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 px-5 text-center"
      >
        <h1 className="text-[clamp(72px,12vw,160px)] font-[200] leading-[0.9] tracking-[-0.04em]">
          {client.name}
        </h1>
        <div className="mx-auto mt-8 h-px w-[60px] bg-white/40" />
        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-[300] leading-8 text-white/60">
          {client.tagline}
        </p>
      </motion.div>
    </HeroShell>
  );
}

function EdTechHero({ client }: HeroProps) {
  const confetti = Array.from({ length: 20 }, (_, index) => index);
  const colors = ["#FFFFFF", "#FFD700", "#1A1A2E", "#FF3B00"];

  return (
    <HeroShell
      client={client}
      backgroundClassName="bg-[#FF6B35]"
      overlayClassName="bg-[linear-gradient(180deg,rgba(255,107,53,0.24),rgba(255,107,53,0.72))]"
    >
      {confetti.map((item) => (
        <motion.div
          key={item}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 2 + (item % 3),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: item * 0.08,
          }}
          className="absolute h-2 w-2"
          style={{
            top: `${10 + ((item * 13) % 70)}%`,
            left: `${5 + ((item * 17) % 90)}%`,
            rotate: `${(item * 27) % 180}deg`,
            backgroundColor: colors[item % colors.length],
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 px-5 text-center"
      >
        <h1 className="text-[clamp(72px,12vw,160px)] font-[200] leading-[0.9] tracking-[-0.04em]">
          {client.name}
        </h1>
        <div className="mx-auto mt-8 h-px w-[60px] bg-white/40" />
        <p className="mx-auto mt-8 max-w-2xl text-[18px] font-[300] leading-8 text-white/68">
          {client.tagline}
        </p>
      </motion.div>
    </HeroShell>
  );
}

export default function Hero({ client }: HeroProps) {
  switch (client.slug) {
    case "noize":
      return <NoizeHero client={client} />;
    case "tattoo-collective":
      return <TattooHero client={client} />;
    case "company-one":
      return <FintechHero client={client} />;
    case "company-two":
      return <RealEstateHero client={client} />;
    case "company-three":
      return <HealthcareHero client={client} />;
    case "company-four":
      return <EdTechHero client={client} />;
    default:
      return <FintechHero client={client} />;
  }
}
