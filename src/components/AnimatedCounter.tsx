"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  to,
  durationMs = 1800,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(1, elapsed / durationMs);
              // ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
