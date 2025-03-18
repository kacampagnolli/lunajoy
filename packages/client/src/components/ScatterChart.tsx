import React, { useMemo } from "react";
import { Scatter } from "react-chartjs-2";
import { HealthLog } from "../types/HealthLog";

interface ScatterChartProps {
  logs: HealthLog[] | undefined;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ logs }) => {
  const scatterData = useMemo(() => {
    const data = logs?.map((log) => ({
      x: log.sleepHours,
      y: log.stress,
    })) || [];

    return {
      datasets: [
        {
          label: "Sleep vs Stress",
          data,
          backgroundColor: "#60A5FA",
        },
      ],
    };
  }, [logs]);

  const options = {
    scales: {
      x: {
        title: { display: true, text: "Sleep Hours" },
      },
      y: {
        title: { display: true, text: "Stress" },
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-center font-semibold mb-2">Sleep vs Stress</h3>
      <Scatter data={scatterData} options={options} />
    </div>
  );
};

export default ScatterChart;
