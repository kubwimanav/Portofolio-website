import './App.css'
import Dashboard from './components/Dashboard';
import LoginForm from "./components/LoginForm";
import TaskCard from "./components/Taskcard";
import type { Task } from './types/type';


export default function App() {

  

  return (
    <div className=' flex flex-col items-center gap-2'>
      <LoginForm onSubmit={function (task: Task): void {
        throw new Error('Function not implemented.');
      } } onCancel={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <Dashboard />
    </div>
  );
}
