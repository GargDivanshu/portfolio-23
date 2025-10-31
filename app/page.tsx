"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  transitionTo?: string;
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
    transitionTo: "linear-gradient(180deg, rgba(43, 30, 115, 0) 0%, rgba(106, 29, 116, 0.35) 100%)",
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
    transitionTo: "linear-gradient(180deg, rgba(106, 29, 116, 0) 0%, rgba(18, 164, 199, 0.35) 100%)",
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
    transitionTo: "linear-gradient(180deg, rgba(18, 164, 199, 0) 0%, rgba(29, 208, 192, 0.32) 100%)",
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
    transitionTo: "linear-gradient(180deg, rgba(29, 208, 192, 0) 0%, rgba(245, 233, 200, 0.32) 100%)",
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

type SceneSectionProps = {
  scene: SceneData;
  progress: number;
  isActive: boolean;
  nextTransition?: string;
};

function SceneSection({ scene, progress, isActive, nextTransition }: SceneSectionProps) {
  const sectionId = `${scene.id}-section`;

  const backgroundShift = ((progress - 0.5) * -16).toFixed(3);
  const midgroundShift = ((progress - 0.5) * -28).toFixed(3);
  const foregroundShift = ((progress - 0.5) * -44).toFixed(3);
  const stridePhase = Math.round(progress * 8) % 2;

  const gradientOverlay: CSSProperties | undefined = nextTransition
    ? {
        background: nextTransition,
      }
    : undefined;

  return (
    <section
      id={sectionId}
      className="relative flex h-[100vh] min-h-[720px] w-screen flex-shrink-0 items-center justify-center overflow-hidden px-6 py-20 md:px-16"
    >
      <div
        className="absolute inset-0"
        style={{
          background: scene.gradient,
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: scene.ambient,
        }}
      />
      <div className="grid-overlay" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translate3d(${backgroundShift}vw, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "background")
            .map((decoration, decorationIndex) => (
              <div
                key={`${scene.id}-bg-${decorationIndex}`}
                className={decoration.className ?? "mix-blend-screen opacity-70"}
                style={{
                  position: "absolute",
                  ...decoration.style,
                }}
              />
            ))}
        </div>
        <div className="absolute inset-0" style={{ transform: `translate3d(${midgroundShift}vw, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "midground")
            .map((decoration, decorationIndex) => (
              <div
                key={`${scene.id}-mg-${decorationIndex}`}
                className={decoration.className ?? "mix-blend-screen opacity-80"}
                style={{
                  position: "absolute",
                  ...decoration.style,
                }}
              />
            ))}
        </div>
        <div className="absolute inset-0" style={{ transform: `translate3d(${foregroundShift}vw, 0, 0)` }}>
          {scene.decorations
            .filter((decoration) => decoration.layer === "foreground")
            .map((decoration, decorationIndex) => (
              <div
                key={`${scene.id}-fg-${decorationIndex}`}
                className={decoration.className ?? "mix-blend-screen opacity-90"}
                style={{
                  position: "absolute",
                  ...decoration.style,
                }}
              />
            ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[20vh] left-0 right-0 h-32" style={{
        background:
          "radial-gradient(circle at 50% 100%, rgba(10, 9, 24, 0.7), transparent 70%)",
      }} />
      <div className="absolute bottom-[18vh] left-1/2 h-1 w-[180vw] -translate-x-1/2 rounded-full bg-white/10 blur-lg" />
      <div className="absolute bottom-[15vh] left-0 right-0 h-28 bg-gradient-to-t from-[#05030f]/90 via-[#05030f]/40 to-transparent opacity-95" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-6 text-left md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60 md:text-sm">{scene.mood}</p>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">{scene.title}</h2>
          <p className="text-base text-white/80 md:text-lg">{scene.description}</p>
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">{scene.mantra}</p>
        </div>
        <div className="flex flex-col items-start gap-2 text-sm text-white/70 md:items-end md:text-right">
          <span className="text-xs uppercase tracking-[0.35em] text-white/50">Motion Notes</span>
          <p>Parallax ratios · BG 0.2× · MG 0.6× · FG 1×</p>
          <p>Scroll window · 1920px width equivalent</p>
          <p>Smart animate easing · Ease in-out 400ms</p>
        </div>
      </div>

      <ExplorerSprite highlight={scene.highlight} lightCone={scene.lightCone} stridePhase={stridePhase} isActive={isActive} />

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

      {gradientOverlay ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64" style={gradientOverlay} />
      ) : null}
    </section>
  );
}

type ExplorerSpriteProps = {
  highlight: string;
  lightCone: string;
  stridePhase: number;
  isActive: boolean;
};

function ExplorerSprite({ highlight, lightCone, stridePhase, isActive }: ExplorerSpriteProps) {
  const strideOffset = stridePhase === 0 ? "rotate(1.5deg)" : "rotate(-1.5deg)";
  const staffGlowOpacity = isActive ? 0.85 : 0.4;

  return (
    <div className="pointer-events-none absolute bottom-[14vh] left-[12vw] flex flex-col items-center">
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          width: "26rem",
          height: "26rem",
          background: `radial-gradient(circle at 50% 100%, ${lightCone}, rgba(5, 3, 15, 0))`,
          opacity: 0.5,
        }}
      />
      <div
        className="absolute bottom-10 left-1/2 h-48 w-1 -translate-x-1/2 rounded-full"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0))",
          boxShadow: `0 0 30px ${highlight}`,
          opacity: staffGlowOpacity,
        }}
      />
      <div
        className="absolute bottom-[9.5rem] left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "8rem",
          height: "8rem",
          background: `radial-gradient(circle, ${highlight}, rgba(255, 255, 255, 0))`,
          filter: "blur(16px)",
          opacity: staffGlowOpacity,
        }}
      />
      <div
        className="relative flex h-48 w-24 items-end justify-center"
        style={{
          filter: "drop-shadow(0 0 32px rgba(138, 225, 255, 0.35))",
        }}
      >
        <div
          className="absolute bottom-0 h-44 w-12 origin-bottom rounded-full bg-[#05030f] shadow-[0_0_30px_rgba(92,225,230,0.35)]"
          style={{ transform: strideOffset }}
        />
        <div
          className="absolute bottom-12 left-1/2 h-14 w-6 -translate-x-1/2 rounded-full bg-gradient-to-b from-white/80 via-white/20 to-transparent"
          style={{
            boxShadow: `0 0 24px ${highlight}`,
          }}
        />
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
          style={{
            width: "3.6rem",
            height: "0.9rem",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(10, 9, 24, 0.85), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 left-1/2 h-24 w-16 -translate-x-1/2"
          style={{
            background: "linear-gradient(180deg, rgba(8, 10, 30, 0.9), rgba(5, 3, 15, 0.5))",
            clipPath: "polygon(35% 0%, 65% 0%, 90% 80%, 10% 80%)",
          }}
        />
        <div
          className="absolute bottom-24 left-[60%] h-20 w-2 rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0))",
            transform: "rotate(4deg)",
            boxShadow: `0 0 16px ${highlight}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const totalScenes = scenes.length;
  const sceneSegment = 1 / totalScenes;

  useEffect(() => {
    const updateScroll = () => {
      const viewport = window.innerHeight;
      const totalScrollable = viewport * (totalScenes - 1);
      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const next = Math.min(Math.max(window.scrollY / totalScrollable, 0), 1);
      setScrollProgress((prev) => {
        if (Math.abs(prev - next) < 0.001) return prev;
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

  const sceneProgress = useMemo(
    () =>
      scenes.map((_, index) => {
        const start = index * sceneSegment;
        const relative = (scrollProgress - start) / sceneSegment;
        return Math.min(Math.max(relative, 0), 1);
      }),
    [scrollProgress, sceneSegment, totalScenes]
  );

  const activeSceneIndex = useMemo(() => {
    const firstIncomplete = sceneProgress.findIndex((value) => value < 1);
    return firstIncomplete === -1 ? totalScenes - 1 : firstIncomplete;
  }, [sceneProgress, totalScenes]);

  const activeScene = scenes[activeSceneIndex];
  const translateX = useMemo(() => -scrollProgress * (totalScenes - 1) * 100, [scrollProgress, totalScenes]);

  const handleJumpToScene = useCallback(
    (targetIndex: number) => {
      const viewport = window.innerHeight;
      const clampedIndex = Math.min(Math.max(targetIndex, 0), totalScenes - 1);
      const offset = clampedIndex * viewport;
      window.scrollTo({ top: offset, behavior: "smooth" });
    },
    [totalScenes]
  );

  return (
    <div className="relative min-h-screen">
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
              className={`h-px w-10 transition-all ${
                index === activeSceneIndex ? "bg-white" : "bg-white/20"
              }`}
            />
            <span className={index === activeSceneIndex ? "text-white" : "text-white/35"}>{scene.mood}</span>
          </div>
        ))}
      </aside>

      <main className="relative">
        <div style={{ height: `${totalScenes * 100}vh` }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              className="flex h-full transition-transform duration-300 ease-out will-change-transform"
              style={{
                width: `${totalScenes * 100}vw`,
                transform: `translate3d(${translateX}vw, 0, 0)`,
              }}
            >
              {scenes.map((scene, index) => (
                <SceneSection
                  key={scene.id}
                  scene={scene}
                  progress={sceneProgress[index] ?? 0}
                  isActive={activeSceneIndex === index}
                  nextTransition={scene.transitionTo}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-30 flex flex-col gap-12 bg-[#05030f] px-6 py-24 text-sm text-white/70 md:px-16">
        <div className="max-w-6xl space-y-6">
          <h3 className="text-2xl font-semibold text-white md:text-3xl">Design Tokens · Explorer's Path</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
              <h4 className="text-sm uppercase tracking-[0.4em] text-white/50">Color</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Scene 1 sky · #0C0B3A → #2B1E73</li>
                <li>Scene 2 sky · #1C1A59 → #A8327A</li>
                <li>Scene 3 sky · #0A2A3F → #12A4C7</li>
                <li>Scene 4 sky · #0A3D3F → #1DD0C0</li>
                <li>Scene 5 sky · #F5E9C8 → #FFFFFF</li>
                <li>Explorer glow · {activeScene.highlight}</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
              <h4 className="text-sm uppercase tracking-[0.4em] text-white/50">Type & Motion</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Display · Barlow · 96 / 64 / 48 scaling</li>
                <li>Body · Be Vietnam Pro · 18 / 20 leading 1.6</li>
                <li>Parallax ratios · BG 0.2× · MG 0.6× · FG 1×</li>
                <li>Scroll segments · 1920px scene width reference</li>
                <li>Animation easing · Ease in-out 400ms</li>
                <li>Grid system · 8px base rhythm</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl space-y-4">
          <h4 className="text-sm uppercase tracking-[0.4em] text-white/50">Prototype Notes</h4>
          <p>
            Link scenes horizontally in Figma using Smart Animate, preserving scroll position for overlays. Attach parallax offsets as annotations (0.2× / 0.6× / 1×) and export layered PNG / SVG slices for implementation in Next.js + Framer Motion.
          </p>
          <p>
            Include a documentation frame summarizing the narrative arc ("Curiosity → Discovery → Structure → Mastery → Resolution") and provide JSON-ready tokens for the engineering handoff.
          </p>
        </div>
      </footer>

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
            style={{ width: `${Math.max(scrollProgress * 100, 4)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
