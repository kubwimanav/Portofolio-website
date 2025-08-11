import { FiEdit2 } from "react-icons/fi";
import { BsTrash2 } from "react-icons/bs";
import { BiCalendar, BiUser } from "react-icons/bi";
import type { Task } from "../types/type";
import type React from "react";
import { useTaskContext } from "../hooks/useTaskContext";

  type props = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
  };

const TaskCard: React.FC<props> = ({ task, onEdit, onDelete })=> {

    const handleEdit = () => {
      onEdit(task);
    };

    const handleDelete = () => {
      onDelete(task.id);
    };
  const { storedData } = useTaskContext();
  

  return (
    <>
      {storedData.map((item) => (
        <div
          className={`bg-white w-xl rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow 
      }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <h3 className={`font-medium `}>{item.taskName}</h3>
            </div>

            <div className="flex gap-1">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit task"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
                onClick={handleDelete}
              >
                <BsTrash2 className="w-4 h-4" />
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
                {item.priority}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {item.category}
              </span>
            </div>

            {/* User and due date info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BiUser className="w-4 h-4" />
                <span>{item.assignedUser}</span>
              </div>

              <div className={`flex items-center gap-1 `}>
                <BiCalendar className="w-4 h-4" />
                <span>{ item.dueDate}</span>
              </div>
              <div className="text-xs text-gray-500">{item.assignedOn}</div>
            </div>

            {/* Assignment date */}
          </div>
        </div>
      ))}
    </>
  );
}
export default TaskCard
