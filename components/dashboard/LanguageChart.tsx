"use client";

import { Repository } from "@/types/repository";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LanguageChartProps {
  repositories: Repository[];
}

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
];

export default function LanguageChart({
  repositories,
}: LanguageChartProps) {
  const languageCounts = repositories.reduce<Record<string, number>>(
    (acc, repository) => {
      const language = repository.language ?? "Unknown";

      acc[language] = (acc[language] ?? 0) + 1;

      return acc;
    },
    {},
  );

  const chartData = Object.entries(languageCounts).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  return (
    <section className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Languages Overview
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}