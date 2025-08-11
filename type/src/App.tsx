import React from "react";
import TaskDashboard from "./components/TaskDashboard";
import "./App.css"; // If you have global styles
import { TaskProvider } from "./context/Context";

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div>
        <TaskDashboard />
      </div>
    </TaskProvider>
  );
};

export default App;
