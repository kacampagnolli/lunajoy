import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import BarChart from "../components/BarChart";
import NewLogForm from "../components/NewLogForm";
import PieChart from "../components/PieChart";
import ScatterChart from "../components/ScatterChart";
import { useServer } from "../contexts/ServerContext";
import { useSocket } from "../contexts/SocketContext";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

type FilterType = "weekly" | "monthly";

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("weekly");
  const [showForm, setShowForm] = useState(false);
  const { healthService } = useServer();
  const { socket } = useSocket();
  const { logout } = useAuth();

  const { data: logs, refetch, isLoading } = useQuery("logs", async () => {
    const res = await healthService.listHealthLogs();
    return res;
  });

  const filteredLogs = useMemo(() => {
    const now = new Date();
    return logs?.filter((log) => {
      const logDate = new Date(log.createdAt);
      if (filter === "weekly") {
        const diffInDays = (now.getTime() - logDate.getTime()) / (1000 * 3600 * 24);
        return diffInDays <= 7;
      } else {
        return (
          logDate.getMonth() === now.getMonth() &&
          logDate.getFullYear() === now.getFullYear()
        );
      }
    }) || [];
  }, [logs, filter]);

  useEffect(() => {
    if (!socket) return;
    socket.on("newHealthLog", () => {
      refetch();
    });

    return () => {
      socket.off("newHealthLog");
    };
  }, [socket, refetch]);

  if (isLoading) {
    return <h1>Loading ....</h1>;
  }

  return (
    <div className="bg-[rgb(254,252,238)] min-h-screen p-0">
    <div className="flex justify-between items-center mb-4 bg-[rgb(51,87,84)] top-0 m-0 p-5">
    <div className="flex items-center space-x-4">
      <button
        onClick={logout}
        className="flex items-center text-white hover:text-gray-300 transition"
      >
        <FiLogOut className="w-6 h-6 mr-2" />
      </button>
      </div>
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button
          className="bg-[rgb(255,178,30)] text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          New Log
        </button>
      </div>
    </div>

    <div className="flex justify-end px-5 py-5">
       <button
          onClick={() => setFilter("weekly")}
          className={`px-4 py-2 rounded ${
            filter === "weekly" ? "bg-[rgb(51,87,84)] text-white" : "bg-gray-300"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setFilter("monthly")}
          className={`ml-2 px-4 py-2 rounded ${
            filter === "monthly" ? "bg-[rgb(51,87,84)] text-white" : "bg-gray-300"
          }`}
        >
          Monthly
        </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-5">
      <PieChart logs={filteredLogs} />
      <ScatterChart logs={filteredLogs} />
      <BarChart logs={filteredLogs} />
    </div>

    { showForm && <NewLogForm onClose={() => setShowForm(false)} /> }
  </div>
  );
};

export default Dashboard;
