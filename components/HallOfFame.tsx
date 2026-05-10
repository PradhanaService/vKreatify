"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clients } from "../data/clients";
import HallOfFameCard from "./HallOfFameCard";
import { Reveal, SplitReveal, StaggerChildren } from "./MotionPrimitives";

const leftColumnClients = clients.filter((client) => client.column === "left");
const rightColumnClients = clients.filter((client) => client.column === "right");

export default function HallOfFame() {
  const router = useRouter();

  useEffect(() => {
    const slugs = [
      "noize",
      "tattoo-collective",
      "company-one",
      "company-two",
      "company-three",
      "company-four",
    ];

    slugs.forEach((slug) => {
      router.prefetch(`/clients/${slug}`);
    });
  }, [router]);

  return (
    <section
      id="hall-of-fame"
      className="bg-white px-5 py-24 dark:bg-black md:px-16 md:py-28 lg:px-24 lg:py-32 xl:px-32"
    >
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] bg-[#86868B] dark:bg-white/40" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#475569] dark:text-white/72">
              Recent Launches
            </span>
          </div>

          <span className="text-right text-[11px] uppercase tracking-[0.15em] text-[#475569] dark:text-white/72">
            Work and engagements
          </span>
        </Reveal>

        <div className="pt-24 md:pt-28 lg:pt-[120px]">
          <SplitReveal
            as="h2"
            className="mx-auto max-w-[12ch] text-center text-[clamp(52px,7vw,96px)] font-[300] leading-[1.1] tracking-[-0.03em] text-[#1D1D1F] dark:text-white"
          >
            Hall of Fame
          </SplitReveal>
          <span className="mx-auto mt-3 block h-[10px] w-[10px] rounded-full bg-[#FFD700]" />

          <Reveal delay={0.15}>
            <p className="mx-auto max-w-[600px] pt-8 text-center text-[17px] leading-[1.7] text-[#374151] dark:text-white/78">
            We strengthen your design and innovation capabilities through embedded specialist teams.
            From bold new ventures to global industry leaders, companies around the world trust us to
            deliver meaningful digital transformation.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:mt-24">
          <StaggerChildren className="space-y-12 md:space-y-14">
            {leftColumnClients.map((client) => (
              <HallOfFameCard key={client.id} client={client} />
            ))}
          </StaggerChildren>

          <StaggerChildren className="space-y-12 md:space-y-14 md:pt-0 lg:pt-[120px]">
            {rightColumnClients.map((client) => (
              <HallOfFameCard key={client.id} client={client} />
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
