"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useSpring, useTransform, useVelocity } from "framer-motion";

import ExplorerSprite from "./components/ExplorerSprite";
import FogLayer from "./components/FogLayer";
import GroundPlane from "./components/GroundPlane";
import { mixRgba } from "../lib/color";

type Decoration = {
  layer: "background" | "midground" | "foreground";
  style: CSSProperties;
  className?: string;
};

type SceneData = {
  id: string;
  title: string;
  mood: string;
  mantra: string;
  description: string;
  gradient: string;
  ambient: string;
  highlight: string;
  lightCone: string;
  decorations: Decoration[];
  cta?: {
    label: string;
    href: string;
  };
};

const scenes: SceneData[] = [
  {
    id: "awakening",
    title: "The Awakening",
    mood: "Curiosity + Awe",
    mantra: "Explorer. Dreamer. Listener.",
    description:
      "A misty dawn field alive with luminous glyph monoliths. Ambient auroras pulse with the first sparks of curiosity.",
    gradient: "linear-gradient(140deg, #0C0B3A 0%, #2B1E73 100%)",
    ambient:
      "radial-gradient(circle at 18% 24%, rgba(106, 115, 255, 0.45), transparent 62%), radial-gradient(circle at 72% 65%, rgba(91, 215, 255, 0.22), transparent 70%)",
    highlight: "rgba(138, 225, 255, 0.75)",
    lightCone: "rgba(92, 225, 230, 0.6)",
    decorations: [
      {
        layer: "background",
        style: {
          width: "36rem",
          height: "36rem",
          background: "radial-gradient(circle, rgba(64, 63, 160, 0.55), transparent 70%)",
          top: "-8%",
          left: "-18%",
        },
      },
      {
        layer: "background",
        style: {
          width: "18rem",
          height: "18rem",
          background: "radial-gradient(circle, rgba(83, 202, 255, 0.32), transparent 65%)",
          top: "15%",
          right: "-6%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "12rem",
          height: "32rem",
          background: "linear-gradient(180deg, rgba(140, 170, 255, 0.05), rgba(140, 170, 255, 0.32))",
          backdropFilter: "blur(2px)",
          borderRadius: "9rem",
          top: "18%",
          left: "8%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "7rem",
          height: "24rem",
          background: "linear-gradient(180deg, rgba(190, 215, 255, 0.06), rgba(190, 215, 255, 0.28))",
          borderRadius: "6rem",
          top: "26%",
          left: "26%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "8rem",
          height: "12rem",
          borderRadius: "0 0 4rem 4rem",
          background: "linear-gradient(180deg, rgba(120, 220, 255, 0.45), rgba(12, 6, 45, 0.2))",
          bottom: "24%",
          left: "18%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "12rem",
          height: "12rem",
          borderRadius: "999px",
          background: "radial-gradient(circle, rgba(158, 96, 255, 0.35), transparent 68%)",
          bottom: "30%",
          right: "18%",
        },
      },
    ],
  },
  {
    id: "sound",
    title: "The Land of Sound",
    mood: "Discovery + Magic",
    mantra: "Builder. Synthesist. Storyteller.",
    description:
      "Rolling frequency dunes pulse with indigo and magenta light. Energy waves respond to each step, revealing hidden harmonies.",
    gradient: "linear-gradient(135deg, #1C1A59 0%, #6A1D74 45%, #A8327A 100%)",
    ambient:
      "radial-gradient(circle at 15% 18%, rgba(138, 55, 185, 0.38), transparent 62%), radial-gradient(circle at 85% 70%, rgba(250, 102, 180, 0.28), transparent 68%)",
    highlight: "rgba(248, 102, 190, 0.8)",
    lightCone: "rgba(255, 156, 212, 0.5)",
    decorations: [
      {
        layer: "background",
        style: {
          width: "34rem",
          height: "26rem",
          background: "radial-gradient(circle, rgba(85, 49, 150, 0.55), transparent 70%)",
          top: "-12%",
          right: "-20%",
        },
      },
      {
        layer: "background",
        style: {
          width: "20rem",
          height: "20rem",
          background: "radial-gradient(circle, rgba(236, 85, 167, 0.28), transparent 66%)",
          top: "22%",
          left: "12%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "110%",
          height: "18rem",
          bottom: "32%",
          left: "-5%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 100%, rgba(255, 98, 192, 0.22), transparent 70%), linear-gradient(120deg, rgba(28, 26, 89, 0), rgba(168, 50, 122, 0.18), rgba(106, 29, 116, 0))",
        },
      },
      {
        layer: "midground",
        style: {
          width: "85%",
          height: "10rem",
          bottom: "24%",
          left: "8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 10% 50%, rgba(255, 163, 216, 0.35), transparent 68%), linear-gradient(90deg, rgba(121, 32, 138, 0.18), rgba(28, 26, 89, 0.05))",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "12rem",
          height: "12rem",
          background: "conic-gradient(from 90deg, rgba(255, 120, 196, 0.65), rgba(57, 27, 117, 0.12), rgba(255, 120, 196, 0.65))",
          borderRadius: "50%",
          bottom: "26%",
          right: "22%",
          filter: "blur(2px)",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "6rem",
          height: "18rem",
          background: "linear-gradient(180deg, rgba(255, 162, 220, 0.4), transparent)",
          borderRadius: "6rem",
          bottom: "28%",
          left: "18%",
        },
      },
    ],
  },
  {
    id: "valley",
    title: "The Valley of Light",
    mood: "Structure + Power",
    mantra: "Architect. System Thinker. Steward.",
    description:
      "Cyan light cascades down crystalline columns arranged with mathematical precision. Architecture and energy align into frameworks.",
    gradient: "linear-gradient(130deg, #0A2A3F 0%, #0F4867 40%, #12A4C7 100%)",
    ambient:
      "radial-gradient(circle at 25% 25%, rgba(48, 165, 209, 0.38), transparent 62%), radial-gradient(circle at 72% 70%, rgba(255, 215, 140, 0.25), transparent 70%)",
    highlight: "rgba(255, 199, 106, 0.82)",
    lightCone: "rgba(255, 198, 106, 0.52)",
    decorations: [
      {
        layer: "background",
        style: {
          width: "40rem",
          height: "42rem",
          background: "radial-gradient(circle, rgba(22, 116, 154, 0.55), transparent 70%)",
          top: "-16%",
          left: "-14%",
        },
      },
      {
        layer: "background",
        style: {
          width: "20rem",
          height: "20rem",
          background: "radial-gradient(circle, rgba(255, 198, 106, 0.28), transparent 65%)",
          top: "22%",
          right: "-8%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "9rem",
          height: "38rem",
          background: "linear-gradient(180deg, rgba(8, 58, 87, 0.1), rgba(18, 164, 199, 0.45))",
          borderRadius: "5rem",
          top: "10%",
          left: "22%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "6rem",
          height: "34rem",
          background: "linear-gradient(180deg, rgba(13, 133, 166, 0.12), rgba(255, 201, 116, 0.48))",
          borderRadius: "4rem",
          top: "12%",
          left: "38%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "22rem",
          height: "16rem",
          background:
            "linear-gradient(120deg, rgba(255, 199, 106, 0.32), rgba(18, 164, 199, 0.18)), radial-gradient(circle at 50% 100%, rgba(8, 36, 58, 0.45), transparent 70%)",
          bottom: "28%",
          left: "18%",
          borderRadius: "60% 60% 40% 40%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "9rem",
          height: "20rem",
          background: "linear-gradient(180deg, rgba(255, 208, 135, 0.48), rgba(8, 37, 59, 0.35))",
          borderRadius: "6rem",
          bottom: "28%",
          right: "20%",
        },
      },
    ],
  },
  {
    id: "city",
    title: "The City of Loops",
    mood: "Mastery + Flow",
    mantra: "Conductor. Collaborator. Catalyst.",
    description:
      "Turquoise bridges weave in looping trajectories above a luminous metropolis. Energetic arcs echo perpetual iteration.",
    gradient: "linear-gradient(135deg, #0A3D3F 0%, #0F6E6B 38%, #1DD0C0 100%)",
    ambient:
      "radial-gradient(circle at 20% 30%, rgba(36, 156, 150, 0.4), transparent 62%), radial-gradient(circle at 78% 70%, rgba(255, 210, 95, 0.35), transparent 70%)",
    highlight: "rgba(255, 210, 95, 0.8)",
    lightCone: "rgba(255, 214, 126, 0.48)",
    decorations: [
      {
        layer: "background",
        style: {
          width: "34rem",
          height: "36rem",
          background: "radial-gradient(circle, rgba(15, 102, 96, 0.55), transparent 70%)",
          top: "-18%",
          left: "-16%",
        },
      },
      {
        layer: "background",
        style: {
          width: "22rem",
          height: "22rem",
          background: "radial-gradient(circle, rgba(255, 210, 95, 0.28), transparent 65%)",
          top: "24%",
          right: "-10%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "100%",
          height: "16rem",
          bottom: "32%",
          left: "0",
          background:
            "radial-gradient(circle at 50% 50%, rgba(29, 208, 192, 0.18), transparent 70%), linear-gradient(90deg, rgba(16, 110, 105, 0.45), rgba(16, 110, 105, 0.1), rgba(16, 110, 105, 0.45))",
          borderRadius: "50%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "70%",
          height: "14rem",
          bottom: "26%",
          left: "15%",
          background:
            "radial-gradient(circle at 20% 50%, rgba(255, 210, 95, 0.35), transparent 70%), linear-gradient(120deg, rgba(13, 73, 71, 0.24), rgba(29, 208, 192, 0.18))",
          borderRadius: "50%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "10rem",
          height: "18rem",
          borderRadius: "50%",
          border: "2px solid rgba(255, 210, 95, 0.45)",
          bottom: "30%",
          left: "22%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "14rem",
          height: "14rem",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, rgba(29, 208, 192, 0.6), rgba(10, 61, 63, 0))",
          bottom: "28%",
          right: "18%",
          filter: "blur(1px)",
        },
      },
    ],
  },
  {
    id: "forge",
    title: "The Forge of Light",
    mood: "Resolution + Inspiration",
    mantra: "Brand Engineer. Partner. Innovator.",
    description:
      "An intimate forge chamber awash in pale gold. Light converges into a glyph that reveals the invitation to build together.",
    gradient: "linear-gradient(135deg, #F5E9C8 0%, #FFFFFF 60%, #F9F1D9 100%)",
    ambient:
      "radial-gradient(circle at 20% 30%, rgba(255, 214, 126, 0.55), transparent 70%), radial-gradient(circle at 72% 70%, rgba(255, 247, 224, 0.5), transparent 80%)",
    highlight: "rgba(255, 190, 102, 0.9)",
    lightCone: "rgba(255, 214, 126, 0.65)",
    decorations: [
      {
        layer: "background",
        style: {
          width: "36rem",
          height: "32rem",
          background: "radial-gradient(circle, rgba(255, 226, 179, 0.6), transparent 70%)",
          top: "-12%",
          left: "-18%",
        },
      },
      {
        layer: "background",
        style: {
          width: "28rem",
          height: "28rem",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 72%)",
          top: "20%",
          right: "-10%",
        },
      },
      {
        layer: "midground",
        style: {
          width: "60%",
          height: "18rem",
          bottom: "30%",
          left: "20%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.35), transparent 70%), linear-gradient(90deg, rgba(255, 214, 126, 0.55), rgba(255, 233, 200, 0.12))",
          borderRadius: "50%",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "18rem",
          height: "18rem",
          borderRadius: "50%",
          background: "conic-gradient(from 45deg, rgba(255, 214, 126, 0.85), rgba(255, 255, 255, 0.35))",
          bottom: "32%",
          left: "26%",
          filter: "blur(1px)",
        },
      },
      {
        layer: "foreground",
        style: {
          width: "12rem",
          height: "12rem",
          borderRadius: "50%",
          border: "2px solid rgba(255, 190, 102, 0.6)",
          bottom: "32%",
          right: "24%",
        },
      },
    ],
    cta: {
      label: "Let’s build something alive",
      href: "mailto:divanshu@explorerspath.dev",
    },
  },
];

