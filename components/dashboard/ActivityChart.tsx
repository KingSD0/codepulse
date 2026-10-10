"use client";

import type { CommitActivity } from "@/types/commit";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ActivityChartProps {
  activity: CommitActivity[];
}

export default function ActivityChart({ activity }: ActivityChartProps) {
  return (
    <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-2 text-2xl font-semibold">
        Developer Activity
      </h2>

      <p className="mb-6 text-sm text-slate-400">
        Recent public commits by repository
      </p>

      {activity.length === 0 ? (
        <p className="text-slate-400">
          No recent public commit activity found.
        </p>
      ) : (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="repository"
                stroke="#94a3b8"
                fontSize={11}
              />
              <YAxis
                stroke="#94a3b8"
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                }}
              />
              <Bar
                dataKey="commits"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}