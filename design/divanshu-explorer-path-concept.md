# Divanshu Personal Website — The Explorer's Path (2.5D Scroll Experience)

## Vision Overview
- **Narrative Arc:** Follow a lone explorer moving through five realms that illustrate Divanshu Garg's creative evolution from curiosity to mastery.
- **Interaction Model:** Vertical scroll input remaps to horizontal travel with 2.5D parallax and cinematic pacing, ideal for a Next.js + Framer Motion implementation.
- **Aesthetic:** Mystical, handcrafted environments blending art, AI, and engineering motifs.

## Phase 01 — Base Environment & Layout
- **Artboards:** Five 1920 × 1080 frames named `Scene 1 – The Awakening` through `Scene 5 – The Forge of Light`, aligned horizontally with 160 px gutters to imply scroll progression.
- **Horizon Alignment:** Ground path spline runs at 40% height across all artboards. Horizon line at 55% height for consistent parallax anchoring.
- **Layering:**
  - Background (0.2× parallax): sky gradients, distant silhouettes, atmospheric nebulae.
  - Midground (0.6× parallax): terrain geometry, structures, large props.
  - Foreground (1× parallax): ground path, vegetation, particle FX.
- **Grid:** 8 px layout grid with 16 px major divisions for precise placement of typography and UI overlays.
- **Atmospherics:** Add subtle fog (multiply blend, 12% opacity) and film grain overlay (screen, 6% opacity) for cohesion.

## Phase 02 — Character & Motion Guides
- **Explorer Silhouette:** Minimalist, robed figure with a luminous staff projecting a soft 180° light cone (spread 120 px, falloff 40%).
- **Color Treatment:** Body in near-black (`#05030F`) with rim-light accent (`#5CE1E6`). Staff core (`#F5F0FF`) with outer glow (`#8AE1FF` @ 45% opacity).
- **Walk Cycle:** Two-frame loop showing alternating leg positions; place within a 120 × 220 px frame for sprite export.
- **Motion Notes:**
  - Scroll distance per scene: 1920 px (matching artboard width).
  - Parallax ratios annotated on motion guide lines: background 0.2×, midground 0.6×, foreground 1×.
  - Smart Animate prototype with easing `Ease In-Out (400 ms)` triggered by horizontal drag to emulate continuous walking.

## Phase 03 — Scene Designs
### Scene 1 — The Awakening (Curiosity + Awe)
- **Palette:** Deep blue-violet dawn gradient (`#0C0B3A → #2B1E73`).
- **Environment:** Misty field with floating glyph monoliths and soft auroras. Low-lying fog hugging ground path.
- **Key Elements:** Bioluminescent plants, faint constellations forming circuit-like patterns.
- **Typography:** Headline “Curiosity Awakes” in Barlow Bold 96 pt. Supporting copy “Exploring the unknown sparks new dimensions.” in Be Vietnam Pro Medium 28 pt.

### Scene 2 — The Land of Sound (Discovery + Magic)
- **Palette:** Indigo-magenta waveform gradient (`#1C1A59 → #6A1D74 → #A8327A`).
- **Environment:** Rolling terrain shaped like sound waves, glowing orbs pulsing to imagined beats.
- **Key Elements:** Semi-transparent frequency fins in midground, floating musical glyphs.
- **Typography:** Headline “Discovery Resonates” (Barlow Bold 96 pt). Body copy “Synthesizing art and AI into harmonic systems.”

### Scene 3 — The Valley of Light (Structure + Power)
- **Palette:** Cyan-amber contrast (`#0A2A3F → #12A4C7` sky, columns lit `#FFC76A`).
- **Environment:** Canyon with towering luminous columns arranged in Fibonacci spacing, hinting at structural mastery.
- **Key Elements:** Light beams refracting through crystalline bridges, layered cliffs with angular geometry.
- **Typography:** Headline “Structure Forms” with body text “Frameworks emerge to channel innovation.”

### Scene 4 — The City of Loops (Mastery + Flow)
- **Palette:** Turquoise-gold interplay (`#0A3D3F`, `#1DD0C0`, highlights `#FFD25F`).
- **Environment:** Futuristic city of circular skyways and energy loops.
- **Key Elements:** Looping transit beams, kinetic signage referencing projects, layered architecture with rotational symmetry.
- **Typography:** Headline “Mastery Flows”, body text “Systems engineered for living experiences.”

