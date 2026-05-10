"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useCursorContext } from "../context/CursorContext";
import { useThemeContext } from "../context/ThemeContext";

type Position = { x: number; y: number };

function usePointerMode() {
  const [isCoarse, setIsCoarse] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isCoarse;
}

function SpeakerCursor({ active }: { active: boolean }) {
  return (
    <div className="relative h-14 w-14">
      <svg width="32" height="32" viewBox="0 0 32 32" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <rect x="4" y="11" width="8" height="10" fill={active ? "white" : "none"} stroke="white" strokeWidth="1.5" />
        <path d="M12 12 L20 7 V25 L12 20 Z" fill={active ? "white" : "none"} stroke="white" strokeWidth="1.5" />
      </svg>
      {[20, 28, 36].map((radius, index) => (
        <motion.div
          key={radius}
          animate={{ scale: [1, 1.3, 1], opacity: active ? [0.7, 0.95, 0.7] : [0.6, 0.3, 0.6] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
          className="absolute left-1/2 top-1/2 rounded-full border border-white"
          style={{
            width: radius,
            height: radius,
            transform: "translate(-50%, -50%)",
            opacity: index === 0 ? 0.6 : index === 1 ? 0.3 : 0.15,
          }}
        />
      ))}
    </div>
  );
}

function TattooCursor({ trail }: { trail: Position[] }) {
  return (
    <div className="relative h-14 w-14">
      {trail.map((point, index) => (
        <div
          key={`${point.x}-${point.y}-${index}`}
          className="absolute h-[3px] w-[3px] rounded-full bg-[#C0392B]"
          style={{
            left: 18 - index * 2,
            top: 26 + index * 2,
            opacity: [0.6, 0.4, 0.2, 0.1, 0.05][index] ?? 0.05,
          }}
        />
      ))}
      <svg width="40" height="40" viewBox="0 0 40 40" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
        <line x1="20" y1="4" x2="20" y2="32" stroke="#E8D5B7" strokeWidth="2" />
        <path d="M20 32 L16 38 L24 38 Z" fill="#E8D5B7" />
      </svg>
      <div className="absolute left-1/2 top-[72%] h-1 w-1 -translate-x-1/2 rounded-full bg-[#C0392B] opacity-80" />
    </div>
  );
}

function FintechCursor() {
  const [bars, setBars] = useState([
    { y1: 4, y2: 36, bodyY: 12, bodyH: 16, color: "#00D4AA" },
    { y1: 7, y2: 33, bodyY: 10, bodyH: 12, color: "#FF3B00" },
    { y1: 5, y2: 35, bodyY: 14, bodyH: 14, color: "#00D4AA" },
  ]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBars((prev) =>
        prev.map((bar, index) => ({
          ...bar,
          bodyY: 8 + ((Date.now() + index * 11) % 10),
          bodyH: 10 + ((Date.now() + index * 13) % 12),
        })),
      );
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {bars.map((bar, index) => {
        const x = [8, 20, 32][index];
        return (
          <g key={x}>
            <line x1={x} y1={bar.y1} x2={x} y2={bar.y2} stroke={bar.color} strokeWidth="1" />
            <rect x={x - 3} y={bar.bodyY} width="6" height={bar.bodyH} fill={bar.color} />
          </g>
        );
      })}
    </svg>
  );
}

function RealEstateCursor({ active }: { active: boolean }) {
  return (
    <motion.div animate={active ? { y: [0, -6, 0] } : { y: 0 }} transition={{ duration: 0.3 }}>
      <div className="relative h-12 w-12">
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(rgba(45,106,79,0.15),transparent)]" />
        <svg width="24" height="32" viewBox="0 0 24 32" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <path d="M12 1C6 1 2 5.2 2 10.8c0 7.7 10 18.2 10 18.2s10-10.5 10-18.2C22 5.2 18 1 12 1zm0 13.4a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6z" fill="#2D6A4F" />
        </svg>
      </div>
    </motion.div>
  );
}

function HealthcareCursor() {
  const [offset, setOffset] = useState(0);
  const points = useMemo(() => {
    const base = [
      [0, 15],
      [10, 15],
      [18, 15],
      [24, 6],
      [30, 24],
      [36, 15],
      [42, 10],
      [48, 15],
      [60, 15],
    ];

    return base.map(([x, y]) => `${x + offset},${y}`).join(" ");
  }, [offset]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOffset((value) => (value > 8 ? 0 : value + 2));
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[30px] w-[60px]">
      <svg width="60" height="30" viewBox="0 0 60 30">
        <polyline points={points} fill="none" stroke="#6B4EFF" strokeWidth="1.5" />
      </svg>
      <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#6B4EFF] shadow-[0_0_8px_rgba(107,78,255,0.2)]" />
    </div>
  );
}

function EdtechCursor({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{ rotate: 360, scale: active ? 1.3 : 1 }}
      transition={{
        rotate: { duration: active ? 0.5 : 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        scale: { duration: 0.2 },
      }}
      className="relative h-12 w-12"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <path d="M16 2l4 9 10 1-7.5 6.5 2.2 10L16 23l-8.7 5.5 2.2-10L2 12l10-1 4-9z" fill="#FF6B35" />
      </svg>
      {[0, 72, 144, 216, 288].map((angle) => (
        <motion.div
          key={angle}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-[#FFD700]"
          animate={{ rotate: angle, x: active ? 22 : 16 }}
          style={{ transformOrigin: "0 0" }}
        />
      ))}
    </motion.div>
  );
}

export default function MoodCursor() {
  const { company } = useCursorContext();
  const { theme } = useThemeContext();
  const isCoarse = usePointerMode();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isClickable, setIsClickable] = useState(false);
  const [trail, setTrail] = useState<Position[]>([]);
  const isDark = theme === "dark";

  useEffect(() => {
    if (isCoarse) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [{ x: e.clientX, y: e.clientY }, ...prev].slice(0, 5));
    };

    const over = (e: Event) => {
      const target = e.target as HTMLElement | null;
      setIsClickable(Boolean(target?.closest("a, button, [role='button']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [isCoarse]);

  useEffect(() => {
    if (isCoarse) return;

    let frame = 0;
    const animate = () => {
      setRingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [isCoarse, pos]);

  if (isCoarse) {
    return null;
  }

  return (
    <>
      {!company ? (
        <>
          <div
            className={`pointer-events-none fixed z-[99999] h-1.5 w-1.5 rounded-full ${isDark ? "bg-white" : "bg-[#1D1D1F]"}`}
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
          />
          <motion.div
            animate={
              isClickable
                ? {
                    width: 48,
                    height: 48,
                    backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                  }
                : {
                    width: 36,
                    height: 36,
                    backgroundColor: isDark ? "rgba(255,255,255,0)" : "rgba(0,0,0,0)",
                  }
            }
            className={`pointer-events-none fixed z-[99998] rounded-full border ${
              isDark ? "border-white/25" : "border-black/20"
            }`}
            style={{ left: ringPos.x, top: ringPos.y, transform: "translate(-50%, -50%)" }}
          />
        </>
      ) : (
        <div
          className="pointer-events-none fixed z-[99999]"
          style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
        >
          {company === "noize" && <SpeakerCursor active={isClickable} />}
          {company === "tattoo-collective" && <TattooCursor trail={trail} />}
          {company === "company-one" && <FintechCursor />}
          {company === "company-two" && <RealEstateCursor active={isClickable} />}
          {company === "company-three" && <HealthcareCursor />}
          {company === "company-four" && <EdtechCursor active={isClickable} />}
        </div>
      )}
    </>
  );
}
