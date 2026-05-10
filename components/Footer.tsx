import Link from "next/link";

const footerLinks = [
  { label: "Hall of Fame", href: "#hall-of-fame" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#F5F5F7] px-5 py-8 dark:border-white/10 dark:bg-[#111111] md:px-16 lg:px-24 xl:px-32">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#34C759]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#34C759]/40" />
            </span>
            <span className="text-[13px] text-[#1D1D1F] dark:text-white">Available for projects</span>
          </div>
          <p className="text-[15px] font-medium tracking-[-0.03em] text-[#374151] dark:text-white/78">
            vKreatify
          </p>
          <p className="max-w-md text-[13px] leading-6 text-[#475569] dark:text-white/74">
            Thoughtful digital design, brand systems, and product experiences with a calm,
            premium feel.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-5 text-[13px] text-[#1D1D1F] dark:text-white">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#6E6E73] dark:hover:text-white/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-[12px] uppercase tracking-[0.14em] text-[#64748B] dark:text-white/68">
            &copy; 2026 vKreatify
          </p>
        </div>
      </div>
    </footer>
  );
}
