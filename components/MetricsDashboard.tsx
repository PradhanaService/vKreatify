"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../data/clients";

type MetricsDashboardProps = {
  client: Client;
};

type MetricCardProps = {
  accentColor: string;
  isInView: boolean;
  index: number;
  metric: Client["metrics"][number];
};

function useCounter(end: number, decimals: number = 0, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      return;
    }

    let startTime: number;

    const step = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = eased * end;
      const factor = Math.pow(10, decimals);
      setCount(Math.round(currentValue * factor) / factor);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [started, end, decimals, duration]);

  return { count, start: () => setStarted(true) };
}

function iconForMetric(icon: string) {
  const icons: Record<string, string> = {
    music: "M",
    revenue: "$",
    rating: "*",
    art: "A",
    calendar: "C",
    time: "T",
    mobile: "P",
    system: "D",
    home: "H",
    search: "S",
    location: "L",
    health: "+",
    form: "F",
    accessibility: "A",
    books: "B",
    users: "U",
    trophy: "T",
  };

  return icons[icon] ?? "•";
}

function MetricCard({ accentColor, isInView, index, metric }: MetricCardProps) {
  const { count, start } = useCounter(metric.value, metric.decimals ?? 0);

  useEffect(() => {
    if (isInView) {
      start();
    }
  }, [isInView, start]);

  const displayValue =
    metric.decimals && metric.decimals > 0
      ? count.toFixed(metric.decimals)
      : Math.round(count).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium"
        style={{
          color: accentColor,
          backgroundColor: `${accentColor}33`,
        }}
      >
        {iconForMetric(metric.icon)}
      </div>
      <div
        className="mt-8 text-[56px] font-[200] leading-none tracking-[-0.03em]"
        style={{ color: accentColor }}
      >
        {displayValue}
        {metric.suffix ?? ""}
      </div>
      <p className="mt-6 text-[13px] leading-[1.6] text-white/78">{metric.label}</p>
    </motion.div>
  );
}

export default function MetricsDashboard({ client }: MetricsDashboardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const barHeights = [46, 68, 84, 106, 128];

  return (
    <section className="bg-white px-[5vw] py-[120px] dark:bg-black">
      <div ref={ref} className="mx-auto max-w-[1600px] rounded-[20px] bg-[#1D1D1F] p-8 md:p-12">
        <h2 className="mb-12 text-[32px] font-[200] text-white">Project outcomes.</h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {client.metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              accentColor={client.accentColor}
              isInView={isInView}
              index={index}
              metric={metric}
            />
          ))}
        </div>

        <div className="mt-12">
          <div className="flex items-end gap-4">
            {barHeights.map((height, index) => (
              <motion.div
                key={height}
                initial={{ height: 0, opacity: 0 }}
                animate={isInView ? { height, opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.08, ease: "easeOut" }}
                className="w-12 rounded-t-[4px]"
                style={{
                  backgroundColor: client.accentColor,
                  opacity: 0.35 + index * 0.12,
                }}
              />
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-[10px] text-white/68">
            {["Jan", "Mar", "May", "Jul", "Sep"].map((month) => (
              <span key={month} className="w-12 text-center">
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
