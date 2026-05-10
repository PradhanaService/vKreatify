"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

const stackConfig = [
  { rotate: -3, x: -20, y: 10, zIndex: 1 },
  { rotate: 2, x: 15, y: 0, zIndex: 2 },
  { rotate: -1, x: -10, y: 5, zIndex: 3 },
  { rotate: 0, x: 0, y: 0, zIndex: 4 },
] as const;

type StackedImagesProps = {
  images: ReactNode[];
};

export default function StackedImages({ images }: StackedImagesProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="relative mx-auto h-[360px] w-[280px] md:h-[440px] md:w-[320px] lg:h-[480px] lg:w-[360px]"
    >
      {images.map((image, index) => {
        const config = stackConfig[index] ?? stackConfig[stackConfig.length - 1];

        return (
          <motion.div
            key={index}
            variants={{
              hidden: { rotate: 0, x: 0, y: 0, opacity: 0 },
              show: {
                rotate: config.rotate,
                x: config.x,
                y: config.y,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                },
              },
            }}
            whileHover={{
              scale: 1.03,
              y: -12,
              zIndex: 10,
              boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
            }}
            className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
            style={{ zIndex: config.zIndex }}
          >
            {image}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
