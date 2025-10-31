"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

import { mixRgba } from "../../lib/color";

type GroundPlaneProps = {
  blend: number;
  highlightColor: string;
  lightConeColor: string;
};

export default function GroundPlane({ blend, highlightColor, lightConeColor }: GroundPlaneProps) {
  const surfaceColor = useMemo(() => mixRgba("rgba(12, 13, 26, 0.96)", highlightColor, 0.2), [highlightColor]);
  const sheenColor = useMemo(() => mixRgba(highlightColor, lightConeColor, 0.5), [highlightColor, lightConeColor]);
  const glowColor = useMemo(() => mixRgba(highlightColor, lightConeColor, 0.7), [highlightColor, lightConeColor]);

  const cssVariables: CSSProperties = {
    "--ground-surface": surfaceColor,
    "--ground-sheen": sheenColor,
    "--ground-glow": glowColor,
    "--ground-blend": blend,
  };

  return (
    <div className="ground-plane" style={cssVariables}>
      <div className="ground-plane__texture" />
      <div className="ground-plane__glow" />
      <style jsx>{`
        .ground-plane {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 14vh;
          height: 16vh;
          pointer-events: none;
          overflow: hidden;
          z-index: 18;
        }

        .ground-plane__texture {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(5, 7, 18, 0.05), transparent 40%),
            linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, var(--ground-sheen), var(--ground-surface));
          background-blend-mode: soft-light, screen, normal;
          mix-blend-mode: lighten;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.95) 65%);
          backdrop-filter: blur(2px);
        }

        .ground-plane::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 140% at 50% 100%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
        }

        .ground-plane::after {
          content: "";
          position: absolute;
          inset-inline: -25vw;
          bottom: -16vh;
          height: 40vh;
          background: radial-gradient(120% 80% at 50% 0%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
          opacity: 0.6;
        }

        .ground-plane__glow {
          position: absolute;
          bottom: -4vh;
          left: 50%;
          width: 80vw;
          max-width: 1200px;
          height: 36vh;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at 50% 100%, var(--ground-glow), rgba(12, 10, 24, 0) 70%);
          filter: blur(36px);
          opacity: 0.38;
          mix-blend-mode: screen;
        }

        .ground-plane__texture::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12) 40%, transparent 80%);
          opacity: calc(0.08 + var(--ground-blend) * 0.12);
          mix-blend-mode: screen;
        }

        .ground-plane__texture::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(0, 0, 0, 0));
          opacity: 0.12;
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}
