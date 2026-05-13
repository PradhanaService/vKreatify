"use client";

import { clients } from "../data/clients";
import { Reveal, SplitReveal } from "./MotionPrimitives";

const reviews = clients.map((client) => ({
  quote: client.testimonial.quote,
  name: client.testimonial.name,
  role: client.testimonial.role,
  project: client.name,
  accentColor: client.accentColor,
}));

export default function WordsOnTheStreet() {
  const reviewLoop = [...reviews, ...reviews];

  return (
    <section
      id="words-on-the-street"
      className="relative overflow-hidden border-y border-black/10 bg-[#F7FAFF] py-24 text-[#1D1D1F] dark:border-white/10 dark:bg-[#080A0D] dark:text-white md:py-28"
    >
      <div className="absolute left-[-12%] top-[-34%] h-[420px] w-[420px] rounded-full bg-[#0066CC]/16 blur-[80px] dark:bg-[#6B4EFF]/18" />
      <div className="absolute bottom-[-34%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[#00A676]/14 blur-[78px] dark:bg-[#00D4AA]/14" />

      <div className="relative z-10 mx-auto mb-14 max-w-[1800px] px-5 md:px-16 lg:px-24 xl:px-32">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#0066CC] dark:text-[#8ABFFF]">
              Reviews Portal
            </p>
            <SplitReveal
              as="h2"
              className="mt-4 max-w-[10ch] text-[clamp(40px,5.8vw,78px)] font-[250] leading-[1.04] tracking-[-0.03em]"
            >
              Words on the street
            </SplitReveal>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-3xl text-[17px] font-[300] leading-8 text-[#475569] dark:text-white/70">
              Clients say it plainly after launch: sharper brands, calmer products, cleaner
              journeys, and teams that finally feel proud of what people see first.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-[#F7FAFF] to-transparent dark:from-[#080A0D] md:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-[#F7FAFF] to-transparent dark:from-[#080A0D] md:w-36" />

        <div className="reviews-marquee flex w-max gap-5 px-5 md:gap-6 md:px-16 lg:px-24 xl:px-32">
          {reviewLoop.map((review, index) => (
            <article
              key={`${review.project}-${index}`}
              className="group relative flex min-h-[300px] w-[82vw] max-w-[430px] flex-col justify-between overflow-hidden rounded-[8px] border border-black/10 bg-white p-6 shadow-[0_22px_70px_rgba(0,40,90,0.08)] transition-transform duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-white/[0.055] md:w-[430px] md:p-7"
            >
              <div
                className="absolute right-[-58px] top-[-58px] h-36 w-36 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-35"
                style={{ backgroundColor: review.accentColor }}
              />
              <div>
                <div className="mb-9 flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] dark:text-white/50">
                    {review.project}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: review.accentColor }} />
                </div>
                <p className="text-[20px] font-[250] leading-[1.45] tracking-[-0.02em] text-[#1D1D1F] dark:text-white/90">
                  "{review.quote}"
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-[600] text-white"
                  style={{ backgroundColor: review.accentColor }}
                >
                  {review.name.charAt(0)}
                </span>
                <div>
                  <p className="text-[14px] font-[500] text-[#1D1D1F] dark:text-white">{review.name}</p>
                  <p className="text-[12px] text-[#64748B] dark:text-white/50">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
