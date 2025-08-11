import React, { useState } from "react";
import { CATEGORIES, TEAM_MEMBERS, type Task } from "../type/type";
import { generateId, getCurrentDate } from "./Utility";
import Input from "./Input";

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    taskName: task?.taskName || "",
    priority: task?.priority || "Medium",
    category: task?.category || "",
    dueDate: task?.dueDate || "",
    assignedUser: task?.assignedUser || "",
    assignedOn: task?.assignedOn || getCurrentDate(),
    completed: task?.completed || false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.taskName.trim()) {
      newErrors.taskName = "Task name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.assignedUser) {
      newErrors.assignedUser = "Assigned user is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTask: Task = {
      ...formData,
      id: task?.id || generateId(),
      taskName: formData.taskName.trim(),
    };

    onSubmit(newTask);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(49,49,49,0.8)] bg-opacity-80 flex justify-center items-start sm:items-center z-1000  ">
      <div className="rounded-lg  w-full max-w-md ">
        <div className="bg-white rounded-lg p-6 w-full  ">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {task ? "Edit Task" : "Add New Task"}
          </h2>

          <div className="grid grid-cols-2 gap-1">
            {/* Task Name */}

            <Input
              label="Task Name"
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              placeholder="Enter task name"
            />
            {errors.taskName && (
              <p className="text-red-500 text-xs mt-1">{errors.taskName}</p>
            )}

            {/* Priority */}
            <div>
              <label className="block text-md font-mono mb-1 text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border text-xs border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-md font-mono mb-1 text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full border text-xs rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.category
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Due Date */}

            <Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />

            {/* Assigned User */}
            <div>
              <label className="block  text-md font-mono text-gray-700 mb-1">
                Assigned User
              </label>
              <select
                name="assignedUser"
                value={formData.assignedUser}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 ${
                  errors.assignedUser
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a team member</option>
                {TEAM_MEMBERS.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
              {errors.assignedUser && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.assignedUser}
                </p>
              )}
            </div>

            {/* Assigned On */}

            <Input
              label="Assigned On"
              type="date"
              name="assignedOn"
              value={formData.assignedOn}
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row  gap-3 mt-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 w-full text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {task ? "Update" : "Add"} Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