const mantraSequence = [
  "Explorer.",
  "Builder.",
  "Brand Engineer.",
];

const easeInOutCosine = (t: number) => {
  const clamped = Math.min(Math.max(t, 0), 1);
  return (1 - Math.cos(Math.PI * clamped)) / 2;
};

type SceneSectionProps = {
  scene: SceneData;
  parallaxOffset: number;
  proximity: number;
  isActive: boolean;
};

const PARALLAX = { bg: 0.2, mg: 0.6, fg: 1.0 } as const;
const BASE_SCENE_WIDTH = 1920;

function SceneSection({ scene, parallaxOffset, proximity, isActive }: SceneSectionProps) {
  const sectionId = `${scene.id}-section`;

  const clampedOffset = Math.max(Math.min(parallaxOffset, 2.5), -2.5);
  const bgShiftPx = -clampedOffset * BASE_SCENE_WIDTH * PARALLAX.bg;
  const mgShiftPx = -clampedOffset * BASE_SCENE_WIDTH * PARALLAX.mg;
  const fgShiftPx = -clampedOffset * BASE_SCENE_WIDTH * PARALLAX.fg;
  const decorationGlow = 0.45 + proximity * 0.55;
  const horizonGlow = 0.4 + proximity * 0.35;

  return (
    <section
      id={sectionId}
      className="relative flex h-[100vh] min-h-[720px] w-screen flex-shrink-0 items-center justify-center overflow-hidden px-6 py-20 md:px-16"
    >
      <div className="grid-overlay" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translate3d(${bgShiftPx}px, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "background")
            .map((decoration, decorationIndex) => {
              const baseOpacity =
                typeof decoration.style.opacity === "number"
                  ? decoration.style.opacity * decorationGlow
                  : decorationGlow;
              const existingFilter =
                typeof decoration.style.filter === "string" && decoration.style.filter.length > 0
                  ? `${decoration.style.filter} `
                  : "";
              return (
                <div
                  key={`${scene.id}-bg-${decorationIndex}`}
                  className={decoration.className ?? "mix-blend-screen"}
                  style={{
                    position: "absolute",
                    ...decoration.style,
                    opacity: baseOpacity,
                    filter: `${existingFilter}saturate(${(1 + proximity * 0.35).toFixed(3)})`,
                    transition:
                      "opacity 400ms cubic-bezier(0.45,0,0.55,1), filter 400ms cubic-bezier(0.45,0,0.55,1)",
                  }}
                />
              );
            })}
        </div>
        <div className="absolute inset-0" style={{ transform: `translate3d(${mgShiftPx}px, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "midground")
            .map((decoration, decorationIndex) => {
              const baseOpacity =
                typeof decoration.style.opacity === "number"
                  ? decoration.style.opacity * (0.55 + proximity * 0.45)
                  : 0.55 + proximity * 0.45;
              const existingFilter =
                typeof decoration.style.filter === "string" && decoration.style.filter.length > 0
                  ? `${decoration.style.filter}, `
                  : "";
              return (
                <div
                  key={`${scene.id}-mg-${decorationIndex}`}
                  className={decoration.className ?? "mix-blend-screen"}
                  style={{
                    position: "absolute",
                    ...decoration.style,
                    opacity: baseOpacity,
                    filter: `${existingFilter}drop-shadow(0 0 ${(8 + proximity * 22).toFixed(2)}px ${scene.highlight})`,
                    transition:
                      "opacity 400ms cubic-bezier(0.45,0,0.55,1), filter 400ms cubic-bezier(0.45,0,0.55,1)",
                  }}
                />
              );
            })}
        </div>
        <div className="absolute inset-0" style={{ transform: `translate3d(${fgShiftPx}px, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "foreground")
            .map((decoration, decorationIndex) => {
              const baseOpacity =
                typeof decoration.style.opacity === "number"
                  ? decoration.style.opacity * (0.6 + proximity * 0.4)
                  : 0.6 + proximity * 0.4;
              const existingShadow =
                typeof decoration.style.boxShadow === "string" && decoration.style.boxShadow.length > 0
                  ? `${decoration.style.boxShadow}, `
                  : "";
              return (
                <div
                  key={`${scene.id}-fg-${decorationIndex}`}
                  className={decoration.className ?? "mix-blend-screen"}
                  style={{
                    position: "absolute",
                    ...decoration.style,
                    opacity: baseOpacity,
                    boxShadow: `${existingShadow}0 0 ${(18 + proximity * 28).toFixed(2)}px ${scene.highlight}`,
                    transition:
                      "opacity 400ms cubic-bezier(0.45,0,0.55,1), box-shadow 400ms cubic-bezier(0.45,0,0.55,1)",
                  }}
                />
              );
            })}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-[20vh] left-0 right-0 h-32"
        style={{
          background: "radial-gradient(circle at 50% 100%, rgba(10, 9, 24, 0.8), transparent 72%)",
          opacity: horizonGlow,
          transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1), filter 400ms cubic-bezier(0.45,0,0.55,1)",
        }}
      />
      <div
        className="absolute bottom-[18vh] left-1/2 h-1 w-[180vw] -translate-x-1/2 rounded-full bg-white/10 blur-lg"
        style={{
          opacity: 0.35 + proximity * 0.4,
          transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1), filter 400ms cubic-bezier(0.45,0,0.55,1)",
        }}
      />
      <div
        className="absolute bottom-[15vh] left-0 right-0 h-28 bg-gradient-to-t from-[#05030f]/90 via-[#05030f]/40 to-transparent opacity-95"
        style={{
          opacity: 0.7 + proximity * 0.25,
          transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1), filter 400ms cubic-bezier(0.45,0,0.55,1)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-6 text-left md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className={`text-xs uppercase tracking-[0.45em] md:text-sm ${isActive ? "text-white/80" : "text-white/50"}`}>
            {scene.mood}
          </p>
          <h2 className={`text-4xl font-semibold leading-tight md:text-6xl ${isActive ? "text-white" : "text-white/80"}`}>
            {scene.title}
          </h2>
          <p className={`text-base md:text-lg ${isActive ? "text-white/90" : "text-white/70"}`}>{scene.description}</p>
          <p className={`text-xs uppercase tracking-[0.35em] ${isActive ? "text-white/50" : "text-white/30"}`}>{scene.mantra}</p>
        </div>
      </div>

      {scene.cta ? (
        <div className="relative z-20 mt-16 flex w-full max-w-2xl flex-col items-start gap-6 text-left md:items-center md:text-center">
          <div className="h-px w-full bg-white/10" />
          <p className="text-lg text-black/70 md:text-xl">
            {scene.description.split(".")[0]}.
          </p>
          <a
            href={scene.cta.href}
            className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/80 px-8 py-4 text-base font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black"
          >
            {scene.cta.label}
            <span aria-hidden className="text-white/70">→</span>
          </a>
        </div>
      ) : null}
    </section>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const totalScenes = scenes.length;
  const worldSpan = Math.max(totalScenes - 1, 1);

  const progressValue = useMotionValue(0);
  const worldTarget = useTransform(progressValue, (value) => -value * worldSpan * 100);
  const characterTarget = useTransform(progressValue, () => 40);
  const bobTarget = useTransform(progressValue, (value) => Math.sin(value * Math.PI * 2) * 1.4);
  const velocityValue = useVelocity(progressValue);
  const speedValue = useTransform(velocityValue, (value) => Math.min(Math.abs(value), 2));

  const worldX = useSpring(worldTarget, { stiffness: 90, damping: 24, mass: 0.85 });
  const cameraYOffset = useSpring(bobTarget, { stiffness: 70, damping: 20, mass: 0.8 });
  const characterXValue = useSpring(characterTarget, { stiffness: 200, damping: 28, mass: 0.6 });
  const strideSpring = useSpring(speedValue, { stiffness: 130, damping: 22, mass: 0.7 });

  const [worldTransform, setWorldTransform] = useState({ x: 0, y: 0 });
  const [characterX, setCharacterX] = useState(18);
  const [strideIntensity, setStrideIntensity] = useState(0);
  const [stridePhase, setStridePhase] = useState(0);
  const strideIntensityRef = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const viewport = window.innerHeight;
      const totalScrollable = viewport * Math.max(totalScenes - 1, 1);
      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const next = Math.min(Math.max(window.scrollY / totalScrollable, 0), 1);
      setScrollProgress((prev) => {
        if (Math.abs(prev - next) < 0.0005) return prev;
        return next;
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [totalScenes]);

  useEffect(() => {
    progressValue.set(scrollProgress);
  }, [progressValue, scrollProgress]);

  useMotionValueEvent(worldX, "change", (value) => {
    setWorldTransform((previous) => {
      if (Math.abs(previous.x - value) < 0.01) {
        return previous;
      }
      return { ...previous, x: value };
    });
  });

  useMotionValueEvent(cameraYOffset, "change", (value) => {
    setWorldTransform((previous) => {
      if (Math.abs(previous.y - value) < 0.01) {
        return previous;
      }
      return { ...previous, y: value };
    });
  });

  useMotionValueEvent(characterXValue, "change", (value) => {
    setCharacterX((prev) => {
      if (Math.abs(prev - value) < 0.01) {
        return prev;
      }
      return value;
    });
  });

  useMotionValueEvent(strideSpring, "change", (value) => {
    const clamped = Math.min(Math.max(Math.abs(value), 0), 1.6);
    strideIntensityRef.current = clamped;
    setStrideIntensity((prev) => {
      if (Math.abs(prev - clamped) < 0.01) {
        return prev;
      }
      return clamped;
    });
  });

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      const intensity = strideIntensityRef.current;
      setStridePhase((prev) => {
        let next = prev;
        if (intensity > 0.02) {
          next = (prev + delta * (0.8 + intensity * 1.8)) % 1;
        } else {
          const eased = prev * Math.max(0, 1 - delta * 3.4);
          next = eased;
        }
        if (Math.abs(next - prev) < 0.001) {
          return prev;
        }
        return next;
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const worldPosition = scrollProgress * worldSpan;

  const sceneParallaxOffsets = useMemo(
    () => scenes.map((_, index) => worldPosition - index),
    [worldPosition]
  );

  const sceneProximities = useMemo(
    () =>
      scenes.map((_, index) => {
        const distance = Math.abs(worldPosition - index);
        const closeness = Math.max(0, 1 - Math.min(distance, 1));
        return easeInOutCosine(closeness);
      }),
    [worldPosition]
  );

  const activeSceneIndex = useMemo(() => {
    if (sceneProximities.length === 0) {
      return 0;
    }
    let bestIndex = 0;
    let bestValue = -Infinity;
    sceneProximities.forEach((value, index) => {
      if (value > bestValue) {
        bestIndex = index;
        bestValue = value;
      }
    });
    return bestIndex;
  }, [sceneProximities]);

  const backgroundState = useMemo(() => {
    const fallbackScene = scenes[0];
    if (!fallbackScene) {
      return null;
    }

    const maxIndex = totalScenes - 1;
    if (maxIndex <= 0) {
      return {
        current: fallbackScene,
        next: fallbackScene,
        blend: 0,
      } as const;
    }

    const rawIndex = Math.min(Math.max(worldPosition, 0), maxIndex);
    const baseIndex = Math.min(Math.max(Math.floor(rawIndex), 0), maxIndex);
    const nextIndex = Math.min(baseIndex + 1, maxIndex);
    const localT = Math.min(Math.max(rawIndex - baseIndex, 0), 1);
    const blend = nextIndex === baseIndex ? 0 : easeInOutCosine(localT);

    return {
      current: scenes[baseIndex] ?? fallbackScene,
      next: scenes[nextIndex] ?? scenes[baseIndex] ?? fallbackScene,
      blend,
    } as const;
  }, [totalScenes, worldPosition]);

  const highlightColor = useMemo(() => {
    const fallback = scenes[0]?.highlight ?? "rgba(180, 220, 255, 0.85)";
    if (!backgroundState) return fallback;
    return mixRgba(backgroundState.current.highlight, backgroundState.next.highlight, backgroundState.blend);
  }, [backgroundState]);

  const lightConeColor = useMemo(() => {
    const fallback = scenes[0]?.lightCone ?? "rgba(138, 225, 255, 0.5)";
    if (!backgroundState) return fallback;
    return mixRgba(backgroundState.current.lightCone, backgroundState.next.lightCone, backgroundState.blend);
  }, [backgroundState]);

  const handleJumpToScene = useCallback(
    (targetIndex: number) => {
      const viewport = window.innerHeight;
      const clampedIndex = Math.min(Math.max(targetIndex, 0), totalScenes - 1);
      const offset = clampedIndex * viewport;
      window.scrollTo({ top: offset, behavior: "smooth" });
    },
    [totalScenes]
  );

  const progressPercent = Math.min(Math.max(scrollProgress * 100, 0), 100);

  return (
    <div className="relative min-h-screen">
      {backgroundState ? (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 transform-gpu will-change-[opacity]"
            style={{
              opacity: 1 - backgroundState.blend,
              background: backgroundState.current.gradient,
              transform: "translateZ(0)",
              transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: backgroundState.current.ambient,
                transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 transform-gpu will-change-[opacity]"
            style={{
              opacity: backgroundState.blend,
              background: backgroundState.next.gradient,
              transform: "translateZ(0)",
              transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1)",
            }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: backgroundState.next.ambient,
                transition: "opacity 400ms cubic-bezier(0.45,0,0.55,1)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_60%)] opacity-35 mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.05),transparent_65%)] opacity-25 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,15,0.4),rgba(5,3,15,0.85))]" />
        </div>
      ) : null}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 backdrop-blur-md md:px-12">
        <div className="flex flex-col text-xs uppercase tracking-[0.4em] text-white/70 md:text-sm">
          <span>Divanshu Garg</span>
          <span className="text-white/40">The Explorer's Path</span>
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.4em] text-white/50 md:flex">
          <button
            type="button"
            onClick={() => handleJumpToScene(0)}
            className="cursor-pointer hover:text-white/80"
          >
            Origin
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(1)}
            className="cursor-pointer hover:text-white/80"
          >
            Harmonics
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(2)}
            className="cursor-pointer hover:text-white/80"
          >
            Frameworks
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(3)}
            className="cursor-pointer hover:text-white/80"
          >
            Systems
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(4)}
            className="cursor-pointer hover:text-white/80"
          >
            Forge
          </button>
        </nav>
      </header>

      <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 text-xs uppercase tracking-[0.35em] text-white/50 lg:flex">
        {scenes.map((scene, index) => (
          <div key={scene.id} className="flex items-center gap-3">
            <span
              className="h-px transition-all"
              style={{
                width: `${8 + (sceneProximities[index] ?? 0) * 16}px`,
                backgroundColor: `rgba(255,255,255, ${
                  index === activeSceneIndex ? 0.9 : 0.2 + (sceneProximities[index] ?? 0) * 0.4
                })`,
              }}
            />
            <span className={index === activeSceneIndex ? "text-white" : "text-white/40"}>{scene.mood}</span>
          </div>
        ))}
      </aside>

      <main className="relative">
        <div style={{ height: `${totalScenes * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="relative h-full">
              <div
                className="flex h-full transform-gpu will-change-transform"
                style={{
                  width: `${totalScenes * 100}vw`,
                  transform: `translate3d(${worldTransform.x.toFixed(3)}vw, ${worldTransform.y.toFixed(3)}vh, 0)`
                }}
              >
                {scenes.map((scene, index) => (
                  <SceneSection
                    key={scene.id}
                    scene={scene}
                    parallaxOffset={sceneParallaxOffsets[index] ?? 0}
                    proximity={sceneProximities[index] ?? 0}
                    isActive={activeSceneIndex === index}
                  />
                ))}
              </div>
              <FogLayer
                worldX={worldTransform.x}
                highlightColor={highlightColor}
                lightConeColor={lightConeColor}
                blend={backgroundState?.blend ?? 0}
              />
              <GroundPlane
                blend={backgroundState?.blend ?? 0}
                highlightColor={highlightColor}
                lightConeColor={lightConeColor}
              />
              <ExplorerSprite
                highlight={highlightColor}
                lightCone={lightConeColor}
                position={characterX}
                stridePhase={stridePhase}
                strideIntensity={strideIntensity}
              />
            </div>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.4em] text-white/50 md:flex">
          <button
            type="button"
            onClick={() => handleJumpToScene(0)}
            className="cursor-pointer hover:text-white/80"
          >
            Origin
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(1)}
            className="cursor-pointer hover:text-white/80"
          >
            Harmonics
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(2)}
            className="cursor-pointer hover:text-white/80"
          >
            Frameworks
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(3)}
            className="cursor-pointer hover:text-white/80"
          >
            Systems
          </button>
          <button
            type="button"
            onClick={() => handleJumpToScene(4)}
            className="cursor-pointer hover:text-white/80"
          >
            Forge
          </button>
        </nav>
      </main>

      

      <div className="fixed bottom-10 left-1/2 z-40 flex w-[280px] -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
        <div className="flex items-center gap-2">
          {mantraSequence.map((word, index) => (
            <span
              key={word}
              className={`transition-opacity ${
                index === activeSceneIndex % mantraSequence.length ? "opacity-100" : "opacity-20"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white/80 transition-[width] duration-300"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
