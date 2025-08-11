import React from "react";
import { formatDate, getDueDateInfo} from "./Utility";
import { BiCheckbox, BiCheckCircle,BiUser } from "react-icons/bi";
import {  BsTrash2 } from "react-icons/bs";
import {  FiEdit2 } from "react-icons/fi";
import type { Task } from "../type/type";
import { useTaskContext } from "../hooks/useTaskContext";


interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { dispatch } = useTaskContext();

  const dueDateInfo = getDueDateInfo(task.dueDate);

  const handleToggleComplete = () => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: task.id });
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div>
      {/* <div
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border-l-4 ${
          task.completed ? "border-green-500 opacity-75" : "border-blue-500"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <button
                onClick={handleToggleComplete}
                className={`flex-shrink-0 transition-colors ${
                  task.completed
                    ? "text-green-600"
                    : "text-gray-400 hover:text-green-500"
                }`}
              >
                {task.completed ? (
                  <BiCheckCircle size={20} />
                ) : (
                  <CiRuler size={20} />
                )}
              </button>
              <h3
                className={`font-semibold text-gray-900 truncate ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.taskName}
              </h3>
            </div>

            <div className="flex space-x-1 flex-shrink-0 ml-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit task"
              >
                <BiEdit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                <BsTrash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getPriorityColor(
                task.priority
              )}`}
            >
              <FiAlertCircle size={12} className="mr-1" />
              {task.priority}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(
                task.category
              )}`}
            >
              <BiTag size={12} className="mr-1" />
              {task.category}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <BiUser size={14} className="mr-2 flex-shrink-0" />
              <span className="truncate">{task.assignedUser}</span>
            </div>

            <div className="flex items-center">
              <BiCalendar size={14} className="mr-2 flex-shrink-0" />
              <span className={`${dueDateInfo.color} font-medium`}>
                {dueDateInfo.text}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
              Assigned on: {formatDate(task.assignedOn)}
            </div>
          </div>
        </div>

        {task.completed && (
          <div className="px-4 pb-2">
            <div className="text-xs text-green-600 font-medium flex items-center">
              <BiCheckCircle size={12} className="mr-1" />
              Task completed
            </div>
          </div>
        )}
      </div> */}
      <div className=" flex flex-col">
        <div
          className={`bg-white w-xl  rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow 
      }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  onClick={handleToggleComplete}
                  className={`flex-shrink-0 transition-colors ${
                    task.completed
                      ? "text-green-600"
                      : "text-gray-400 hover:text-green-500"
                  }`}
                >
                  {task.completed ? (
                    <BiCheckCircle size={20} />
                  ) : (
                    <BiCheckbox size={20} />
                  )}
                </button>
                <h3
                  className={`font-semibold text-gray-900 truncate ${
                    task.completed ? " text-green-600" : ""
                  }`}
                >
                  {task.taskName}
                </h3>
              </div>
            </div>

            <div className="flex gap-1">
              <button
                onClick={handleEdit}
                className="p-1 hover:text-gray-400 text-blue-600 transition-colors"
                title="Edit task"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-red-600 hover:text-red-300 transition-colors"
                title="Delete task"
                onClick={handleDelete}
              >
                <BsTrash2 className="w-4 h-4 " />
              </button>
            </div>
          </div>

          {/* Task details */}
          <div className="space-y-2">
            {/* Priority and Category badges */}
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium 
            `}
              >
                {task.priority}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {task.category}
              </span>
            </div>

            {/* User and due date info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BiUser className="w-4 h-4" />
                <span>{task.assignedUser}</span>
              </div>

              <div className={`flex items-center gap-1 `}>
                {task.completed && (
                  <div className="px-4 pb-2">
                    <div className="text-xs text-green-600 font-medium flex items-center">
                      <BiCheckCircle size={12} className="mr-1" />
                      Task completed
                    </div>
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {" "}
                Assigned on: {formatDate(task.assignedOn)}
              </div>
            </div>

            {/* Assignment date */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
