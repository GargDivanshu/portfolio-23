import { useEffect, useRef } from "react";

type Listener = (value: number) => void;

class MotionValue {
  private listeners = new Set<Listener>();
  private value: number;

  constructor(initial: number) {
    this.value = initial;
  }

  get() {
    return this.value;
  }

  set(next: number) {
    if (!Number.isFinite(next)) {
      return;
    }
    if (Math.abs(next - this.value) < 0.000001) {
      return;
    }
    this.value = next;
    this.listeners.forEach((listener) => listener(this.value));
  }

  onChange(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export { MotionValue };

export const useMotionValue = (initial: number) => {
  const ref = useRef<MotionValue>();
  if (!ref.current) {
    ref.current = new MotionValue(initial);
  }
  return ref.current;
};

export const useMotionValueEvent = (
  value: MotionValue,
  event: "change",
  handler: (latest: number) => void
) => {
  useEffect(() => {
    if (event !== "change") {
      return;
    }
    return value.onChange(handler);
  }, [event, handler, value]);
};

export const useTransform = (
  value: MotionValue,
  transform: (input: number) => number
) => {
  const transformed = useMotionValue(transform(value.get()));

  useEffect(() => {
    const update = (latest: number) => {
      transformed.set(transform(latest));
    };
    const unsubscribe = value.onChange(update);
    update(value.get());
    return () => {
      unsubscribe();
    };
  }, [transform, transformed, value]);

  return transformed;
};

export const useVelocity = (value: MotionValue) => {
  const velocity = useMotionValue(0);

  useEffect(() => {
    let lastValue = value.get();
    let lastTime = performance.now();
    const update = (latest: number) => {
      const now = performance.now();
      const deltaTime = (now - lastTime) / 1000;
      if (deltaTime > 0) {
        velocity.set((latest - lastValue) / deltaTime);
      }
      lastValue = latest;
      lastTime = now;
    };
    const unsubscribe = value.onChange(update);
    update(lastValue);
    return () => {
      unsubscribe();
    };
  }, [value, velocity]);

  return velocity;
};

type SpringConfig = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

const isMotionValue = (candidate: unknown): candidate is MotionValue => {
  return candidate instanceof MotionValue;
};

export const useSpring = (
  value: MotionValue | number,
  config: SpringConfig = {}
) => {
  const target = isMotionValue(value) ? value : null;
  const initial = target ? target.get() : (Number.isFinite(value) ? (value as number) : 0);
  const spring = useMotionValue(initial);

  useEffect(() => {
    let animationFrame = 0;
    let velocity = 0;
    const stiffness = config.stiffness ?? 170;
    const damping = config.damping ?? 26;
    const mass = config.mass ?? 1;
    const threshold = 0.0005;
    const lastTimeRef = { current: performance.now() };

    const step = (nextTarget: number) => {
      const now = performance.now();
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = now;
      const displacement = spring.get() - nextTarget;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;
      velocity += acceleration * dt;
      const candidate = spring.get() + velocity * dt;
      if (Math.abs(candidate - nextTarget) < threshold && Math.abs(velocity) < threshold) {
        spring.set(nextTarget);
        return;
      }
      spring.set(candidate);
      animationFrame = requestAnimationFrame(() => step(nextTarget));
    };

    const updateTarget = (nextTarget: number) => {
      cancelAnimationFrame(animationFrame);
      velocity = 0;
      lastTimeRef.current = performance.now();
      animationFrame = requestAnimationFrame(() => step(nextTarget));
    };

    if (target) {
      const unsubscribe = target.onChange(updateTarget);
      updateTarget(target.get());
      return () => {
        cancelAnimationFrame(animationFrame);
        unsubscribe();
      };
    }

    updateTarget(initial);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [config.damping, config.mass, config.stiffness, initial, spring, target]);

  return spring;
};
