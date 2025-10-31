"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";

import { mixRgba } from "../../lib/color";

type ExplorerSpriteProps = {
  highlight: string;
  lightCone: string;
  position: number;
  stridePhase: number;
  strideIntensity: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function ExplorerSprite({
  highlight,
  lightCone,
  position,
  stridePhase,
  strideIntensity,
}: ExplorerSpriteProps) {
  const twoPi = Math.PI * 2;
  const cycle = Math.sin(stridePhase * twoPi);
  const sway = Math.sin(stridePhase * twoPi + Math.PI / 2);
  const lift = cycle * strideIntensity * 1.6;
  const tilt = sway * (4 + strideIntensity * 6);
  const headBob = cycle * clamp(strideIntensity * 1.8, 0.2, 2);
  const staffSwing = Math.cos(stridePhase * twoPi + Math.PI / 3) * strideIntensity * 0.9;
  const cloakBillow = Math.sin(stridePhase * twoPi + Math.PI / 4) * (6 + strideIntensity * 12);
  const isWalking = strideIntensity >= 0.05;

  const glowColor = useMemo(() => mixRgba(highlight, lightCone, 0.45), [highlight, lightCone]);
  const auraColor = useMemo(() => mixRgba(highlight, lightCone, 0.65), [highlight, lightCone]);
  const glowDuration = isWalking ? clamp(2.6 - strideIntensity * 1.2, 1.4, 2.6) : 3.8;
  const cloakDuration = isWalking ? clamp(2.3 - strideIntensity * 1.1, 1.2, 2.3) : 3.6;
  const idleDuration = 3.4;

  const cssVariables: CSSProperties = {
    "--highlight-color": highlight,
    "--light-cone-color": lightCone,
    "--glow-color": glowColor,
    "--aura-color": auraColor,
    "--glow-duration": `${glowDuration}s`,
    "--cloak-duration": `${cloakDuration}s`,
    "--idle-duration": `${idleDuration}s`,
    "--tilt-angle": `${tilt.toFixed(3)}deg`,
    "--head-bob": `${(-headBob * 0.22).toFixed(3)}rem`,
    "--staff-swing": `${staffSwing.toFixed(3)}rem`,
    "--cloak-angle": `${cloakBillow.toFixed(3)}deg`,
    "--stride-intensity": strideIntensity,
    "--aura-opacity": clamp(0.35 + strideIntensity * 0.4, 0.35, 0.8),
  };
  const liftOffset = (-lift * 0.6).toFixed(3);

  return (
    <div
      className="pointer-events-none absolute bottom-[14vh] left-0 z-30 flex w-24 flex-col items-center will-change-transform"
      style={{ transform: `translate3d(${position.toFixed(3)}vw, ${liftOffset}vh, 0)` }}
    >
      <div className="explorer" data-state={isWalking ? "walk" : "idle"} style={cssVariables}>
        <div className="explorer__aura" />
        <div className="explorer__halo" />
        <div className="explorer__shadow" />
        <div className="explorer__staff">
          <div className="explorer__staff-glow" />
          <div className="explorer__staff-core" />
        </div>
        <div className="explorer__body">
          <div className="explorer__body-core" />
          <div className="explorer__body-rim" />
        </div>
        <div className="explorer__cloak">
          <div className="explorer__cloak-fold" />
          <div className="explorer__cloak-glow" />
        </div>
        <div className="explorer__head" />
      </div>
      <style jsx>{`
        .explorer {
          position: relative;
          width: 8rem;
          height: 15rem;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          filter: drop-shadow(0 0 40px rgba(140, 220, 255, 0.2));
        }

        .explorer__aura {
          position: absolute;
          inset: auto;
          bottom: 1rem;
          width: 20rem;
          height: 20rem;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, var(--aura-color) 0%, rgba(10, 8, 25, 0) 70%);
          filter: blur(30px);
          mix-blend-mode: screen;
          opacity: var(--aura-opacity);
          animation: glowPulse var(--glow-duration) ease-in-out infinite;
        }

        .explorer__halo {
          position: absolute;
          bottom: 6.75rem;
          left: 45%;
          width: 10rem;
          height: 10rem;
          transform: translateX(-50%);
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle at 50% 40%, var(--glow-color), rgba(12, 8, 24, 0));
          filter: blur(18px);
          opacity: 0.55;
          mix-blend-mode: lighten;
        }

        .explorer__shadow {
          position: absolute;
          bottom: 0.6rem;
          left: 50%;
          width: 5.5rem;
          height: 1.4rem;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(8, 6, 18, 0.85), transparent 68%);
          opacity: 0.8;
          filter: blur(1px);
        }

        .explorer__staff {
          position: absolute;
          bottom: 3.2rem;
          right: -0.6rem;
          width: 1.3rem;
          height: 8.8rem;
          transform-origin: center bottom;
          transform: translateX(var(--staff-swing));
        }

        .explorer__staff::after {
          content: "";
          position: absolute;
          bottom: -1.6rem;
          left: 50%;
          transform: translateX(-50%);
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          background: radial-gradient(circle, var(--glow-color), rgba(255, 255, 255, 0));
          filter: blur(6px);
          opacity: 0.75;
          mix-blend-mode: screen;
        }

        .explorer__staff-glow {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0));
          box-shadow: 0 0 30px var(--glow-color);
          opacity: 0.6;
          mix-blend-mode: screen;
        }

        .explorer__staff-core {
          position: absolute;
          inset: 0.25rem;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(28, 28, 52, 0.9), rgba(10, 8, 25, 0.75));
          box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.15);
        }

        .explorer__body {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          width: 3.2rem;
          height: 8.8rem;
          transform-origin: center bottom;
          transform: translate(-50%, var(--head-bob)) rotate(var(--tilt-angle));
          animation: idleBreath var(--idle-duration) ease-in-out infinite alternate;
          filter: drop-shadow(0 0 16px rgba(15, 35, 60, 0.45));
        }

        .explorer[data-state="walk"] .explorer__body {
          animation: walkCycle var(--cloak-duration) ease-in-out infinite;
        }

        .explorer__body-core {
          position: absolute;
          inset: 0;
          border-radius: 1.6rem 1.6rem 1rem 1rem;
          background: linear-gradient(180deg, rgba(8, 8, 18, 0.9), rgba(5, 5, 16, 0.65));
          box-shadow: inset 0 -12px 24px rgba(255, 255, 255, 0.08);
        }

        .explorer__body-rim {
          content: "";
          position: absolute;
          inset: -0.35rem;
          border-radius: 2rem 2rem 1.4rem 1.4rem;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.06);
          mix-blend-mode: screen;
        }

        .explorer__cloak {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          width: 6.8rem;
          height: 9.2rem;
          transform: translateX(-50%) rotate(calc(var(--cloak-angle) * 0.12));
          transform-origin: 50% 15%;
          animation: cloakFlow var(--cloak-duration) ease-in-out infinite;
          pointer-events: none;
        }

        .explorer[data-state="walk"] .explorer__cloak {
          animation-duration: var(--cloak-duration);
        }

        .explorer__cloak-fold {
          position: absolute;
          inset: 0;
          border-radius: 40% 40% 65% 65%;
          background: radial-gradient(circle at 50% 10%, rgba(19, 20, 40, 0.95), rgba(6, 6, 18, 0.65) 70%);
          clip-path: polygon(20% 0%, 80% 0%, 100% 80%, 0% 80%);
          overflow: hidden;
        }

        .explorer__cloak-fold::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0.09), transparent 48%);
          mix-blend-mode: screen;
          opacity: 0.5;
        }

        .explorer__cloak-glow {
          position: absolute;
          inset: -10%;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12), rgba(20, 20, 40, 0));
          filter: blur(18px);
          mix-blend-mode: screen;
          opacity: 0.35;
        }

        .explorer__head {
          position: absolute;
          bottom: 10.8rem;
          left: 50%;
          width: 2.6rem;
          height: 2.6rem;
          transform: translateX(-50%) translateY(var(--head-bob));
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.1));
          box-shadow: 0 0 18px var(--glow-color), 0 0 40px rgba(255, 255, 255, 0.45);
          animation: glowPulse var(--glow-duration) ease-in-out infinite;
          mix-blend-mode: screen;
        }

        .explorer[data-state="walk"] .explorer__head {
          animation-duration: calc(var(--glow-duration) * 0.75);
        }

        @keyframes idleBreath {
          0% {
            transform: translate(-50%, calc(var(--head-bob) * 0.6)) rotate(calc(var(--tilt-angle) * 0.5)) scaleY(0.98);
            opacity: 0.96;
          }
          100% {
            transform: translate(-50%, var(--head-bob)) rotate(var(--tilt-angle)) scaleY(1.02);
            opacity: 1;
          }
        }

        @keyframes walkCycle {
          0%,
          100% {
            transform: translate(-50%, calc(var(--head-bob) * 0.5)) rotate(calc(var(--tilt-angle) * 0.7));
          }
          50% {
            transform: translate(-50%, var(--head-bob)) rotate(calc(var(--tilt-angle) * 1.1));
          }
        }

        @keyframes cloakFlow {
          0% {
            transform: translateX(-50%) rotate(calc(var(--cloak-angle) * -0.08));
          }
          50% {
            transform: translateX(-50%) rotate(calc(var(--cloak-angle) * 0.1));
          }
          100% {
            transform: translateX(-50%) rotate(calc(var(--cloak-angle) * -0.08));
          }
        }

        @keyframes glowPulse {
          0% {
            opacity: 0.6;
            filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.45));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 28px rgba(255, 255, 255, 0.65));
          }
          100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.45));
          }
        }
      `}</style>
    </div>
  );
}
