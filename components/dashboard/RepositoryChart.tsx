"use client";

import type { Repository } from "@/types/repository";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RepositoryChartProps {
  repositories: Repository[];
}

export default function RepositoryChart({
  repositories,
}: RepositoryChartProps) {
  const chartData = repositories.map((repo) => ({
    name: repo.name,
    Stars: repo.stargazers_count,
    Forks: repo.forks_count,
  }));

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-semibold">
        Repository Popularity
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
              }}
            />
            <Legend />
            <Bar dataKey="Stars" fill="#3b82f6" />
            <Bar dataKey="Forks" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}