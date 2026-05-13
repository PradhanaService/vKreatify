"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { Children, isValidElement, useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, once = true }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const visibleState = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" };

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 92, scale: 0.94, filter: "blur(18px)", clipPath: "inset(28% 0% 0% 0%)" }
      }
      animate={shouldReduceMotion ? undefined : visibleState}
      whileInView={shouldReduceMotion ? undefined : visibleState}
      viewport={{ once, margin: "-18% 0px -18% 0px" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SplitRevealProps = {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
};

export function SplitReveal({ children, as = "span", className, delay = 0 }: SplitRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];
  const words = children.split(" ");

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={false}
            animate={{ y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" }}
            whileInView={{ y: "0%", rotate: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
              delay: shouldReduceMotion ? 0 : delay + index * 0.045,
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </Component>
  );
}

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  style?: CSSProperties;
};

export function ParallaxLayer({ children, className, distance = 80, style }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-distance, distance]);

  return (
    <motion.div ref={ref} style={{ ...style, y }} className={`relative ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}

export function AnimatedStripes({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <div className="motion-stripes" />
      <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1200 220" preserveAspectRatio="none">
        {[0, 1, 2, 3].map((index) => (
          <motion.path
            key={index}
            d={`M ${-120 + index * 95} ${42 + index * 34} C 160 ${12 + index * 24}, 320 ${
              154 - index * 20
            }, 520 ${88 + index * 26} S 910 ${20 + index * 42}, 1320 ${92 + index * 20}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="18 24"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: index * 0.12, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function WebGLDistortionField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const timeRef = useRef<WebGLUniformLocation | null>(null);
  const pointerRef = useRef<WebGLUniformLocation | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: true });

    if (!canvas || !gl) {
      return;
    }

    const vertex = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragment = `
      precision mediump float;
      uniform float time;
      uniform vec2 pointer;

      float wave(vec2 uv, float speed, float scale) {
        return sin((uv.x * scale + time * speed) + sin(uv.y * scale * 0.7 + time * 0.45));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / vec2(1400.0, 900.0);
        float d = distance(uv, pointer);
        float ripple = sin(d * 42.0 - time * 3.8) * smoothstep(0.5, 0.0, d);
        float field = wave(uv, 0.7, 12.0) + wave(uv.yx, -0.42, 9.0) + ripple;
        vec3 color = mix(vec3(0.02, 0.08, 0.10), vec3(0.0, 0.40, 0.80), field * 0.22 + 0.42);
        gl_FragColor = vec4(color, 0.22);
      }
    `;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, vertex);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();

    if (!vertexShader || !fragmentShader || !program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    programRef.current = program;
    glRef.current = gl;
    timeRef.current = gl.getUniformLocation(program, "time");
    pointerRef.current = gl.getUniformLocation(program, "pointer");

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      programRef.current = null;
      glRef.current = null;
    };
  }, []);

  useAnimationFrame((time) => {
    const gl = glRef.current;
    const program = programRef.current;

    if (!gl || !program) {
      return;
    }

    gl.useProgram(program);
    gl.uniform1f(timeRef.current, time / 1000);
    gl.uniform2f(pointerRef.current, pointer.current.x, pointer.current.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  });

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

export function StaggerChildren({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.12,
          },
        },
      }}
      className={className}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        return (
          <motion.div
            variants={{
              hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 78, scale: 0.92, filter: "blur(14px)" },
              visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
