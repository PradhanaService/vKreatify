"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Client } from "../data/clients";

type DragGalleryProps = {
  client: Client;
};

export default function DragGallery({ client }: DragGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  const galleryImages = useMemo(
    () => [...client.images, client.images[0], client.images[1]],
    [client.images],
  );

  useEffect(() => {
    const updateDrag = () => {
      if (!containerRef.current || !trackRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      setMaxDrag(Math.max(trackWidth - containerWidth, 0));
    };

    updateDrag();
    window.addEventListener("resize", updateDrag);

    return () => {
      window.removeEventListener("resize", updateDrag);
    };
  }, [galleryImages]);

  return (
    <section className="bg-[#FAFAFA] px-[5vw] py-[120px] dark:bg-[#111111]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex items-center justify-between gap-6">
          <p className="text-[12px] uppercase tracking-[0.1em] text-[#86868B] dark:text-white/45">
            Gallery
          </p>
          <p className="text-[12px] uppercase tracking-[0.1em] text-[#86868B] dark:text-white/45">
            &larr; Drag to explore &rarr;
          </p>
        </div>

        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            style={{ cursor: "grab" }}
            whileDrag={{ cursor: "grabbing" }}
            className="flex gap-4 pb-2"
          >
            {galleryImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative h-[480px] w-[360px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:bg-[#1A1A1A] dark:shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 360px"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.06] hover:brightness-105"
                />
                <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
                  {client.tags.map((tag) => (
                    <span
                      key={`${image.src}-${tag}`}
                      className="rounded-full border border-white/20 bg-white/15 px-3 py-[5px] text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
