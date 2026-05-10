"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
}

type StatItem = {
  value: number;
  label: string;
  suffix?: string;
};

const stats: StatItem[] = [
  { value: 6, label: "Companies transformed" },
  { value: 340, label: "Users impacted", suffix: "K" },
  { value: 4, label: "Countries" },
  { value: 1, label: "Team. One vision." },
];

function StatBlock({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { count, start } = useCounter(stat.value);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="flex flex-col justify-center"
    >
      <div className="mb-8 h-px w-full bg-black/5 dark:bg-white/10">
        <div
          className={`h-px bg-[#1D1D1F] transition-[width] duration-[1500ms] ease-out dark:bg-white ${
            isInView ? "w-full" : "w-0"
          }`}
        />
      </div>
      <div className="text-[clamp(64px,8vw,120px)] font-[200] leading-none tracking-[-0.04em] text-[#1D1D1F] [font-variant-numeric:tabular-nums] dark:text-white">
        {count}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-3 text-[13px] uppercase tracking-[0.1em] text-[#86868B] dark:text-white/45">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <section className="border-y border-black/5 bg-[#F5F5F7] px-[10vw] py-[120px] dark:border-white/10 dark:bg-[#111111]">
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] xl:items-center">
        <StatBlock stat={stats[0]} index={0} />
        <div className="hidden h-20 w-px bg-black/10 dark:bg-white/10 xl:block" />
        <StatBlock stat={stats[1]} index={1} />
        <div className="hidden h-20 w-px bg-black/10 dark:bg-white/10 xl:block" />
        <StatBlock stat={stats[2]} index={2} />
        <div className="hidden h-20 w-px bg-black/10 dark:bg-white/10 xl:block" />
        <StatBlock stat={stats[3]} index={3} />
      </div>
    </section>
  );
}
