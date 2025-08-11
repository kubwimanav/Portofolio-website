// import React, { useState } from "react";
// import Input from "./Input";

// interface FormErrors {
//   taskName?: string;
//   priority?: string;
//   category?: string;
//   dueDate?: string;
//   assignedUser?: string;
//   assignedOn?: string;
// }

// const LoginForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     taskName: "",
//     priority: "",
//     category: "",
//     dueDate: "",
//     assignedUser: "",
//     assignedOn: "",
//   });
//   const [errors, setErrors] = useState<FormErrors>({});

//   const validate = (): boolean => {
//     const newErrors: FormErrors = {};
//     if (!formData.dueDate.trim()) newErrors.dueDate = "id is required";
//     if (!formData.taskName.trim()) newErrors.taskName = "TaskName is required";
//     if (!formData.assignedOn.trim())
//       newErrors.assignedOn = "assignedOn is required";
//     if (!formData.assignedUser.trim())
//       newErrors.assignedUser = "assignedUser is required";
//     if (!formData.category.trim()) newErrors.category = "category is required";
//     if (!formData.priority.trim()) newErrors.priority = "priority is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     // Save to localStorage
//     let existingData: any[] = [];
//     const storedData = localStorage.getItem("formData");
//     if (storedData) {
//       existingData = JSON.parse(storedData);
//     }

//     existingData.push(formData);
//     localStorage.setItem("formData", JSON.stringify(existingData));

//     // Reset form
//     setFormData({
//       taskName: "",
//       priority: "",
//       category: "",
//       dueDate: "",
//       assignedUser: "",
//       assignedOn: "",
//     });

//     alert("Task saved!");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
//     >
//       <h2 className="text-2xl font-bold mb-4 text-center">AddTask</h2>
//       <div className="grid grid-cols-2 gap-1">
//         <Input
//           label="TaskName"
//           name="taskName"
//           value={formData.taskName}
//           onChange={handleChange}
//           placeholder="Enter your taskName"
//           error={errors.taskName}
//         />
//         <Input
//           label="assignedUser"
//           name="assignedUser"
//           type="text"
//           value={formData.assignedUser}
//           onChange={handleChange}
//           placeholder="Enter your assignedUser"
//           error={errors.assignedUser}
//         />
//         <div className="mb-3">
//           <label className="block  text-md font-mono text-gray-700 mb-1">
//             AssignedOn
//           </label>
//           <select
//             name="assignedon"
//             value={formData.assignedOn}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 border-gray-300 ring-blue-200`}
//           >
//             <option value="">Select a team member</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>
//         <Input
//           label="DueDate"
//           type="date"
//           name="dueDate"
//           value={formData.dueDate}
//           onChange={handleChange}
//           placeholder="Enter your dueDate"
//           error={errors.dueDate}
//         />
//         <div className="mb-3">
//           <label className="block  text-md font-mono text-gray-700 mb-1">
//             Priority
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 border-gray-300 ring-blue-200`}
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="block  text-md font-mono text-gray-700 mb-1">
//             Category
//           </label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 border-gray-300 ring-blue-200`}
//           >
//             <option value="">Select a category</option>
//             <option>Frontend</option>
//             <option>Backend</option>
//             <option>Meeting </option>
//             <option> Design </option>
//           </select>
//         </div>
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-400 py-2 text-white rounded-md w-full"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default LoginForm;



import React, { useState } from "react";
import Input from "./Input";
import { CATEGORIES, TEAM_MEMBERS, type Task } from "../types/type";
import { generateId, getCurrentDate } from "./Utility";

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {task ? "Edit Task" : "Add New Task"}
      </h2>

      <div>
        {/* Task Name */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="TaskName"
            type="text"
            name="taskName"
            value={formData.taskName}
            onChange={handleChange}
            placeholder="Enter task name"
          />
          {errors.taskName && (
            <p className="text-red-500 text-xs mt-1">{errors.taskName}</p>
          )}
          <div>
            <label className="block  text-md font-mono text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block  text-md font-mono text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 ${
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

          <Input
            label="DueDate"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
          <div>
            <label className="block  text-md font-mono text-gray-700 mb-1">
              Assigned User
            </label>
            <select
              name="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-xs focus:outline-none focus:ring-2
                 ${
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
              <p className="text-red-500 text-xs mt-1">{errors.assignedUser}</p>
            )}
          </div>
          <Input
            label="AssignedOn"
            type="date"
            name="assignedOn"
            value={formData.assignedOn}
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex  gap-2">
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
  );
};

export default TaskForm;

