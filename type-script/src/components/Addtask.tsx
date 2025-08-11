import { useState } from "react";
import type { Task } from "../types/type";
import { BiX } from "react-icons/bi";

const AddTaskModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    priority: 'Medium' as Task['priority'],
    category: 'Frontend' as Task['category'],
    dueDate: '',
    assignedUser: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.taskName.trim() && formData.assignedUser.trim()) {
      // addTask(formData);
      setFormData({
        taskName: '',
        priority: 'Medium',
        category: 'Frontend',
        dueDate: '',
        assignedUser: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <BiX size={24} />
          </button>
        </div>
        
       
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Assigned User</label>
            <input
              type="text"
              value={formData.assignedUser}
              onChange={(e) => setFormData({...formData, assignedUser: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div >
      
  )
};

export default AddTaskModal;