### Scene 5 — The Forge of Light (Resolution + Inspiration)
- **Palette:** Pale gold-white forge glow (`#F5E9C8 → #FFFFFF`) with deep shadow accents.
- **Environment:** Intimate forge chamber with suspended logo glyph forging itself from light.
- **Key Elements:** Radiant anvil, sparks flowing into UI call-to-action area.
- **Typography:** Headline “Resolution Ignites”, body text “Let’s build something alive.” CTA button “Let’s build something alive.” (Barlow SemiBold 32 pt on `#101010` pill, 24 px padding).

## Phase 04 — Transitions & UI Overlay
- **Scene Transitions:** Gradient overlays (multiply blend) bridging palettes: e.g., Scene 1→2 overlay from `#2B1E73` to `#6A1D74` at 45° angle.
- **Scroll Indicator:** 8 px high rounded bar centered bottom, filled according to section progress; add subtle glow keyed to scene palette.
- **Section Text Timing:** Fade-in headlines at 20% into each scene, body copy at 40%, fade-out by 90% to keep focus on motion.
- **UI Elements:** Top-left minimal logo, top-right nav (“Work”, “Journal”, “Contact”) with low opacity until Scene 4 to reduce clutter.

## Phase 05 — Prototype & Export
- **Prototype:** Link artboards left-to-right using Smart Animate; enable “Horizontal scrolling” with preserved scroll position for overlays and test vertical scroll → horizontal pan using a scroll wrapper.
- **Parallax Preview:** Use additional overlay frames offset according to ratios to communicate depth to developers.
- **Export Assets:**
  - Color tokens in Figma Styles named `Scene/{SceneName}/{Element}`.
  - Motion tokens documenting parallax factors, timing curves, and delays.
  - Typography tokens for headings, body, and CTA states.
- **Documentation Frame:** Include dedicated frame summarizing narrative flow, motion cues, and implementation notes for Next.js + Framer Motion handoff.

## Design Tokens Summary
| Token | Value | Notes |
| --- | --- | --- |
| `color.scene1.sky` | `#0C0B3A` → `#2B1E73` gradient | Background fill |
| `color.scene2.sky` | `#1C1A59` → `#A8327A` | Gradient range |
| `color.scene3.sky` | `#0A2A3F` → `#12A4C7` | Background |
| `color.scene4.sky` | `#0A3D3F` → `#1DD0C0` | Background |
| `color.scene5.sky` | `#F5E9C8` → `#FFFFFF` | Background |
| `color.highlight.staff` | `#F5F0FF` | Staff core |
| `color.highlight.ambient` | `#8AE1FF` @45% | Explorer glow |
| `font.display` | Barlow | Headline usage |
| `font.body` | Be Vietnam Pro | Supporting copy |
| `elevation.fog` | Multiply overlay 12% | Ambient fog |
| `motion.parallax.background` | 0.2× | Scroll speed ratio |
| `motion.parallax.midground` | 0.6× | Scroll speed ratio |
| `motion.parallax.foreground` | 1× | Scroll speed ratio |
| `motion.transition.default` | Ease In-Out 400 ms | Smart Animate |
| `component.scrollIndicator.height` | 8 px | Bottom progress bar |

## Narrative & Pacing Notes
1. **Curiosity:** Slow camera ease-in, ambient tones, establishing mood.
2. **Discovery:** Increase motion amplitude with pulse synced to parallax.
3. **Structure:** Stabilize camera, emphasize vertical lines and predictable timing.
4. **Mastery:** Smooth continuous motion, loops suggesting infinite flow.
5. **Resolution:** Slow down; bright bloom as CTA appears, finalize narrative with invitation to collaborate.

## Developer Handoff Recommendations
- Deliver Figma file with named layers per depth (`BG`, `MG`, `FG`) and variant components for character cycle.
- Annotate scroll positions and trigger points using Figma comments pinned to artboards.
- Provide asset export slices (PNG/SVG) for key props and UI elements alongside JSON tokens if needed for direct integration.
