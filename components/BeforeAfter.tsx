"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Client } from "../data/clients";

type BeforeAfterProps = {
  client: Client;
};

export default function BeforeAfter({ client }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const beforeImage = client.images[2] ?? client.images[0];
  const afterImage = client.images[0];

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.min(100, Math.max(0, percentage)));
  };

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => updateSlider(event.clientX);
    const handleTouchMove = (event: TouchEvent) => updateSlider(event.touches[0].clientX);
    const stopDragging = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <section className="bg-white px-[5vw] py-[120px] dark:bg-black">
      <div className="mx-auto max-w-[1600px]">
        <div
          ref={containerRef}
          className="relative h-[500px] overflow-hidden rounded-[24px] bg-[#E5E5E5] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:bg-[#111111]"
          onMouseDown={(event) => {
            setIsDragging(true);
            updateSlider(event.clientX);
          }}
          onTouchStart={(event) => {
            setIsDragging(true);
            updateSlider(event.touches[0].clientX);
          }}
        >
          <div className="absolute inset-0">
            <Image
              src={beforeImage.src}
              alt={`Before redesign comparison for ${client.name}`}
              fill
              sizes="100vw"
              className="object-cover grayscale-[0.8] contrast-[0.8] brightness-90"
            />
            <div className="absolute inset-0 bg-[rgba(200,100,50,0.15)]" />
            <span className="absolute left-6 top-6 rounded-[4px] bg-white/80 px-[10px] py-1 text-[10px] uppercase tracking-[0.2em] text-[#86868B]">
              Before
            </span>
          </div>

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          >
            <Image
              src={afterImage.src}
              alt={`After redesign comparison for ${client.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span
              className="absolute right-6 top-6 rounded-[4px] px-[10px] py-1 text-[10px] uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: client.accentColor }}
            >
              After
            </span>
          </div>

          <div
            className="absolute inset-y-0 w-[2px] bg-white"
            style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[14px] text-[#1D1D1F] shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:border dark:border-white/20 dark:bg-[#1D1D1F] dark:text-white">
              &larr; &rarr;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
