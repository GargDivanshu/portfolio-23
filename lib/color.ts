export type RgbaTuple = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const parseRgba = (value: string): RgbaTuple | null => {
  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    return null;
  }

  const parts = match[1]
    .split(",")
    .map((part) => part.trim())
    .map((part, index) => (index < 3 ? parseFloat(part) : parseFloat(part)));

  const [r, g, b, a] = [
    Number.isFinite(parts[0]) ? parts[0] : 255,
    Number.isFinite(parts[1]) ? parts[1] : 255,
    Number.isFinite(parts[2]) ? parts[2] : 255,
    Number.isFinite(parts[3]) ? parts[3] : 1,
  ];

  return { r, g, b, a } as const;
};

export const mixRgba = (fromColor: string, toColor: string, t: number): string => {
  const start = parseRgba(fromColor);
  const end = parseRgba(toColor);

  if (!start || !end) {
    return fromColor;
  }

  const clamped = Math.min(Math.max(t, 0), 1);
  const mix = (a: number, b: number) => a + (b - a) * clamped;

  const r = Math.round(mix(start.r, end.r));
  const g = Math.round(mix(start.g, end.g));
  const b = Math.round(mix(start.b, end.b));
  const a = mix(start.a, end.a);

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
};
