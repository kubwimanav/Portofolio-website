import React from "react";
import type { Task } from "../type/type";
import { getDueDateStatus } from "./Utility";
import { FiAlertTriangle } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { BiCalendar, BiCheckCircle } from "react-icons/bi";
import { TbAlertTriangle } from "react-icons/tb";

interface StatsDashboardProps {
  tasks: Task[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ tasks }) => {
  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    incomplete: tasks.filter((t) => !t.completed).length,
    overdue: tasks.filter(
      (t) =>
        !t.completed && t.dueDate && getDueDateStatus(t.dueDate) === "Overdue"
    ).length,
  };

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: BiCalendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "All tasks",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: BiCheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: `${completionRate}% completion rate`,
    },
    {
      title: "In Progress",
      value: stats.incomplete,
      icon: CiCircleCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Active tasks",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: FiAlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Need attention",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>

            {/* Progress bar for completion rate */}
            {stat.title === "Completed" && stats.total > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Warning indicator for overdue tasks */}
            {stat.title === "Overdue" && stat.value > 0 && (
              <div className="mt-2">
                <div className="flex items-center text-xs text-red-600">
                  <TbAlertTriangle size={12} className="mr-1" />
                  Requires immediate attention
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsDashboard;
