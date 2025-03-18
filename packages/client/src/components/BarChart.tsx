import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { HealthLog } from "../types/HealthLog";

interface BarChartProps {
  logs: HealthLog[] | undefined;
}

const BarChart: React.FC<BarChartProps> = ({ logs }) => {
  const barData = useMemo(() => {
    const groups: Record<string, { total: number; count: number }> = {};
    logs?.forEach((log) => {
      const dateStr = new Date(log.createdAt).toLocaleDateString();
      if (!groups[dateStr]) {
        groups[dateStr] = { total: log.mood, count: 1 };
      } else {
        groups[dateStr].total += log.mood;
        groups[dateStr].count += 1;
      }
    });
    const labels = Object.keys(groups);
    const data = labels.map((label) => groups[label].total / groups[label].count);

    return {
      labels,
      datasets: [
        {
          label: "Average Mood",
          data,
          backgroundColor: "#FBBF24",
        },
      ],
    };
  }, [logs]);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-center font-semibold mb-2">Mood</h3>
      <Bar data={barData} />
    </div>
  );
};

export default BarChart;
