"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../../data/clients";

type MetricsDashboardProps = {
  client: Client;
};

function useCounter(end: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [duration, end, started]);

  return { count, start: () => setStarted(true) };
}

function formatMetric(value: number, decimals?: number, suffix?: string) {
  const fixed = decimals ? value.toFixed(decimals) : Math.round(value).toString();
  return `${fixed}${suffix ?? ""}`;
}

function iconLabel(icon: string) {
  switch (icon) {
    case "music":
      return "MU";
    case "revenue":
      return "$";
    case "rating":
      return "*";
    case "art":
      return "AR";
    case "calendar":
      return "CA";
    case "time":
      return "TI";
    case "mobile":
      return "MO";
    case "system":
      return "SY";
    case "home":
      return "HO";
    case "search":
      return "SE";
    case "location":
      return "LO";
    case "health":
      return "HE";
    case "form":
      return "FO";
    case "accessibility":
      return "AC";
    case "books":
      return "BK";
    case "users":
      return "US";
    case "trophy":
      return "TR";
    default:
      return "VK";
  }
}

function MetricCard({
  metric,
  accentColor,
  index,
  isInView,
}: {
  metric: Client["metrics"][number];
  accentColor: string;
  index: number;
  isInView: boolean;
}) {
  const { count, start } = useCounter(metric.value, 1600 + index * 150);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 90, rotate: index === 1 ? 3 : -3, scale: 0.86 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : { opacity: 0, y: 90, rotate: index === 1 ? 3 : -3, scale: 0.86 }}
      whileHover={{ y: -12, scale: 1.035 }}
      transition={{ duration: 0.75, delay: index * 0.16, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.04] p-8"
    >
      <div className="absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full opacity-25 blur-2xl" style={{ backgroundColor: accentColor }} />
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-[600]"
        style={{ backgroundColor: `${accentColor}33`, color: accentColor }}
      >
        {iconLabel(metric.icon)}
      </div>
      <div className="mt-8 text-[56px] font-[200] leading-none tracking-[-0.03em]" style={{ color: accentColor }}>
        {formatMetric(count, metric.decimals, metric.suffix)}
      </div>
      <p className="mt-4 max-w-[260px] text-[13px] leading-[1.6] text-white/80">{metric.label}</p>
    </motion.div>
  );
}

export default function MetricsDashboard({ client }: MetricsDashboardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white px-[5vw] py-[140px]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-16% 0px -16% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[20px] bg-[#1D1D1F] p-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.22)] md:p-12"
      >
        <h2 className="mb-12 text-[32px] font-[200] tracking-[-0.03em]">Project outcomes.</h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {client.metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              accentColor={client.accentColor}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="flex items-end gap-4 md:gap-6">
            {[28, 40, 58, 76, 92].map((height, index) => (
              <motion.div
                key={height}
                initial={{ height: 0, opacity: 0 }}
                animate={isInView ? { height, opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.35 + index * 0.08 }}
                className="w-10 rounded-t-[4px] md:w-12"
                style={{
                  backgroundColor: `${client.accentColor}${["33", "4D", "66", "80", "99"][index]}`,
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-4 md:gap-6">
            {["Jan", "Mar", "May", "Jul", "Sep"].map((month) => (
              <span key={month} className="w-10 text-[10px] uppercase tracking-[0.15em] text-white/70 md:w-12">
                {month}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
