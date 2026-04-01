"use client";

import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";
import { designConfig } from "@/lib/design-config";

interface StatItemProps {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

function StatItem({ value, prefix = "", suffix, label }: StatItemProps) {
  const { count, ref } = useCounter(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-white/80">{label}</p>
    </div>
  );
}

const stats = [
  { value: 10, prefix: "+", suffix: " ans", label: "d'experience" },
  { value: 5000, prefix: "+", suffix: "", label: "patients soignes" },
  { value: 15000, prefix: "+", suffix: "", label: "traitements realises" },
  { value: 98, prefix: "", suffix: "%", label: "de satisfaction" },
] as const;

export function StatsRow() {
  return (
    <section className={cn("cta-gradient py-16 sm:py-20")} aria-label="Statistiques du cabinet">
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", `max-w-${designConfig.layout.maxWidth}`)}>
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
