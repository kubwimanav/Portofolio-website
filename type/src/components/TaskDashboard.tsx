import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import StatsDashboard from "./StatsDashboard";
import TaskFilters from "./TaslFilter";
import { getDueDateStatus } from "./Utility";
import type { Filters, Task } from "../type/type";
import { useTaskContext } from "../hooks/useTaskContext";
import { BiPlus } from "react-icons/bi";

const TaskDashboard: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: "All",
    priority: "",
    category: "",
    dueDate: "",
    assignedUser: "",
  });

  // Filter tasks based on current filter settings
  const filteredTasks = state.tasks.filter((task) => {
    // Status filter
    if (filters.status === "Completed" && !task.completed) return false;
    if (filters.status === "Incomplete" && task.completed) return false;

    // Priority filter
    if (filters.priority && task.priority !== filters.priority) return false;

    // Category filter
    if (filters.category && task.category !== filters.category) return false;

    // Due date filter
    if (filters.dueDate) {
      const taskDueDateStatus = getDueDateStatus(task.dueDate);
      if (taskDueDateStatus !== filters.dueDate) return false;
    }

    // Assigned user filter
    if (filters.assignedUser && task.assignedUser !== filters.assignedUser)
      return false;

    return true;
  });

  // Handle adding new task
  const handleAddTask = (task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
    setShowForm(false);
  };

  // Handle updating existing task
  const handleUpdateTask = (task: Task) => {
    dispatch({ type: "UPDATE_TASK", payload: task });
    setEditingTask(null);
  };

  // Handle deleting task
  const handleDeleteTask = (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch({ type: "DELETE_TASK", payload: id });
    }
  };

  // Handle editing task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      status: "All",
      priority: "",
      category: "",
      dueDate: "",
      assignedUser: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
             Task Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your team's tasks
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors shadow-sm"
          >
            <BiPlus size={20} />
            <span>Add Task</span>
          </button>
        </div>

        {/* Statistics Dashboard */}

        {/* Filters */}
        <TaskFilters
          filters={filters}
          onFilterChange={setFilters}
          tasks={state.tasks}
        />

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <BiPlus className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-4">
                  {state.tasks.length === 0
                    ? "Get started by creating your first task!"
                    : "No tasks match your current filters."}
                </p>
                {state.tasks.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
                {state.tasks.length === 0 && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create First Task
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Results summary */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredTasks.length} of {state.tasks.length} tasks
                </p>
                {(filters.status !== "All" ||
                  filters.priority ||
                  filters.category ||
                  filters.dueDate ||
                  filters.assignedUser) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Task Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal Forms */}
        {showForm && (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
