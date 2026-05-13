"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Client } from "../../data/clients";

type ImageStackProps = {
  client: Client;
};

function stackTheme(client: Client) {
  switch (client.slug) {
    case "noize":
      return {
        section: "bg-[#0D0D0D] text-white",
        caption: "text-white/70",
      };
    case "tattoo-collective":
      return {
        section: "bg-[#1C1C1C] text-[#E8D5B7]",
        caption: "text-[#E8D5B7]/72",
      };
    case "company-one":
      return {
        section: "bg-[#F0F4FF] text-[#050A1A]",
        caption: "text-[#050A1A]/68",
      };
    case "company-two":
      return {
        section: "bg-[#F8F4EE] text-[#1A3D2B]",
        caption: "text-[#1A3D2B]/68",
      };
    case "company-three":
      return {
        section: "bg-[#F5F3FF] text-[#24154F]",
        caption: "text-[#24154F]/68",
      };
    case "company-four":
      return {
        section: "bg-[#FFF8F5] text-[#1A1A2E]",
        caption: "text-[#1A1A2E]/68",
      };
    default:
      return {
        section: "bg-white text-[#1D1D1F]",
        caption: "text-[#475569]",
      };
  }
}

function ImageCard({
  image,
  className,
  index,
}: {
  image: Client["images"][number];
  className: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120, rotate: index % 2 === 0 ? -4 : 4, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-18% 0px -18% 0px" }}
      whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      transition={{ duration: 0.95, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div className="group relative h-full w-full overflow-hidden rounded-[4px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
      </div>
    </motion.div>
  );
}

export default function ImageStack({ client }: ImageStackProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = stackTheme(client);
  const [imageOne, imageTwo, imageThree] = [
    client.images[1] ?? client.images[0],
    client.images[2] ?? client.images[1] ?? client.images[0],
    client.images[3] ?? client.images[2] ?? client.images[0],
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const stripeX = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section className={`${theme.section} px-[5vw] py-[80px]`}>
      <div ref={ref} className="relative mx-auto max-w-[1700px]">
        <motion.div
          style={{ x: stripeX, backgroundColor: client.accentColor }}
          className="absolute left-[-5%] top-[12%] h-4 w-[110%] opacity-50 blur-[2px]"
        />
        <div className="relative hidden min-h-[920px] gap-[3%] lg:flex">
          <ImageCard image={imageOne} index={0} className="relative z-[2] aspect-[3/4] w-[55%]" />
          <ImageCard image={imageTwo} index={1} className="relative z-[1] mt-20 aspect-[3/4] w-[42%]" />
          <ImageCard
            image={imageThree}
            index={2}
            className="absolute bottom-[-40px] left-[30%] z-[3] aspect-[4/5] w-[35%] shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
          />
        </div>

        <div className="grid gap-6 lg:hidden">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
            <Image src={imageOne.src} alt={imageOne.alt} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px]">
            <Image src={imageTwo.src} alt={imageTwo.alt} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
            <Image src={imageThree.src} alt={imageThree.alt} fill sizes="100vw" className="object-cover" />
          </div>
        </div>

        <div className={`mt-16 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] ${theme.caption}`}>
          <span>{client.imageStackCaption}</span>
          <span>{client.imageStackIndex}</span>
        </div>
      </div>
    </section>
  );
}
