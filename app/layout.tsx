import MoodCursor from "../components/MoodCursor";
import PageTransition from "../components/PageTransition";
import SiteIntroLoader from "../components/SiteIntroLoader";
import ThemeToggle from "../components/ThemeToggle";
import type { Metadata } from "next";
import SmoothScroll from "../components/SmoothScroll";
import { CursorProvider } from "../context/CursorContext";
import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "vKreatify",
  description: "Creative digital studio landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia(
                    '(prefers-color-scheme: dark)'
                  ).matches;
                  if (theme === 'dark' || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-[#1D1D1F] antialiased transition-colors duration-300 dark:bg-black dark:text-white">
        <ThemeProvider>
          <CursorProvider>
            <SmoothScroll />
            <SiteIntroLoader />
            <MoodCursor />
            <ThemeToggle />
            <PageTransition>{children}</PageTransition>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
