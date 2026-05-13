import Footer from "../components/Footer";
import Hero from "../components/Hero";
import StatsCounter from "../components/StatsCounter";
import HallOfFame from "../components/HallOfFame";
import { AnimatedStripes, Reveal, SplitReveal } from "../components/MotionPrimitives";
import Navbar from "../components/Navbar";
import WordsOnTheStreet from "../components/WordsOnTheStreet";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-[#1D1D1F] dark:bg-black dark:text-white">
        <Hero />

        <StatsCounter />
        <HallOfFame />
        <WordsOnTheStreet />

        <section
          id="work"
          className="relative overflow-hidden border-t border-[#0066CC]/20 bg-[#F4FAFF] px-5 py-28 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="absolute right-[-8%] top-[-40%] h-[420px] w-[420px] rounded-full bg-[#0066CC]/16 blur-[70px]" />
          <AnimatedStripes className="absolute inset-x-0 top-4 h-40 text-[#0066CC]/38 dark:text-white/20" />
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Featured Projects
              </p>
              <SplitReveal
                as="h2"
                className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white"
              >
                Work
              </SplitReveal>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
                Every launch balances atmosphere, storytelling, and conversion so the interface
                feels elevated without becoming noisy.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          id="about"
          className="relative overflow-hidden border-t border-[#00A676]/20 bg-[#F7FFF9] px-5 py-28 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="absolute left-[-10%] top-[-35%] h-[380px] w-[380px] rounded-full bg-[#00A676]/14 blur-[64px]" />
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Studio Approach
              </p>
              <SplitReveal
                as="h2"
                className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white"
              >
                About
              </SplitReveal>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
                vKreatify blends product thinking, motion sensitivity, and visual restraint to
                build websites that feel expensive and effortless.
              </p>
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden border-y border-[#FF7A1A]/20 bg-[#FFF8F2] px-5 py-28 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,transparent,#0066CC,transparent)] opacity-60 motion-gradient-line" />
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Start Here
              </p>
              <SplitReveal
                as="h2"
                className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white"
              >
                Contact
              </SplitReveal>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
                Tell us what you are building and we will shape a refined digital presence around
                it.
              </p>
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
