import Footer from "../components/Footer";
import Hero from "../components/Hero";
import StatsCounter from "../components/StatsCounter";
import HallOfFame from "../components/HallOfFame";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-white text-[#1D1D1F] dark:bg-black dark:text-white">
        <Hero />

        <StatsCounter />
        <HallOfFame />

        <section
          id="work"
          className="border-t border-black/10 bg-white px-5 py-24 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Featured Projects
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
                Work
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
              Every launch balances atmosphere, storytelling, and conversion so the interface
              feels elevated without becoming noisy.
            </p>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-black/10 bg-white px-5 py-24 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Studio Approach
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
                About
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
              vKreatify blends product thinking, motion sensitivity, and visual restraint to
              build websites that feel expensive and effortless.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="border-y border-black/10 bg-white px-5 py-24 dark:border-white/10 dark:bg-black md:px-16 lg:px-24 xl:px-32"
        >
          <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#86868B] dark:text-white/50">
                Start Here
              </p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-[#1D1D1F] dark:text-white">
                Contact
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#6E6E73] dark:text-white/60 md:text-lg">
              Tell us what you are building and we will shape a refined digital presence around
              it.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
