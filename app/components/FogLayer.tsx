"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

import { mixRgba } from "../../lib/color";

type FogLayerProps = {
  worldX: number;
  highlightColor: string;
  lightConeColor: string;
  blend: number;
};

export default function FogLayer({ worldX, highlightColor, lightConeColor, blend }: FogLayerProps) {
  const fogPrimary = useMemo(() => mixRgba(highlightColor, lightConeColor, 0.55), [highlightColor, lightConeColor]);
  const fogSecondary = useMemo(() => mixRgba("rgba(120, 140, 220, 0.08)", fogPrimary, 0.5), [fogPrimary]);

  const cssVariables: CSSProperties = {
    "--fog-primary": fogPrimary,
    "--fog-secondary": fogSecondary,
    "--fog-opacity": 0.18 + blend * 0.12,
  };

  const drift = (worldX * 0.05).toFixed(3);

  return (
    <div className="fog-layer" style={{ transform: `translate3d(${drift}vw, 0, 0)` }}>
      <div className="fog-layer__front" style={cssVariables} />
      <div className="fog-layer__rear" style={cssVariables} />
      <style jsx>{`
        .fog-layer {
          position: absolute;
          inset: 0;
          z-index: 12;
          pointer-events: none;
          overflow: hidden;
        }

        .fog-layer__front,
        .fog-layer__rear {
          position: absolute;
          inset: -10% -40%;
          mix-blend-mode: screen;
          opacity: var(--fog-opacity);
          animation: fogFloat 18s ease-in-out infinite;
          filter: blur(24px);
          background: radial-gradient(circle at 20% 40%, var(--fog-primary), transparent 65%),
            radial-gradient(circle at 80% 60%, var(--fog-secondary), transparent 70%);
        }

        .fog-layer__front {
          animation-duration: 16s;
          animation-direction: alternate;
          transform: translate3d(0, -5%, 0);
        }

        .fog-layer__rear {
          animation-duration: 22s;
          animation-direction: alternate-reverse;
          filter: blur(36px);
          opacity: calc(var(--fog-opacity) * 0.7);
        }

        @keyframes fogFloat {
          0% {
            transform: translate3d(-4%, -2%, 0) scale(1.02);
          }
          50% {
            transform: translate3d(4%, 2%, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-4%, -2%, 0) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
