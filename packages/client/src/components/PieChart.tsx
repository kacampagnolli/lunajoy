import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { HealthLog } from "../types/HealthLog";

interface PieChartProps {
  logs: HealthLog[] | undefined;
}

const PieChart: React.FC<PieChartProps> = ({ logs }) => {
  const pieData = useMemo(() => {
    const groups: Record<string, number> = {};
    logs?.forEach((log) => {
      const type = log.physicalActivityType || "unknown";
      const duration = log.physicalActivityDuration || 0;
      groups[type] = (groups[type] || 0) + duration;
    });
    return {
      labels: Object.keys(groups),
      datasets: [
        {
          data: Object.values(groups),
          backgroundColor: ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#A78BFA"],
        },
      ],
    };
  }, [logs]);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-center font-semibold mb-2">Activity Types</h3>
      <Pie data={pieData} />
    </div>
  );
};

export default PieChart;
