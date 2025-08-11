// Date utility functions
export const getDueDateStatus = (dueDate: string): string => {
  if (!dueDate) return "No Due Date";

  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays <= 7) return "Upcoming";
  return "Future";
};

// Get due date display information
export const getDueDateInfo = (dueDate: string) => {
  if (!dueDate) return { text: "No due date", color: "text-gray-500" };

  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: `Overdue by ${Math.abs(diffDays)} day${
        Math.abs(diffDays) === 1 ? "" : "s"
      }`,
      color: "text-red-600",
    };
  }
  if (diffDays === 0) return { text: "Due today", color: "text-orange-600" };
  if (diffDays === 1) return { text: "Due tomorrow", color: "text-yellow-600" };
  return { text: `Due in ${diffDays} days`, color: "text-green-600" };
};

// Priority color mapping
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "High":
      return "text-red-600 bg-red-100";
    case "Medium":
      return "text-yellow-600 bg-yellow-100";
    case "Low":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

// Category color mapping
export const getCategoryColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    Frontend: "bg-blue-100 text-blue-800",
    Backend: "bg-purple-100 text-purple-800",
    Meeting: "bg-green-100 text-green-800",
    Design: "bg-pink-100 text-pink-800",
    Testing: "bg-orange-100 text-orange-800",
    DevOps: "bg-indigo-100 text-indigo-800",
  };

  return colorMap[category] || "bg-gray-100 text-gray-800";
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  if (!dateString) return "No date";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get current date in YYYY-MM-DD format
export const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};
