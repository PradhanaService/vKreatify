"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      style={{
        position: "fixed",
        top: "16px",
        right: "180px",
        zIndex: 99999,
        width: "52px",
        height: "28px",
        borderRadius: "100px",
        border: isDark
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(0,0,0,0.12)",
        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "3px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isDark ? "#FFFFFF" : "#1D1D1F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          marginLeft: isDark ? "auto" : "0",
          color: isDark ? "#1D1D1F" : "#FFFFFF",
        }}
      >
        {isDark ? "☾" : "☀"}
      </motion.span>
    </motion.button>
  );
}
