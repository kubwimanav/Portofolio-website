import React from "react";
import type { Filters, Task } from "../type/type";

interface TaskFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  tasks: Task[];
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
  tasks,
}) => {
  // Get unique values from tasks for filter options
  const uniqueCategories = Array.from(
    new Set(tasks.map((task) => task.category))
  );
  const uniqueUsers = Array.from(
    new Set(tasks.map((task) => task.assignedUser))
  );

  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white px-6 py-1 rounded-lg shadow mb-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() =>
            onFilterChange({
              status: "All",
              priority: "",
              category: "",
              dueDate: "",
              assignedUser: "",
            })
          }
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </button>
      </div>

      <div className=" flex flex-row items-center justify-between gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              handleFilterChange("status", e.target.value as Filters["status"])
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

       

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {uniqueCategories.sort().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4">
        {(filters.status !== "All" ||
          filters.priority ||
          filters.category ||
          filters.dueDate ||
          filters.assignedUser) && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>

            {filters.status !== "All" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Status: {filters.status}
                <button
                  onClick={() => handleFilterChange("status", "All")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}


            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange("category", "")}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}


           
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
